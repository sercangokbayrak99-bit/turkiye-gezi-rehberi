const CACHE_NAME = 'turkiye-rehberi-1787820996162';
const APP_ASSETS = [
  "./_expo/static/js/web/AppEntry-470ad8276dc554329129f7dac0066018.js",
  "./assets/assets/baths/emir-sultan-hamam.13bd41db784754b82f232221cc4a963e.jpg",
  "./assets/assets/baths/eski-kaplica.1ea83cf46b353d2d85249db3024e257b.jpg",
  "./assets/assets/baths/muradiye-hamam.1d48358fb4ec87be3cda0ab4a1d4f2fc.jpg",
  "./assets/assets/baths/ordekli.67b89bde947c7c92bbf9661f045f9192.jpg",
  "./assets/assets/bursa-hero.680bf7f3fc965645c8dcd3cb43a6f58c.jpg",
  "./assets/assets/bursa/arkeoloji-muzesi.05090b21dd62f25f0d3a33d95badefbb.jpg",
  "./assets/assets/bursa/beach-placeholder.21b1b7deadec03d2f5b2ce7de0a41d41.jpg",
  "./assets/assets/bursa/tofas-muzesi.f41411fb6bea1cae721ba285efe03754.jpg",
  "./assets/assets/cumalikizik.6d9f9436775b70337796b3b2ddd1674d.jpg",
  "./assets/assets/gemlik.566e31d4183b1b55ad0995935a8c4ec8.jpg",
  "./assets/assets/iskender.6e3735cdee4f22508256aae60ae2f9f0.jpg",
  "./assets/assets/istanbul/anadolu-fortress.cee42a7853d231600debaa0f60e45d94.jpg",
  "./assets/assets/istanbul/anadolu-kavagi.2862cf376d0bf5c14493dce30a66d392.jpg",
  "./assets/assets/istanbul/archaeology-museum.3357b03328a999e596d3be8ea12feb38.jpg",
  "./assets/assets/istanbul/balat.27dab1647f8c0fd15d7d91131b02863b.jpg",
  "./assets/assets/istanbul/belgrad-forest-new.ad9b23b5de4791b443ebf24431834000.jpg",
  "./assets/assets/istanbul/beylerbeyi.f6af08b814cdb2c8329b5e45e65c1ee6.jpg",
  "./assets/assets/istanbul/caddebostan.db895670b7e066f7e5dc4423ea7bbbf9.jpg",
  "./assets/assets/istanbul/cagaloglu-hamam.a362bf779aa4e0fc44c64e8371135b33.jpg",
  "./assets/assets/istanbul/camlica-grove.b9b3102c98e2e351582b5eb6ac03506b.jpg",
  "./assets/assets/istanbul/camlica-mosque.d831d3c9ea4f873cb1858ae4cb1d8ad8.jpg",
  "./assets/assets/istanbul/cemberlitas-hamam.b5e5d8a7a42ca6cae9044a241e374ceb.jpg",
  "./assets/assets/istanbul/city-walls.7fe3a1e397bb88c2e60ae950cc08cc50.jpg",
  "./assets/assets/istanbul/dolmabahce.6024c2d3623a525e5ed008dab517f7bb.jpg",
  "./assets/assets/istanbul/emirgan-park.bf362322a8a92c3d1ed1633f794cabf5.jpg",
  "./assets/assets/istanbul/eyup-sultan.73e039b7f4da46bbabb784fe97330342.jpg",
  "./assets/assets/istanbul/fatih-mosque.5dc04bbbf1100da13a0e1b98c1e25dfc.jpg",
  "./assets/assets/istanbul/fatih-tomb.8f99b485c490e71ef809a8691022b44c.jpg",
  "./assets/assets/istanbul/galata.3ec85ef3b29929321fc025554d499c70.jpg",
  "./assets/assets/istanbul/grand-bazaar.c1d60bbd52188ff4708194a9b211242b.jpg",
  "./assets/assets/istanbul/gulhane-park.71a8ff3f6dfea87a08f6d0a0de207c96.jpg",
  "./assets/assets/istanbul/hagia-sophia.e66125dcc2a3390f793da3314b6caa35.jpg",
  "./assets/assets/istanbul/hero.fc6210a583af39f40217407a130b644b.jpg",
  "./assets/assets/istanbul/hudayi-tomb.dca3394404139dfb891562f923da9d65.jpg",
  "./assets/assets/istanbul/hurrem-sultan-hamam.8acc8b2c4f1ad057218c260e2e0001b1.jpg",
  "./assets/assets/istanbul/ihlamur-pavilion.430293f90fee046581e96f3701f01493.jpg",
  "./assets/assets/istanbul/istanbul-modern.0b1062f7bcd56ca164240e0969d3811c.jpg",
  "./assets/assets/istanbul/kanlica.e70972ded2bf4a10414006e52c2537e9.jpg",
  "./assets/assets/istanbul/kariye.08b72f155c2b4fc0b46040f4cdf3ace3.jpg",
  "./assets/assets/istanbul/kilic-ali-pasa-hamam.e2f53876f5b2fc3d1bbaec893f7c5787.jpg",
  "./assets/assets/istanbul/kilyos.5d222ff60e61ea822e2946fa2801d537.jpg",
  "./assets/assets/istanbul/kuzguncuk.7faa3bdd913e0078c0ffbc8065c4f6e5.jpg",
  "./assets/assets/istanbul/maiden-tower.d116c3152ad2f621c3c54f2b8bb9905e.jpg",
  "./assets/assets/istanbul/miniaturk-new.cc473aba3b7ac5054bf9974882aa8fc6.jpg",
  "./assets/assets/istanbul/moda.eda44e855247ed75583d81b0ce7e7a70.jpg",
  "./assets/assets/istanbul/new-mosque.ec34d1379b49c6074e7bdd16768bf926.jpg",
  "./assets/assets/istanbul/ortakoy-mosque.42b129c7f2b028699c5f87afbeac3b53.jpg",
  "./assets/assets/istanbul/pera-museum.00fc292a72ee5933e78f4bc9c27f843f.jpg",
  "./assets/assets/istanbul/princes-islands.3a509ce53ba4172d10d32a9f0e923569.jpg",
  "./assets/assets/istanbul/rahmi-koc.1918772fbb39306298bc305a4c0a7fe0.jpg",
  "./assets/assets/istanbul/riva.23b1ce03656b1ab7613579e06cf6f61f.jpg",
  "./assets/assets/istanbul/rumeli-fortress.9da95a2f7ea5f1df84bead8ee9acafd2.jpg",
  "./assets/assets/istanbul/sabanci-museum.5536ad87ec90312a0718fa692476c587.jpg",
  "./assets/assets/istanbul/sile.6c61bb8f576cdead800a80769dbf1405.jpg",
  "./assets/assets/istanbul/spice-bazaar.2c52426f74223829792410804a65be3f.jpg",
  "./assets/assets/istanbul/suleymaniye.b43a9b2f9c76072dfc71d001591e4561.jpg",
  "./assets/assets/istanbul/sultanahmet.679e537422e4f60d4690741bd0f50acb.jpg",
  "./assets/assets/istanbul/topkapi.085c3ee82fc52b018e61c90cf0a1f3d2.jpg",
  "./assets/assets/istanbul/toy-museum.9c6c68f9e3fc33e905ab1448404e24f6.jpg",
  "./assets/assets/istanbul/yerebatan.96a440acd3aa4d0132341ee3607e67b7.jpg",
  "./assets/assets/istanbul/yildiz-park.363b8c37282ed090dd76006a1031b79a.jpg",
  "./assets/assets/spiritual/emir-sultan.9ee4d18a76af8598839ce5e9582f95d6.jpg",
  "./assets/assets/spiritual/geyikli-baba-wide.f1862460bfcaeaded6b604f207c31c99.jpg",
  "./assets/assets/spiritual/hudavendigar-wide.2e5bb89a3ced9ffc2c1373468183c252.jpg",
  "./assets/assets/spiritual/muradiye.f10ff4bdf164d8ad3709aff323af0212.jpg",
  "./assets/assets/spiritual/orhan-gazi-wide.a8de8408bf158cce1758c92325dd8923.jpg",
  "./assets/assets/spiritual/osman-gazi-wide.9a02f653b8cf31cfd21380406c9e98d5.jpg",
  "./assets/assets/spiritual/suleyman-celebi.fb555791c58d1646890150e6ff7e32e6.jpg",
  "./assets/assets/spiritual/uftade.b61955b3798f9d675717e5f29281e50c.jpg",
  "./assets/assets/spiritual/yesil-turbe.6293f3db5e93084349ff1b0e2432f962.jpg",
  "./assets/assets/spiritual/yildirim-bayezid.d97e57ba1788a7e82fd9d4ee897460f5.jpg",
  "./assets/assets/uludag.9cbb1305ecda5b2d3755c207dcaa0214.jpg",
  "./index.html",
  "./metadata.json"
];

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
