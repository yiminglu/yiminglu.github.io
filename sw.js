const cacheName = 'sr-precache-523a44fa85580f6ba09376a439580ca8a2b82e7b';

const PrecacheList = [
  "/",
  "/index.html",
  "/css/main.min.css",
  "/js/main.min.js",
  "/js/ga.js",
  "/posts.html",
  "/about.html",
  "/404.html",
  "/manifest.json",
  "/favicon.ico",
  "/billing/index.html",
  "/billing/static/css/2.c76b3c70.chunk.css",
  "/billing/static/css/main.0f72513e.chunk.css",
  "/billing/static/js/2.8bbf6934.chunk.js",
  "/billing/static/js/main.18d09363.chunk.js",
  "/billing/static/js/runtime~main.65bdb53c.js",
  "/imggps/index.html",
  "/imggps/static/css/main.5f9444b5.css",
  "/imggps/static/images/drop-image.png",
  "/imggps/static/js/101.d06ad948.chunk.js",
  "/imggps/static/js/129.70bc55ec.chunk.js",
  "/imggps/static/js/27.3da58fbf.chunk.js",
  "/imggps/static/js/428.296e3334.chunk.js",
  "/imggps/static/js/main.b53710ec.js",
  "/post/2009/luck.html",
  "/post/2009/yuanyuan.html",
  "/post/2013/git-config.html",
  "/post/2013/live-in-beijing.html",
  "/post/2013/not-a-good-ending.html",
  "/post/2014/a-dark-room.html",
  "/post/2014/markdown-syntax.html",
  "/post/2015/connect-ipv6.html",
  "/post/2015/crossroads.html",
  "/post/2015/ftf-to-zip.html",
  "/post/2015/git-best-practices.html",
  "/post/2015/go-chase-our-dreams.html",
  "/post/2015/responsive-design.html",
  "/post/2016/ssot.html",
  "/post/2018/feelings-of-leaving.html",
  "/post/2018/migration-to-https.html",
  "/post/2018/pwa-integration.html",
  "/post/2019/adding-dark-mode.html",
  "/post/2019/over-concern.html",
  "/post/2019/the-2nd-birthday.html",
  "/post/2020/choice-about-responsibility.html",
  "/post/2020/enable-ntfs-mac.html",
  "/post/2020/fifth-huluversary.html",
  "/post/2020/hevcify-camera-videos.html",
  "/post/2020/ncee-delayed.html",
  "/post/2023/eighth-huluversary.html",
  "/post/2023/guizhou.html",
  "/post/2023/hulun-buir.html",
  "/post/2023/lifes-hard.html",
  "/post/2023/ningxia.html",
  "/post/2023/qing-gan-grand-loop.html",
  "/post/2023/ulan-buh.html",
  "/post/2023/zibo-yantai.html",
  "/post/2024/hongkong.html",
  "/post/2024/lifes-fragile.html",
  "/post/2024/weihai-rushan.html",
  "/post/2024/why-working-hard.html",
  "/images/logo/daisy.png",
  "/images/logo/leaf-1.png",
  "/images/logo/leaf-2.png",
  "/images/logo/opaque-128.png",
  "/images/logo/opaque-152.png",
  "/images/logo/opaque-167.png",
  "/images/logo/opaque-180.png",
  "/images/logo/opaque-256.png",
  "/images/logo/opaque-512.png",
  "/images/logo/SR-full.png",
  "/images/logo/SR-huge.png",
  "/images/logo/SR-oneline.png",
  "/images/logo/SR-simple.png",
  "/images/logo/transparent-128.png",
  "/images/logo/transparent-192.png",
  "/images/logo/transparent-256.png",
  "/images/logo/transparent-512.png",
  "/images/splashscreens/ipad_splash.png",
  "/images/splashscreens/ipadpro1_splash.png",
  "/images/splashscreens/ipadpro2_splash.png",
  "/images/splashscreens/ipadpro3_splash.png",
  "/images/splashscreens/iphone6_splash.png",
  "/images/splashscreens/iphoneplus_splash.png",
  "/images/splashscreens/iphonex_splash.png",
  "/images/splashscreens/iphonexr_splash.png",
  "/images/splashscreens/iphonexsmax_splash.png",
  "/images/topbar/1.jpg",
  "/images/topbar/2.jpg",
  "/images/topbar/3.jpg",
  "/images/topbar/4.jpg",
  "/images/topbar/5.jpg",
  "/images/topbar/6.jpg"
];


self.addEventListener('install', function(e) {
  console.log('[SW] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[SW] Caching all files.');
      cache.addAll(PrecacheList);
      console.log('[SW] SkipWaiting');
      return self.skipWaiting();
    })
  );
});


self.addEventListener('activate', function(e) {
  console.log('[SW] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[SW] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

