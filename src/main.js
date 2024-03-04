import './app.css'
import App from './App.svelte'

const serviceWorkerLoader = async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register(
      import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw'
    ).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  }
};

serviceWorkerLoader();


const app = new App({
  target: document.getElementById('app'),
})

export default app
