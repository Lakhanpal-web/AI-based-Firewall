import psutil
import socket
import requests
import os
import json
import time

API_URL = "http://127.0.0.1:5000"
POLICIES_URL = f"{API_URL}/policies"
LOG_URL = f"{API_URL}/log"

# Load policies from server
def fetch_policies():
    try:
        response = requests.get(POLICIES_URL)
        if response.status_code == 200:
            return response.json()
    except requests.RequestException as e:
        print(f"❌ Error fetching policies: {e}")
    return {"blocked_ips": [], "blocked_domains": [], "blocked_protocols": []}

# Resolve domain from IP
def get_domain_from_ip(ip):
    try:
        return socket.gethostbyaddr(ip)[0]
    except socket.herror:
        return "Unknown"

# Block IP using Windows Firewall
def block_ip(ip):
    print(f"🚨 BLOCKING {ip} using Windows Firewall")
    os.system(f'netsh advfirewall firewall add rule name="Blocked {ip}" dir=out action=block remoteip={ip}')

# Monitor active network connections
def get_active_connections():
    connections = []
    for conn in psutil.net_connections(kind='inet'):
        if conn.status == psutil.CONN_ESTABLISHED:
            try:
                process = psutil.Process(conn.pid)
                app_name = process.name()
                remote_ip = conn.raddr.ip if conn.raddr else None
                port = conn.raddr.port if conn.raddr else None
                protocol = "TCP" if conn.type == socket.SOCK_STREAM else "UDP"

                if remote_ip:
                    domain = get_domain_from_ip(remote_ip)
                    connections.append((app_name, remote_ip, domain, port, protocol))
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                continue
    return connections

# Enforce firewall policies
def enforce_policies(connections, policies):
    blocked_ips = set(policies.get("blocked_ips", []))
    blocked_domains = set(policies.get("blocked_domains", []))
    blocked_protocols = set(policies.get("blocked_protocols", []))

    for app, ip, domain, port, protocol in connections:
        decision = "allow"
        reason = "Normal traffic"

        if ip in blocked_ips or domain in blocked_domains or protocol in blocked_protocols:
            decision = "block"
            reason = "Blocked by policy"

            block_ip(ip)

        log_data = {
            "ip": ip,
            "app": app,
            "domain": domain,
            "decision": decision,
            "reason": reason
        }

        try:
            requests.post(LOG_URL, json=log_data)
        except requests.RequestException as e:
            print(f"❌ Error sending log: {e}")

        print(f"📡 {app} -> {ip} ({domain}, {protocol}) -> {decision.upper()}")

if __name__ == "__main__":
    print("🔥 Firewall Agent Running...")
    while True:
        policies = fetch_policies()
        active_connections = get_active_connections()
        enforce_policies(active_connections, policies)
        time.sleep(5)
