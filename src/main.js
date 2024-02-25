import './app.css'
import App from './App.svelte'

if ('serviceWorker' in navigator) { 
  
  await navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw'
  ).then((registration) => {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        navigator.serviceWorker.controller.postMessage("showNotification");
      } else {
        navigator.serviceWorker.controller.postMessage("hideNotification")
      }
    });
  })
  .catch((error) => {
    console.error('Service Worker registration failed:', error);
  });
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
