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
    // Add logic to show a new notification
    this.registration.showNotification('Your timer is actively running. Stay focused', {
      body: 'Timer in Progress...',
      actions: [
        { action: 'pauseButton', title: 'Pause' },
        { action: 'stopButton', title: 'Stop' },
        { action: 'resetButton', title: 'Reset' },
      ]
      // Add other notification options as needed
    });
  }
});

self.addEventListener('notificationclick', function(event) {
  const notification = event.notification;

  const action = event.action;

  switch(action) {
    case "pauseButton": {
      break;
    }
    case "stopButton": {
      break;
    }
    case "resetButton": {
      break;
    }
    default: {
      break;
    }
  }

  notification.close();

  event.waitUntil(
     this.clients.openWindow('/')
  );

});