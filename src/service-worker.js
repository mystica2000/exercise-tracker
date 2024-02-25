// Usage example: Close all notifications on activation
self.addEventListener('activate', event => {
  event.waitUntil(
    this.registration.getNotifications().then(notifications => {
      notifications.forEach(notification => {
        notification.close();
      });
    })
  );
});

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
      data: {
        url: 'http://localhost:5173/#/timer', // Add the URL you want to open
      },
      actions: [
        { action: 'pauseButton', title: 'Pause' },
        { action: 'stopButton', title: 'Stop' },
        { action: 'resetButton', title: 'Reset' },
      ]
      // Add other notification options as needed
    });
  }
});

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;

  const action = event.action;

  switch (action) {
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
    this.clients.matchAll({
      type: 'window',
      includeUncontrolled: true // Include uncontrolled clients (e.g., open tabs not under the service worker's control)
    }).then(clients => {
      // Check if there's at least one matching client
      const matchingClient = clients.find(client => {
        return client.url === 'http://localhost:5173/#/timer'; // Replace with your URL
      });

      if (matchingClient) {
        // Focus on the existing window
        return matchingClient.focus();
      } else {
        // If no matching client, open a new window with the specified URL
        return this.clients.openWindow(event.notification.data.url);
      }
    })
  );

});