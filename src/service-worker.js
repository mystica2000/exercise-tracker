
// self.addEventListener('message', (event) => {

//   if (event.data && event.data === "hideNotification") {
//     // Add logic to hide or close any existing notifications
//     self.registration.getNotifications().then(notifications => {
//         notifications.forEach(notification => {
//           notification.close();
//         });
//       });
//   } else if (event.data && event.data == "showNotification") {
//     // Add logic to show a new notification
//     this.registration.showNotification('Timer Running', {
//       body: 'BYE',
//       actions: [
//         { action: 'yourActionIdentifier', title: 'Your Button Title' }
//     ]
//       // Add other notification options as needed
//     });
//   }
// })


self.addEventListener('message', (event) => {
  if (event.data && event.data === "hideNotification") {
    // Add logic to hide or close any existing notifications
    this.registration.getNotifications().then(notifications => {
      notifications.forEach(notification => {
        notification.close();
      });
    });
  } else if (event.data && event.data === "showNotification") {
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
