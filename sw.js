// Service worker code goes in here!
var cacheVersion="v2";
self.addEventListener("install",function(event){
    event.waitUntil(caches.open(cacheVersion).then(function(cache){
        return self.skipWaiting();
    }));
});
self.addEventListener("activate",function(event){
    return self.clients.claim();
});
self.addEventListener("fetch",function(event){
    event.respondWith(
        fetch(event.request).then(function(fetchedResponse){
            caches.open(cacheVersion).then(function(cache){
                // https://stackoverflow.com/questions/55979921/error-request-object-that-has-already-been-used
                cache.put(event.request,fetchedResponse);
            });
            return fetchedResponse.clone();
        }).catch(function(){
            return caches.match(event.request);
        })
    );
});
