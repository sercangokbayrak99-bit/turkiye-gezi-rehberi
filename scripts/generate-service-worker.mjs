import { readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const outputDirectory = new URL('../dist/', import.meta.url);
const outputPath = outputDirectory.pathname;

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  }));
  return files.flat();
}

const assets = (await listFiles(outputPath))
  .filter(path => !path.endsWith('service-worker.js'))
  .map(path => `./${relative(outputPath, path).split(sep).join('/')}`)
  .sort();

const source = `const CACHE_NAME = 'turkiye-rehberi-${Date.now()}';
const APP_ASSETS = ${JSON.stringify(assets, null, 2)};

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(['./', './index.html'])));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('message', event => {
  if (event.data?.type !== 'CACHE_APP') return;
  const reply = event.ports[0];
  event.waitUntil(caches.open(CACHE_NAME)
    .then(async cache => {
      const results = await Promise.allSettled(APP_ASSETS.map(asset => cache.add(asset)));
      const failed = results.filter(result => result.status === 'rejected').length;
      reply?.postMessage({ ok: failed === 0, cached: APP_ASSETS.length - failed, failed });
    })
    .catch(() => reply?.postMessage({ ok: false })));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
        return response;
      })
      .catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached ?? fetch(event.request).then(response => {
    if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
`;

await writeFile(join(outputPath, 'service-worker.js'), source);
console.log(`Generated service worker with ${assets.length} offline assets.`);
