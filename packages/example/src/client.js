/* eslint-disable no-console */
import { renderApp } from 're-ssr/renderApp';
import { Workbox } from 'workbox-window';
import Wrapper from './bootstrap/Wrapper/Wrapper';

if (__IS_BROWSER__ && 'serviceWorker' in navigator) {
  const workbox = new Workbox('/service-worker.js');
  workbox.addEventListener('activated', (event) => {
    if (!event.isUpdate) {
      console.log('ServiceWorker registration successful!');
    }
  });
  workbox.register();
}

renderApp({ App: Wrapper });
