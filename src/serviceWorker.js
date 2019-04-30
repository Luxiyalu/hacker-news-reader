export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(
        reg => {
          console.log('serviceWorker registered with Scope:', reg.scope);
        },
        err => {
          console.log('serviceWorker registration failed:', err);
        }
      );
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
