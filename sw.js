const cacheName = 'sr-precache-b187abadf7725ba4d76f35a5db0723f9cffaef3e';

const PrecacheList = [
  "/",
  "/index.html",
  "/css/main.min.028975ca4d1d09e96c73ba1218e01c4f2303c5e8e5e7e3faa3e47be2537934c3.css",
  "/js/main.min.js",
  "/js/ga.js",
  "/posts.html",
  "/about.html",
  "/404.html",
  "/manifest.json",
  "/favicon.ico",
  "/billing/",
  "/billing/assets/index-CKArpnzf.css",
  "/billing/assets/index-B9fFSB-v.js",
  "/post/2026/bird-house.html",
  "/post/2025/zhejiang-lishui.html",
  "/post/2025/yunnan3.0.html",
  "/post/2025/yinshan-pagodas.html",
  "/post/2025/xiyucun.html",
  "/post/2025/wangjing-flower-stream.html",
  "/post/2025/tibet-linzhi.html",
  "/post/2025/tianjin-taida.html",
  "/post/2025/super-hopeson.html",
  "/post/2025/shenyang.html",
  "/post/2025/shanxi-datong.html",
  "/post/2025/shandong-oulebao.html",
  "/post/2025/qinhuangdao-yutian.html",
  "/post/2025/olympic-forest-park.html",
  "/post/2025/niulanshan-liquor-museum.html",
  "/post/2025/moshikou.html",
  "/post/2025/jinhaihu-trail-2.html",
  "/post/2025/jianhe-park.html",
  "/post/2025/jiangxi.html",
  "/post/2025/i-see-u-yinshang.html",
  "/post/2025/henan-anyang.html",
  "/post/2025/heilongjiang-yichun.html",
  "/post/2025/hebei-yuxian.html",
  "/post/2025/guizhou-xingyi.html",
  "/post/2025/gubei-shuizhen.html",
  "/post/2025/guangxi-chongzuo.html",
  "/post/2025/dingdu-peak.html",
  "/post/2025/dajue-temple.html",
  "/post/2025/cnfm.html",
  "/post/2025/chaoshan.html",
  "/post/2025/blood-moon.html",
  "/post/2025/baihujian.html",
  "/post/2025/arts-crafts.html",
  "/post/2024/xuzhou.html",
  "/post/2024/wuhan.html",
  "/post/2024/why-working-hard.html",
  "/post/2024/weihai-rushan.html",
  "/post/2024/pofengling2.0.html",
  "/post/2024/northern-xinjiang.html",
  "/post/2024/mushrooms.html",
  "/post/2024/mount-taishan.html",
  "/post/2024/lifes-fragile.html",
  "/post/2024/lantern-festival.html",
  "/post/2024/jinshanling-aranya.html",
  "/post/2024/jinhaihu-trail.html",
  "/post/2024/hongkong.html",
  "/post/2024/hebi-zhengzhou.html",
  "/post/2024/gu-an-hot-spring.html",
  "/post/2024/grand-canal-museum.html",
  "/post/2024/first-snow.html",
  "/post/2024/beijing-library.html",
  "/post/2023/zibo-yantai.html",
  "/post/2023/wucaiqianshan.html",
  "/post/2023/universal-studios-beijing.html",
  "/post/2023/ulan-buh.html",
  "/post/2023/qing-gan-grand-loop.html",
  "/post/2023/ningxia.html",
  "/post/2023/lifes-hard.html",
  "/post/2023/hulun-buir.html",
  "/post/2023/guizhou.html",
  "/post/2023/eighth-huluversary.html",
  "/post/2023/beihai.html",
  "/post/2020/ncee-delayed.html",
  "/post/2020/hevcify-camera-videos.html",
  "/post/2020/fifth-huluversary.html",
  "/post/2020/choice-about-responsibility.html",
  "/post/2019/the-2nd-birthday.html",
  "/post/2019/over-concern.html",
  "/post/2019/adding-dark-mode.html",
  "/post/2018/pwa-integration.html",
  "/post/2018/migration-to-https.html",
  "/post/2018/feelings-of-leaving.html",
  "/post/2015/go-chase-our-dreams.html",
  "/post/2015/crossroads.html",
  "/post/2015/connect-ipv6.html",
  "/post/2014/markdown-syntax.html",
  "/post/2013/not-a-good-ending.html",
  "/post/2013/live-in-beijing.html",
  "/post/2013/git-config.html",
  "/images/logo/SR-oneline.png",
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

