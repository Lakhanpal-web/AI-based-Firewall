// Matrix Rain Animation
const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters and emojis
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
const emojis = '🛡️ 🔒 🚫 ⚠️ 🛑 🔐 🎯 💻 🌐 🔍 🚨 🛡️ 🔒 🚫 ⚠️ 🛑 🔐 🎯 💻 🌐 🔍 🚨';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];
const isEmoji = [];

// Initialize drops and randomize emoji usage
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
    isEmoji[i] = Math.random() > 0.7; // 30% chance of being an emoji column
}

function draw() {
    // Semi-transparent black background to create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Green text
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
        let text;
        if (isEmoji[i]) {
            // Randomly switch between emoji and text
            if (Math.random() > 0.95) {
                isEmoji[i] = !isEmoji[i];
            }
            text = emojis[Math.floor(Math.random() * emojis.length)];
        } else {
            text = chars[Math.floor(Math.random() * chars.length)];
        }
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset drop to top with random delay
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
            // Randomly decide if this column should use emojis
            isEmoji[i] = Math.random() > 0.7;
        }
        drops[i]++;
    }
}

// Start the animation
setInterval(draw, 33); // ~30 FPS

// Navigation Toggle
// const menuToggle = document.getElementById('menu-toggle');
// const navToggle = document.getElementById('nav-toggle');
// const sidebar = document.getElementById('sidebar');
// const mainContent = document.querySelector('.main-content');

// menuToggle.addEventListener('click', () => {
//     sidebar.classList.toggle('active');
// });

// navToggle.addEventListener('click', () => {
//     sidebar.classList.toggle('hidden');
//     mainContent.classList.toggle('expanded');
//     // Update the icon
//     const icon = navToggle.querySelector('.material-icons');
//     icon.textContent = sidebar.classList.contains('hidden') ? 'visibility_off' : 'visibility';
// });

// // Navigation Links
// const navLinks = document.querySelectorAll('.nav-links a');
// navLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();
//         // Remove active class from all links
//         navLinks.forEach(l => l.parentElement.classList.remove('active'));
//         // Add active class to clicked link
//         link.parentElement.classList.add('active');
        
//         // Update page title
//         const title = link.querySelector('span:last-child').textContent;
//         document.querySelector('.top-bar h1').textContent = title;
//     });
// });

// // Quick Action Buttons
// const quickActionButtons = document.querySelectorAll('.action-buttons .btn');
// quickActionButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const action = button.textContent;
//         if (action === 'Add New Rule') {
//             // Navigate to rules page
//             document.querySelector('a[href="#rules"]').click();
//         } else if (action === 'View Logs') {
//             // Navigate to logs page
//             document.querySelector('a[href="#logs"]').click();
//         }
//     });
// });

// // Firewall Rules Page
// const addRuleBtn = document.querySelector('.add-rule-btn');
// const rulesTable = document.querySelector('.rules-table');

// if (addRuleBtn) {
//     addRuleBtn.addEventListener('click', () => {
//         // Add new rule row
//         const newRow = document.createElement('tr');
//         newRow.innerHTML = `
//             <td><input type="text" placeholder="Rule Name"></td>
//             <td>
//                 <select>
//                     <option value="block">Block</option>
//                     <option value="allow">Allow</option>
//                 </select>
//             </td>
//             <td><input type="text" placeholder="Source"></td>
//             <td><input type="text" placeholder="Destination"></td>
//             <td><input type="text" placeholder="Port"></td>
//             <td><span class="status active">Active</span></td>
//             <td>
//                 <button class="icon-btn save-rule"><span class="material-icons">save</span></button>
//                 <button class="icon-btn delete-rule"><span class="material-icons">delete</span></button>
//             </td>
//         `;
//         rulesTable.appendChild(newRow);
//     });
// }

// // Logs Page
// const dateFilter = document.querySelector('.date-filter');
// const severityFilter = document.querySelector('.severity-filter');
// const categoryFilter = document.querySelector('.category-filter');

// if (dateFilter) {
//     dateFilter.addEventListener('change', filterLogs);
// }

// if (severityFilter) {
//     severityFilter.addEventListener('change', filterLogs);
// }

// if (categoryFilter) {
//     categoryFilter.addEventListener('change', filterLogs);
// }

// function filterLogs() {
//     const date = dateFilter.value;
//     const severity = severityFilter.value;
//     const category = categoryFilter.value;
    
//     const rows = document.querySelectorAll('.logs-table tbody tr');
//     rows.forEach(row => {
//         const rowDate = row.querySelector('td:nth-child(1)').textContent;
//         const rowSeverity = row.querySelector('.severity').textContent.toLowerCase();
//         const rowCategory = row.querySelector('.status').textContent.toLowerCase();
        
//         const dateMatch = !date || rowDate.includes(date);
//         const severityMatch = severity === 'all' || rowSeverity === severity;
//         const categoryMatch = category === 'all' || rowCategory === category;
        
//         row.style.display = dateMatch && severityMatch && categoryMatch ? '' : 'none';
//     });
// }

// // Blocked Sites Page
// const addSiteBtn = document.querySelector('.add-site-btn');
// const blockedSitesTable = document.querySelector('.blocked-sites-table');

// if (addSiteBtn) {
//     addSiteBtn.addEventListener('click', () => {
//         // Add new blocked site row
//         const newRow = document.createElement('tr');
//         newRow.innerHTML = `
//             <td><input type="text" placeholder="Site URL"></td>
//             <td>
//                 <select>
//                     <option value="malware">Malware</option>
//                     <option value="phishing">Phishing</option>
//                     <option value="inappropriate">Inappropriate Content</option>
//                 </select>
//             </td>
//             <td>Admin</td>
//             <td>${new Date().toISOString().split('T')[0]}</td>
//             <td>
//                 <button class="icon-btn save-site"><span class="material-icons">save</span></button>
//                 <button class="icon-btn delete-site"><span class="material-icons">delete</span></button>
//             </td>
//         `;
//         blockedSitesTable.appendChild(newRow);
//     });
// }

// // Event Delegation for Dynamic Elements
// document.addEventListener('click', (e) => {
//     // Save Rule
//     if (e.target.closest('.save-rule')) {
//         const row = e.target.closest('tr');
//         // Add save functionality here
//         alert('Rule saved successfully!');
//     }
    
//     // Delete Rule
//     if (e.target.closest('.delete-rule')) {
//         const row = e.target.closest('tr');
//         row.remove();
//     }
    
//     // Save Site
//     if (e.target.closest('.save-site')) {
//         const row = e.target.closest('tr');
//         // Add save functionality here
//         alert('Site saved successfully!');
//     }
    
//     // Delete Site
//     if (e.target.closest('.delete-site')) {
//         const row = e.target.closest('tr');
//         row.remove();
//     }
// }); 