# AI-Powered Application Firewall

A real-time, AI-driven firewall that monitors and controls network traffic, enforces policies per application, and detects anomalies.

## 🚀 Features
- ✅ *Application-Based Firewall Policies* – Restrict IPs, domains, and protocols per app.
- ✅ *Centralized Web Console* – Manage firewall rules and monitor logs.
- ✅ *Real-time Traffic Monitoring* – Tracks app-based network activity.
- ✅ *AI/ML-based Anomaly Detection* – Identifies suspicious behavior and blocks traffic.
- ✅ *Windows Compatibility* – Works on Windows endpoints.

## 🛠 Tech Stack
- *Backend:* Node.js (Express.js), Python
- *Frontend:* EJS, Tailwind CSS
- *Database:* MongoDB
- *Firewall Agent:* Python (psutil, socket, requests)
- *AI/ML:* Scikit-learn

## 📂 Project Structure

/firewall-agent       # Python-based firewall agent  
    firewall.py       # Monitors and enforces policies  
    predict.py        # AI anomaly detection  
/models               # MongoDB models (Log, Policy)  
/views                # EJS templates for the dashboard  
/public               # Static assets (CSS, JS)  
server.js             # Express.js backend server  
README.md             # Project documentation  


## 🔧 Installation & Setup

### 1️⃣ Install Dependencies
Ensure you have *Python 3.10+, **Node.js, and **MongoDB* installed.

#### Backend (Node.js Server)
sh
npm install


#### Firewall Agent (Python)
sh
pip install psutil requests scikit-learn pandas


### 2️⃣ Run MongoDB Locally
sh
mongod --dbpath /path/to/database


### 3️⃣ Start the Web Server
sh
node server.js


### 4️⃣ Run the Firewall Agent
sh
python firewall.py
### 4️⃣ Run the app_tracker
sh
python app_tracker.py


## 🖥 Dashboard & API Endpoints

### Web Dashboard
[http://127.0.0.1:5000/dashboard](http://127.0.0.1:5000/dashboard)

### API Routes
| Method | Endpoint   | Description                 |
|--------|-----------|-----------------------------|
| GET    | /logs     | Get latest firewall logs    |
| GET    | /policies | Fetch firewall policies     |
| POST   | /policies | Update firewall policies    |
| POST   | /predict  | AI-based traffic analysis   |
| POST   | /log      | Log network activity        |

## ⚡ How It Works
1. 🔍 The firewall agent *monitors active network connections*.
2. 📡 It *fetches policies* from the centralized server.
3. 🚨 If a connection matches *blocked rules, it is **blocked* via Windows Firewall.
4. 📜 The decision (*allow/block) is **logged* in MongoDB.
5. 🤖 AI detects anomalies and *blocks suspicious traffic*.

## 🎯 Future Improvements
- ✅ Per-application firewall rules
- ✅ Advanced AI model for anomaly detection
- ✅ Linux support
- ✅ Real-time alerts via email/slack

## 🤝 Contributors
👤 *Your Name*

🔥 Built in 24 hours during a hackathon! 🚀 Hope you like it! 😃
