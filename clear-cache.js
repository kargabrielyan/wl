console.log('Clearing cache...'); if('caches' in window) { caches.keys().then(names => Promise.all(names.map(name => caches.delete(name)))).then(() => console.log('Cache cleared')); }
