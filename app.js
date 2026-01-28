// Transaction Management System - JavaScript
// ==========================================

// Global State
const state = {
    transactions: [],
    processing: {
        queue: 0,
        processing: 0,
        completed: 0,
        failed: 0
    },
    stats: {
        todayIncome: 0,
        todayExpenses: 0,
        approved: 0,
        pending: 0
    }
};

// Utility Functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS'
    }).format(amount);
};

const formatDate = (date) => {
    return new Intl.DateTimeFormat('he-IL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
};

const formatTime = (date) => {
    return new Intl.DateTimeFormat('he-IL', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
};

const generateId = () => {
    return 'TX' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const randomAmount = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Transaction Types
const transactionTypes = [
    { type: 'income', label: 'הכנסה', icon: 'fa-arrow-up' },
    { type: 'expense', label: 'הוצאה', icon: 'fa-arrow-down' },
    { type: 'transfer', label: 'העברה', icon: 'fa-exchange-alt' }
];

const statuses = [
    { status: 'approved', label: 'מאושר', icon: 'fa-check' },
    { status: 'pending', label: 'ממתין', icon: 'fa-clock' },
    { status: 'processing', label: 'בעיבוד', icon: 'fa-spinner' },
    { status: 'rejected', label: 'נדחה', icon: 'fa-times' }
];

const categories = ['קניות', 'שכר', 'מכירות', 'השקעות', 'הוצאות תפעול', 'שירותים', 'מיסים'];

const activityMessages = [
    'טרנזקציה חדשה התקבלה במערכת',
    'אישור אוטומטי בוצע בהצלחה',
    'גילוי חריגה - דורש בדיקה',
    'עדכון פרטי חשבון',
    'סנכרון נתונים הושלם',
    'התראת אבטחה - כניסה חדשה',
    'דוח יומי נוצר בהצלחה',
    'גיבוי נתונים הושלם'
];

// Initialize Charts
let transactionsChart, categoryChart;

function initCharts() {
    const ctx1 = document.getElementById('transactionsChart').getContext('2d');
    const ctx2 = document.getElementById('categoryChart').getContext('2d');
    
    const gradient1 = ctx1.createLinearGradient(0, 0, 0, 280);
    gradient1.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
    gradient1.addColorStop(1, 'rgba(99, 102, 241, 0)');
    
    const gradient2 = ctx2.createLinearGradient(0, 0, 0, 280);
    gradient2.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
    gradient2.addColorStop(1, 'rgba(16, 185, 129, 0)');
    
    transactionsChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
            datasets: [{
                label: 'הכנסות',
                data: [12500, 18200, 15800, 22000, 19500, 24800, 21200],
                borderColor: '#6366f1',
                backgroundColor: gradient1,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#6366f1'
            }, {
                label: 'הוצאות',
                data: [8200, 9500, 11200, 8800, 12500, 10200, 9800],
                borderColor: '#10b981',
                backgroundColor: gradient2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#94a3b8',
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(51, 65, 85, 0.5)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(51, 65, 85, 0.5)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: (value) => '₪' + value.toLocaleString()
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
    
    categoryChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['קניות', 'שכר', 'מכירות', 'השקעות', 'אחר'],
            datasets: [{
                data: [25, 30, 20, 15, 10],
                backgroundColor: [
                    '#6366f1',
                    '#10b981',
                    '#f59e0b',
                    '#3b82f6',
                    '#8b5cf6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8',
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Generate Random Transaction
function generateTransaction() {
    const typeInfo = randomElement(transactionTypes);
    const statusInfo = randomElement(statuses);
    const amount = randomAmount(100, 50000);
    
    return {
        id: generateId(),
        date: new Date(),
        type: typeInfo.type,
        typeLabel: typeInfo.label,
        typeIcon: typeInfo.icon,
        category: randomElement(categories),
        amount: typeInfo.type === 'expense' ? -amount : amount,
        status: statusInfo.status,
        statusLabel: statusInfo.label,
        statusIcon: statusInfo.icon,
        description: `${typeInfo.label} - ${randomElement(categories)}`
    };
}

// Render Transactions Table
function renderTransactions() {
    const tbody = document.getElementById('recentTransactions');
    tbody.innerHTML = state.transactions.slice(0, 8).map(tx => `
        <tr>
            <td><span class="transaction-id">${tx.id}</span></td>
            <td>${formatDate(tx.date)}</td>
            <td>
                <span class="transaction-type ${tx.type}">
                    <i class="fas ${tx.typeIcon}"></i>
                    ${tx.typeLabel}
                </span>
            </td>
            <td>
                <span class="amount ${tx.amount >= 0 ? 'positive' : 'negative'}">
                    ${formatCurrency(Math.abs(tx.amount))}
                </span>
            </td>
            <td>
                <span class="status-badge ${tx.status}">
                    <i class="fas ${tx.statusIcon}"></i>
                    ${tx.statusLabel}
                </span>
            </td>
            <td>
                <div class="action-btns">
                    <button onclick="viewTransaction('${tx.id}')" title="צפייה">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="editTransaction('${tx.id}')" title="עריכה">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update Stats
function updateStats() {
    const income = state.transactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);
    
    const expenses = state.transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    
    const approved = state.transactions.filter(tx => tx.status === 'approved').length;
    const pending = state.transactions.filter(tx => tx.status === 'pending').length;
    
    animateValue('todayIncome', state.stats.todayIncome, income, 1000, true);
    animateValue('todayExpenses', state.stats.todayExpenses, expenses, 1000, true);
    animateValue('approvedCount', state.stats.approved, approved, 500);
    animateValue('pendingCount', state.stats.pending, pending, 500);
    
    state.stats = { todayIncome: income, todayExpenses: expenses, approved, pending };
}

// Animate Value
function animateValue(elementId, start, end, duration, isCurrency = false) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (range * easeProgress);
        
        element.textContent = isCurrency ? formatCurrency(current) : Math.round(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Add Activity
function addActivity(message, type = 'info') {
    const feed = document.getElementById('activityFeed');
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };
    
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
        <div class="activity-icon ${type}">
            <i class="fas ${icons[type]}"></i>
        </div>
        <div class="activity-content">
            <div class="activity-text">${message}</div>
            <div class="activity-time">${formatTime(new Date())}</div>
        </div>
    `;
    
    feed.insertBefore(item, feed.firstChild);
    
    if (feed.children.length > 10) {
        feed.removeChild(feed.lastChild);
    }
}

// Update Processing Stats
function updateProcessing() {
    const total = state.processing.queue + state.processing.processing + 
                  state.processing.completed + state.processing.failed;
    
    document.getElementById('queueCount').textContent = state.processing.queue;
    document.getElementById('processingCount').textContent = state.processing.processing;
    document.getElementById('completedCount').textContent = state.processing.completed;
    document.getElementById('failedCount').textContent = state.processing.failed;
    
    if (total === 0) {
        document.getElementById('queueBar').style.width = '0%';
        document.getElementById('processingBar').style.width = '0%';
        document.getElementById('completedBar').style.width = '0%';
        document.getElementById('failedBar').style.width = '0%';
    } else {
        document.getElementById('queueBar').style.width = (state.processing.queue / total * 100) + '%';
        document.getElementById('processingBar').style.width = (state.processing.processing / total * 100) + '%';
        document.getElementById('completedBar').style.width = (state.processing.completed / total * 100) + '%';
        document.getElementById('failedBar').style.width = (state.processing.failed / total * 100) + '%';
    }
}

// Add Stream Item
function addStreamItem(tx, status) {
    const stream = document.getElementById('transactionStream');
    const item = document.createElement('div');
    item.className = 'stream-item';
    item.innerHTML = `
        <span class="status-dot ${status}"></span>
        <span class="tx-id">${tx.id}</span>
        <span class="tx-amount ${tx.amount >= 0 ? 'positive' : 'negative'}">${formatCurrency(Math.abs(tx.amount))}</span>
        <span class="tx-time">${formatTime(new Date())}</span>
    `;
    
    stream.insertBefore(item, stream.firstChild);
    
    if (stream.children.length > 15) {
        stream.removeChild(stream.lastChild);
    }
}

// Simulate Real-time Processing
function simulateProcessing() {
    // Add new transaction to queue
    if (Math.random() > 0.6) {
        const tx = generateTransaction();
        state.transactions.unshift(tx);
        state.processing.queue++;
        addStreamItem(tx, 'queue');
        addActivity(`טרנזקציה חדשה: ${tx.id}`, 'info');
    }
    
    // Process from queue
    if (state.processing.queue > 0 && Math.random() > 0.4) {
        state.processing.queue--;
        state.processing.processing++;
    }
    
    // Complete processing
    if (state.processing.processing > 0 && Math.random() > 0.3) {
        state.processing.processing--;
        if (Math.random() > 0.1) {
            state.processing.completed++;
            addActivity(randomElement(activityMessages), 'success');
        } else {
            state.processing.failed++;
            addActivity('שגיאה בעיבוד טרנזקציה', 'error');
        }
    }
    
    updateProcessing();
    renderTransactions();
    updateStats();
}

// Show Toast
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// View Transaction Modal
function viewTransaction(id) {
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;
    
    const modal = document.getElementById('modalOverlay');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-darker); border-radius: 8px;">
                <span style="color: var(--text-secondary);">מזהה טרנזקציה</span>
                <span style="font-family: monospace; color: var(--primary-color);">${tx.id}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-darker); border-radius: 8px;">
                <span style="color: var(--text-secondary);">תאריך</span>
                <span>${formatDate(tx.date)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-darker); border-radius: 8px;">
                <span style="color: var(--text-secondary);">סוג</span>
                <span class="transaction-type ${tx.type}">
                    <i class="fas ${tx.typeIcon}"></i>
                    ${tx.typeLabel}
                </span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-darker); border-radius: 8px;">
                <span style="color: var(--text-secondary);">קטגוריה</span>
                <span>${tx.category}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-darker); border-radius: 8px;">
                <span style="color: var(--text-secondary);">סכום</span>
                <span class="amount ${tx.amount >= 0 ? 'positive' : 'negative'}" style="font-size: 1.2rem;">
                    ${formatCurrency(Math.abs(tx.amount))}
                </span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-darker); border-radius: 8px;">
                <span style="color: var(--text-secondary);">סטטוס</span>
                <span class="status-badge ${tx.status}">
                    <i class="fas ${tx.statusIcon}"></i>
                    ${tx.statusLabel}
                </span>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function editTransaction(id) {
    showToast(`עריכת טרנזקציה ${id}`, 'info');
}

// Update Date/Time
function updateDateTime() {
    const now = new Date();
    document.getElementById('currentDate').textContent = formatDate(now);
    document.getElementById('currentTime').textContent = formatTime(now);
}

// Initialize
function init() {
    // Generate initial data
    for (let i = 0; i < 15; i++) {
        state.transactions.push(generateTransaction());
        state.processing.completed++;
    }
    
    state.processing.queue = randomAmount(3, 8);
    state.processing.processing = randomAmount(2, 5);
    
    // Initialize UI
    initCharts();
    renderTransactions();
    updateStats();
    updateProcessing();
    updateDateTime();
    
    // Add initial activities
    for (let i = 0; i < 5; i++) {
        addActivity(randomElement(activityMessages), randomElement(['success', 'info', 'warning']));
    }
    
    // Start intervals
    setInterval(simulateProcessing, 2000);
    setInterval(updateDateTime, 1000);
    setInterval(() => {
        // Update chart data randomly
        transactionsChart.data.datasets[0].data = transactionsChart.data.datasets[0].data.map(
            v => v + randomAmount(-500, 500)
        );
        transactionsChart.data.datasets[1].data = transactionsChart.data.datasets[1].data.map(
            v => v + randomAmount(-300, 300)
        );
        transactionsChart.update('none');
    }, 5000);
    
    // Event Listeners
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modalOverlay').classList.remove('active');
        });
    });
    
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('active');
        }
    });
    
    document.getElementById('refreshBtn').addEventListener('click', () => {
        showToast('מרענן נתונים...', 'info');
        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                state.transactions.unshift(generateTransaction());
            }
            renderTransactions();
            updateStats();
            showToast('הנתונים עודכנו בהצלחה', 'success');
        }, 1000);
    });
    
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
    });
    
    // Notification button handler
    document.querySelector('.notification-btn').addEventListener('click', () => {
        showToast('יש לך 5 התראות חדשות', 'info');
        addActivity('נצפו התראות מערכת', 'info');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            showToast(`ניווט ל${item.querySelector('span').textContent}`, 'info');
        });
    });
    
    showToast('מערכת ניהול טרנזקציות נטענה בהצלחה', 'success');
}

// Start Application
document.addEventListener('DOMContentLoaded', init);
