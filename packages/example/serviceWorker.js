import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { precacheAndRoute, getCacheKeyForURL } from 'workbox-precaching';
import { NetworkOnly } from 'workbox-strategies';

setCacheNameDetails({ prefix: 're-ssr' });

skipWaiting();

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(({ event }) => event.request.destination === 'document', new NetworkOnly());

// when there's no network connectivity and we try to navigate it will be handeled by catch handler
setCatchHandler(({ event }) => {
  if (event.request.destination === 'document') {
    return caches.match(
      getCacheKeyForURL(`${__CONFIG__.assetsUrl}/${__NAME__}/build/client/offline.html`),
    );
  }
  // If we don't have a fallback, just return an error response.
  return Response.error();
});

// to show app-shell add below line
// registerNavigationRoute(getCacheKeyForURL("/app-shell.html"));
