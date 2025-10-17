/**
 * Service Worker for EMO Lab Website
 * Implements caching strategies for better performance
 */

const CACHE_NAME = 'emo-lab-v1.0.0';
const STATIC_CACHE = 'emo-lab-static-v1.0.0';
const DYNAMIC_CACHE = 'emo-lab-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/about.html',
  '/team.html',
  '/achievements.html',
  '/partners.html',
  '/contact.html',
  '/css/main.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/dataLoader.js',
  '/data/site-data.json',
  '/data/achievements.json',
  '/images/team/team-photo.jpg'
];

// Files to cache on demand
const DYNAMIC_FILES = [
  '/css/animations.css',
  '/js/animations.js',
  '/js/lazyLoading.js',
  '/js/performanceOptimizer.js'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Serving from cache:', request.url);
          return cachedResponse;
        }
        
        // Otherwise fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Determine cache strategy based on file type
            const cacheStrategy = getCacheStrategy(request.url);
            
            if (cacheStrategy === 'static') {
              // Cache static files
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
            } else if (cacheStrategy === 'dynamic') {
              // Cache dynamic files
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
            }
            
            return response;
          })
          .catch((error) => {
            console.error('Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            // Return cached version if available
            return caches.match(request);
          });
      })
  );
});

/**
 * Determine cache strategy based on URL
 */
function getCacheStrategy(url) {
  // Static files that rarely change
  if (url.includes('.css') || url.includes('.js') || url.includes('.json')) {
    return 'static';
  }
  
  // Images and other assets
  if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif') || url.includes('.webp')) {
    return 'dynamic';
  }
  
  // HTML pages
  if (url.endsWith('.html') || url.endsWith('/')) {
    return 'static';
  }
  
  // API calls and other dynamic content
  return 'dynamic';
}

/**
 * Cache management utilities
 */
const CacheManager = {
  /**
   * Clear all caches
   */
  clearAllCaches() {
    return caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      });
  },
  
  /**
   * Get cache size
   */
  getCacheSize() {
    return caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => 
            caches.open(cacheName)
              .then((cache) => cache.keys())
              .then((keys) => ({ name: cacheName, size: keys.length }))
          )
        );
      });
  },
  
  /**
   * Update cache version
   */
  updateCache() {
    return this.clearAllCaches()
      .then(() => {
        return caches.open(STATIC_CACHE)
          .then((cache) => cache.addAll(STATIC_FILES));
      });
  }
};

// Handle messages from main thread
self.addEventListener('message', (event) => {
  const { action, data } = event.data;
  
  switch (action) {
    case 'CLEAR_CACHE':
      CacheManager.clearAllCaches()
        .then(() => {
          event.ports[0].postMessage({ success: true });
        })
        .catch((error) => {
          event.ports[0].postMessage({ success: false, error: error.message });
        });
      break;
      
    case 'GET_CACHE_SIZE':
      CacheManager.getCacheSize()
        .then((sizes) => {
          event.ports[0].postMessage({ success: true, data: sizes });
        })
        .catch((error) => {
          event.ports[0].postMessage({ success: false, error: error.message });
        });
      break;
      
    case 'UPDATE_CACHE':
      CacheManager.updateCache()
        .then(() => {
          event.ports[0].postMessage({ success: true });
        })
        .catch((error) => {
          event.ports[0].postMessage({ success: false, error: error.message });
        });
      break;
      
    default:
      event.ports[0].postMessage({ success: false, error: 'Unknown action' });
  }
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    );
  }
});

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/icon-192x192.png',
      badge: '/images/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

console.log('Service Worker loaded successfully');
