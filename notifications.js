// Notification Service
// ====================

/**
 * NotificationService - Handles fetching and managing system notifications
 */
class NotificationService {
    /**
     * Fetches all notifications from the system
     * @returns {Promise<Array>} Promise resolving to array of notification objects
     */
    static async fetchAll() {
        try {
            // Simulate async API call with a small delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Return sample notifications
            const notifications = [
                {
                    id: 'N001',
                    type: 'success',
                    title: 'טרנזקציה אושרה',
                    message: 'טרנזקציה TX8K3L2M אושרה בהצלחה',
                    time: new Date(Date.now() - 5 * 60000), // 5 minutes ago
                    read: false
                },
                {
                    id: 'N002',
                    type: 'warning',
                    title: 'התראת אבטחה',
                    message: 'זוהה ניסיון כניסה חשוד למערכת',
                    time: new Date(Date.now() - 15 * 60000), // 15 minutes ago
                    read: false
                },
                {
                    id: 'N003',
                    type: 'info',
                    title: 'דוח יומי',
                    message: 'דוח הטרנזקציות היומי זמין לצפייה',
                    time: new Date(Date.now() - 30 * 60000), // 30 minutes ago
                    read: true
                },
                {
                    id: 'N004',
                    type: 'error',
                    title: 'שגיאה בעיבוד',
                    message: 'טרנזקציה TX9M2K1N נכשלה בשלב האימות',
                    time: new Date(Date.now() - 60 * 60000), // 1 hour ago
                    read: false
                },
                {
                    id: 'N005',
                    type: 'success',
                    title: 'גיבוי הושלם',
                    message: 'גיבוי נתונים אוטומטי בוצע בהצלחה',
                    time: new Date(Date.now() - 120 * 60000), // 2 hours ago
                    read: true
                }
            ];
            
            return notifications;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            // Return empty array on error instead of throwing
            return [];
        }
    }
    
    /**
     * Get count of unread notifications
     * @param {Array} notifications - Array of notification objects
     * @returns {number} Count of unread notifications
     */
    static getUnreadCount(notifications) {
        return notifications.filter(n => !n.read).length;
    }
    
    /**
     * Mark notification as read
     * @param {Array} notifications - Array of notification objects
     * @param {string} notificationId - ID of notification to mark as read
     * @returns {Array} Updated notifications array
     */
    static markAsRead(notifications, notificationId) {
        return notifications.map(n => 
            n.id === notificationId ? { ...n, read: true } : n
        );
    }
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationService;
}
