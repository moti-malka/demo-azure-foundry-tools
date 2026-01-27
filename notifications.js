// Notification Service
// ===================

class NotificationService {
    constructor() {
        this.notifications = [
            {
                id: 1,
                title: 'טרנזקציה חדשה התקבלה',
                message: 'טרנזקציה בסך ₪2,500 ממתינה לאישור',
                type: 'info',
                timestamp: new Date(Date.now() - 1000 * 60 * 5),
                read: false
            },
            {
                id: 2,
                title: 'אישור טרנזקציה',
                message: 'טרנזקציה TX8K3L2M אושרה בהצלחה',
                type: 'success',
                timestamp: new Date(Date.now() - 1000 * 60 * 15),
                read: false
            },
            {
                id: 3,
                title: 'התראת אבטחה',
                message: 'זוהתה ניסיון כניסה ממכשיר חדש',
                type: 'warning',
                timestamp: new Date(Date.now() - 1000 * 60 * 30),
                read: true
            },
            {
                id: 4,
                title: 'דוח חודשי מוכן',
                message: 'דוח הטרנזקציות לחודש אוקטובר זמין לצפייה',
                type: 'info',
                timestamp: new Date(Date.now() - 1000 * 60 * 60),
                read: true
            },
            {
                id: 5,
                title: 'גיבוי נתונים הושלם',
                message: 'גיבוי אוטומטי של כל הנתונים בוצע בהצלחה',
                type: 'success',
                timestamp: new Date(Date.now() - 1000 * 60 * 120),
                read: true
            }
        ];
    }

    /**
     * Fetch all notifications
     * @returns {Promise<Array>} Array of notification objects
     */
    fetchAll() {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                try {
                    // Defensive check for notifications array
                    if (!this.notifications || !Array.isArray(this.notifications)) {
                        resolve([]);
                        return;
                    }
                    
                    // Return a copy to prevent external modifications
                    resolve([...this.notifications]);
                } catch (error) {
                    // Handle any unexpected errors gracefully
                    console.error('Error fetching notifications:', error);
                    reject(new Error('Failed to fetch notifications'));
                }
            }, 300);
        });
    }

    /**
     * Mark a notification as read
     * @param {number} id - Notification ID
     * @returns {Promise<boolean>} Success status
     */
    markAsRead(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const notification = this.notifications.find(n => n && n.id === id);
                if (notification) {
                    notification.read = true;
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 100);
        });
    }

    /**
     * Get count of unread notifications
     * @returns {number} Count of unread notifications
     */
    getUnreadCount() {
        try {
            if (!this.notifications || !Array.isArray(this.notifications)) {
                return 0;
            }
            return this.notifications.filter(n => n && !n.read).length;
        } catch (error) {
            console.error('Error counting unread notifications:', error);
            return 0;
        }
    }
}

// Export for use in app.js
const notificationService = new NotificationService();
