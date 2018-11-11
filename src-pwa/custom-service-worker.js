/* global workbox */
/* eslint-env serviceworker */
/* eslint-disable no-underscore-dangle, no-restricted-globals */

workbox.core.setCacheNameDetails({
  prefix: 'car-rent-control',
  suffix: 'v0.0.1',
});

workbox.googleAnalytics.initialize();

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/.*api\.adorable\.io.*$/, workbox.strategies.staleWhileRevalidate({
  cacheName: 'avatar',
}));

// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

// workbox.routing.registerRoute(/^http/, workbox.strategies.networkFirst(), 'GET');

// const firestoreQueue = new workbox.backgroundSync.Plugin('firestoreQueue', {
//   maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
// });
// workbox.routing.registerRoute(
//   /.*firestore\.googleapis\.com.*$/,
//   workbox.strategies.networkOnly({ plugins: [firestoreQueue] }),
//   'POST',
// );

