self.addEventListener('message', (event) => {
  console.log('Service Worker received a message:', event.data);

  if (event.data && event.data === "hideNotification") {
    // Add logic to hide or close any existing notifications
    this.registration.getNotifications().then(notifications => {
      notifications.forEach(notification => {
        notification.close();
      });
    });
  } else if (event.data && event.data === "showNotification") {
    console.log("timer running")
    // Add logic to show a new notification
    this.registration.showNotification('Timer Running', {
      body: 'BYE',
      actions: [
        { action: 'yourActionIdentifier', title: 'Your Button Title' }
      ]
      // Add other notification options as needed
    });
  }
});
