# demo-azure-foundry-tools

A transaction management system demo application with real-time processing visualization.

## Features

- Real-time transaction processing dashboard
- Transaction management with status tracking
- Charts and analytics for income/expenses
- Live activity feed
- Notification system

## Getting Started

1. Clone the repository
2. Open `index.html` in a web browser
3. The application will load with sample transaction data

## Testing the Notification System

The notification button (bell icon in the top right) has been fixed to display notifications safely.

### Manual Testing Steps

1. Open `index.html` in your browser
2. Click the notification button (bell icon with badge "5")
3. Verify that a modal appears showing notifications
4. Verify that the page does NOT crash or show any errors
5. Click outside the modal or the close button to dismiss it
6. Check the browser console - there should be no uncaught errors

### Expected Behavior

- Clicking the notification button opens a modal with a list of notifications
- Each notification shows:
  - Icon with color based on type (success/warning/error/info)
  - Title and message
  - Timestamp (e.g., "5 minutes ago")
  - Unread indicator (blue dot) for unread notifications
- The modal can be closed by:
  - Clicking the X button in the modal header
  - Clicking the "סגור" (Close) button
  - Clicking outside the modal

### Error Handling

The notification system includes defensive error handling:
- If the notification service is unavailable, a warning toast is shown
- If fetching notifications fails, an error toast is shown
- The page never crashes or displays fatal errors

## Files

- `index.html` - Main HTML structure
- `app.js` - Application logic and UI handlers
- `notifications.js` - Notification service with fetchAll() method
- `styles.css` - Styling

## Technical Notes

- The notification service (`notifications.js`) provides a safe API with defensive checks
- All notification operations return Promises for async handling
- Error boundaries prevent crashes and show user-friendly messages
- Mock notification data is provided for demo purposes