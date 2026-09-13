// 知识记忆台 离线缓存（自托管时使用；资料库在线链接无需此文件）
// network-first：优先从网络拉取最新文件（保证修改后立即生效），离线或网络失败才回退缓存。
const CACHE='km-pwa-v2';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(function(resp){
      if(resp && resp.status===200 && resp.type==='basic'){
        var cp=resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request,cp); });
      }
      return resp;
    }).catch(function(){ return caches.match(e.request); })
  );
});
