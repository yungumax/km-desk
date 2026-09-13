// 知识记忆台 离线缓存（自托管时使用；资料库在线链接无需此文件）
const CACHE='km-pwa-v1';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.open(CACHE).then(function(c){return c.match(e.request).then(function(r){return r||fetch(e.request).then(function(resp){try{c.put(e.request,resp.clone());}catch(_){}return resp;});});})
    .catch(function(){return fetch(e.request);})
  );
});
