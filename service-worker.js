const CACHE_NAME = 'turkiye-rehberi-1787985900469';
const APP_ASSETS = [
  "./_expo/static/js/web/AppEntry-0565b7af7586d0092c3e8961015ef7fe.js",
  "./assets/assets/ankara/altinpark.3c175c24854b56b0b1c1461158203ff1.jpg",
  "./assets/assets/ankara/anadolu-medeniyetleri.4cffabc67dbb9d0d5a7f56e962907567.jpg",
  "./assets/assets/ankara/anitkabir.d9a2810f2ea2d241decd9532b5e76f22.jpg",
  "./assets/assets/ankara/ankara-kalesi.28ae020c5ebd2efae2585273d4c52350.jpg",
  "./assets/assets/ankara/atakule.f5a279cf24f17b7adb472ddb3dc5b04c.jpg",
  "./assets/assets/ankara/augustus.0cd9c9227e37e0e3be3a3561b43decf9.jpg",
  "./assets/assets/ankara/beypazari.3e5d77e4ef17269e1d5a966110c94403.jpg",
  "./assets/assets/ankara/eymir.9adbd85173c375dac14d9b17c5bb98ce.jpg",
  "./assets/assets/ankara/gordion.13c6dee26d90754df859a003527207dc.jpg",
  "./assets/assets/ankara/haci-bayram.9da6caf906cabba2529fd6bf5942fa5b.jpg",
  "./assets/assets/ankara/hamamonu.4936e9978f522a0d9d92737b0f24af32.jpg",
  "./assets/assets/ankara/kocatepe.03d11312598cd266b4ac8da7dead8db9.jpg",
  "./assets/assets/ankara/mogan.cd7c0ab8fed80e4c5c2d90b866884633.jpg",
  "./assets/assets/ankara/nallihan.ec2b6be9de5d7092af92f90dec76a9c9.jpg",
  "./assets/assets/ankara/roma-hamami.7b5963f0b6e907048b6cbe3fa5a290cc.jpg",
  "./assets/assets/ankara/soguksu.121d7b49d92b7d047a4310972ced1470.jpg",
  "./assets/assets/ankara/tuz-golu.7cf5767ffe155958376e5578f9f5395c.jpg",
  "./assets/assets/baths/emir-sultan-hamam.13bd41db784754b82f232221cc4a963e.jpg",
  "./assets/assets/baths/eski-kaplica.1ea83cf46b353d2d85249db3024e257b.jpg",
  "./assets/assets/baths/muradiye-hamam.1d48358fb4ec87be3cda0ab4a1d4f2fc.jpg",
  "./assets/assets/baths/ordekli.67b89bde947c7c92bbf9661f045f9192.jpg",
  "./assets/assets/bursa-hero.680bf7f3fc965645c8dcd3cb43a6f58c.jpg",
  "./assets/assets/bursa/arkeoloji-muzesi.05090b21dd62f25f0d3a33d95badefbb.jpg",
  "./assets/assets/bursa/beach-placeholder.21b1b7deadec03d2f5b2ce7de0a41d41.jpg",
  "./assets/assets/bursa/beaches/buyukkumla.8f5165755d72485175b6964420264655.jpg",
  "./assets/assets/bursa/beaches/kumyaka.66846b8e3378fbe2d3710d0a09dfa7c4.jpg",
  "./assets/assets/bursa/beaches/tirilye.025a16536f34fff3ac11853335b00612.jpg",
  "./assets/assets/bursa/tofas-muzesi.f41411fb6bea1cae721ba285efe03754.jpg",
  "./assets/assets/cumalikizik.6d9f9436775b70337796b3b2ddd1674d.jpg",
  "./assets/assets/gemlik.566e31d4183b1b55ad0995935a8c4ec8.jpg",
  "./assets/assets/iskender.6e3735cdee4f22508256aae60ae2f9f0.jpg",
  "./assets/assets/istanbul/anadolu-fortress.cee42a7853d231600debaa0f60e45d94.jpg",
  "./assets/assets/istanbul/anadolu-kavagi.2862cf376d0bf5c14493dce30a66d392.jpg",
  "./assets/assets/istanbul/archaeology-museum.3357b03328a999e596d3be8ea12feb38.jpg",
  "./assets/assets/istanbul/balat.27dab1647f8c0fd15d7d91131b02863b.jpg",
  "./assets/assets/istanbul/beaches/aglayankaya.83ab151f6d476d93b225d41c3503b808.jpg",
  "./assets/assets/istanbul/beaches/agva-coast.e38bb71f33b3c295e06ee17a013f294b.jpg",
  "./assets/assets/istanbul/beaches/alacali.7a680bb19756dd83293354617bdeb3cb.jpg",
  "./assets/assets/istanbul/beaches/albatros.716c64c4c978a39a0d294f5bed2f3cf9.jpg",
  "./assets/assets/istanbul/beaches/burc-beach.69318e1dad18acde746ef2e985ebc5e2.jpg",
  "./assets/assets/istanbul/beaches/burgazada-marina.2e9d2c579b17da150a1dc9aac0699374.jpg",
  "./assets/assets/istanbul/beaches/buyukcekmece.c769c416553c71a6bb01e63de0551f74.jpg",
  "./assets/assets/istanbul/beaches/cam-limani.319db6b7f224affd16855486092ad1b6.jpg",
  "./assets/assets/istanbul/beaches/cilingoz.d860c8c844785f7731fcad3f88acf8aa.jpg",
  "./assets/assets/istanbul/beaches/dalya.2cdc60012269e946d816ce236d9140cc.jpg",
  "./assets/assets/istanbul/beaches/degirmenburnu.6a3b1e508c9995113ccf7a4425b74f40.jpg",
  "./assets/assets/istanbul/beaches/denizkoskler.6478f32965a3fba0f19a2f3561a3f97f.jpg",
  "./assets/assets/istanbul/beaches/florya-sunset.7ee0c77b54308f2e09f26bd59b6c5ec5.jpg",
  "./assets/assets/istanbul/beaches/gumusyaka.15d23a4e8501af2d9fb84ca0080c7c9d.jpg",
  "./assets/assets/istanbul/beaches/gurpinar.9a66743c3b521c75a33dc236b10eed9b.jpg",
  "./assets/assets/istanbul/beaches/imrenli.841f57eed11d598484724faecda6a770.jpg",
  "./assets/assets/istanbul/beaches/kadirga-koyu.c6a03491a28c12f6305b7916cf207233.jpg",
  "./assets/assets/istanbul/beaches/karaburun-halk.0afb937e25709be8e9249924ba819aae.jpg",
  "./assets/assets/istanbul/beaches/karaburun-port.cc0ae8137da95a719fd08a1c1e820830.jpg",
  "./assets/assets/istanbul/beaches/kilimli-koyu.9eb671284d36d790396aa3133325e06a.jpg",
  "./assets/assets/istanbul/beaches/kinaliada-coast.32c40f43af53be9dee979c5f0736685e.jpg",
  "./assets/assets/istanbul/beaches/kumburgaz.2475d87b027782cb100fc9a3e9b35c4f.jpg",
  "./assets/assets/istanbul/beaches/menekse.67b9dfb4c1986151d8d9fe4e5c0c63cc.jpg",
  "./assets/assets/istanbul/beaches/mimarsinan.0366bd32dd3f8a8fe00d790e7c95575b.jpg",
  "./assets/assets/istanbul/beaches/ormanli.df54572ba60d52d7e697bd4473d95357.jpg",
  "./assets/assets/istanbul/beaches/rumeli-feneri.ee1a06c97bb9bead256a026b9d55f2e5.jpg",
  "./assets/assets/istanbul/beaches/rumeli-kavagi.6f69e1c407395bed65d06e7a41f59294.jpg",
  "./assets/assets/istanbul/beaches/semizkum.d8a44aae462c55e1ed672f16ff5fa3e6.jpg",
  "./assets/assets/istanbul/beaches/sile-beach.e7635aab8a69562bf0c79c8aa53cc2da.jpg",
  "./assets/assets/istanbul/beaches/tarabya.ab987bb6cff140327debb0974bf68ec8.jpg",
  "./assets/assets/istanbul/beaches/tirmata.341275c0ba5d2c2cce165fbc072cb006.jpg",
  "./assets/assets/istanbul/beaches/tuzla-sahil.4b06799af125bd7fe030fd4202669611.jpg",
  "./assets/assets/istanbul/beaches/yalikoy.21c5884150aed4c96b929b8ce7c8dc82.jpg",
  "./assets/assets/istanbul/beaches/yesilkoy-ciroz.07b021db509a7c8ae5f0fec948889b04.jpg",
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
  "./assets/assets/izmir/agora.c5eafaa7137f1ee1f6443c4628c31757.jpg",
  "./assets/assets/izmir/alacati.0d5070ae05163bd30e38827ad707cd30.jpg",
  "./assets/assets/izmir/altinkum.2cd415e5d6160f80562139f929dda118.jpg",
  "./assets/assets/izmir/asansor.99719293776d593a7ff4dcae5a6b06e1.jpg",
  "./assets/assets/izmir/bergama.f047e1d0a9923567511eeb455b38a7e3.jpg",
  "./assets/assets/izmir/birgi.a50516c57db7d515fa2486d4b7d83eb5.jpg",
  "./assets/assets/izmir/cesme-kalesi.5031de1397bfd8fee45df035480c90bf.jpg",
  "./assets/assets/izmir/dikili.0221c8a51ed3367e1069d2dff5210bb3.jpg",
  "./assets/assets/izmir/efes.29c4ae8fbd9044d2233597717895a5be.jpg",
  "./assets/assets/izmir/ekmeksiz.326288d38a16e0dea52ac741f5e51047.jpg",
  "./assets/assets/izmir/foca.0f352fa9cbf265ad5db2e7b4cf6a5889.jpg",
  "./assets/assets/izmir/gediz.0c00656510753c921c12992ed2e7c1a8.jpg",
  "./assets/assets/izmir/gümüldür.1585703fc10f385d763f082fe592a746.jpg",
  "./assets/assets/izmir/hero.49fdbdb23fca023ef6de93810dd88c77.jpg",
  "./assets/assets/izmir/ilica.17de41bbcb6a93ab209817021258a16f.jpg",
  "./assets/assets/izmir/karaburun.5e81b42fd23b16145e827f1b64b08a07.jpg",
  "./assets/assets/izmir/kemeralti.d3e0e92a02132bbce41b2b87665fa72a.jpg",
  "./assets/assets/izmir/meryem-ana.d26ff63bd3bad4789dfde4dd85b240ec.jpg",
  "./assets/assets/izmir/mordogan.f345980b0108496c5e00068603a529b2.jpg",
  "./assets/assets/izmir/ozdere.fc100630afd5f6fa0634005a6037f029.jpg",
  "./assets/assets/izmir/pirlanta.cfa28b50cf79083f558bc97788340b07.jpg",
  "./assets/assets/izmir/sasali.f95a96118d53ef8481506063fcf21376.jpg",
  "./assets/assets/izmir/sigacik.1cda8718aea079ee6ef5a5ff0a3bc092.jpg",
  "./assets/assets/izmir/teos.c145738ac919c67368908e8350235a8d.jpg",
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
