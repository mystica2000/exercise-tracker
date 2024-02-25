import './app.css'
import App from './App.svelte'

console.log("testing")
if ('serviceWorker' in navigator) {
  console.log("testing more")
  await navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw'
  ).then(async (registration) => {
    console.log("done")
    const reg = await navigator.serviceWorker.ready;

    // Check if the browser supports the Notification API
    if ('Notification' in window) {

      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // Permission has been granted
          console.log('Notification permission granted!');

          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === "visible") {
              reg.active.postMessage("hideNotification");
            } else {
              console.log("omg")
              reg.active.postMessage("showNotification");
            }
          });

        } else if (permission === 'denied') {
          // Permission has been denied
          console.warn('Notification permission denied!');
        } else if (permission === 'default') {
          // The user closed the permission prompt without making a choice
          console.log('Notification permission dismissed.');
        }
      });
    } else {
      console.error('Notification API not supported in this browser.');
    }

  })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
