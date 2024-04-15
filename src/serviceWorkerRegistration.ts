export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = '/service-worker.js';
  
        navigator.serviceWorker.register(swUrl).then((registration) => {
          console.log('Service workerが登録されました:', registration);
        }).catch((error) => {
          console.error('Service workerの登録に失敗しました:', error);
        });
      });
    }
  }
  