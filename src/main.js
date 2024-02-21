import './app.css'
import App from './App.svelte'

if ('serviceWorker' in navigator) { console.log("whats")
  
  await navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw'
  ).then((registration) => {
    console.log('Service Worker registered with scope:', registration.scope);
  })
  .catch((error) => {
    console.error('Service Worker registration failed:', error);
  });
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
