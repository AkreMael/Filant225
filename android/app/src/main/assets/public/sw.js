/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-5a5d9309'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "offline.html",
    "revision": "18e896d3375118c2e391d2ec942e8d71"
  }, {
    "url": "index.html",
    "revision": "b5688744e2d4864d437440457882a17c"
  }, {
    "url": "firebase-messaging-sw.js",
    "revision": "3a5a44e2c304af9079c96c58c53d9aa4"
  }, {
    "url": "assets/vendor-motion-Cu7gqrnc.js",
    "revision": null
  }, {
    "url": "assets/vendor-lucide-BuRcVQUv.js",
    "revision": null
  }, {
    "url": "assets/vendor-firebase-B5hTcyTQ.js",
    "revision": null
  }, {
    "url": "assets/vendor-CnNdDZAq.js",
    "revision": null
  }, {
    "url": "assets/index--JliJrZZ.js",
    "revision": null
  }, {
    "url": "favicon.ico",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-128x128-maskable.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-128x128.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-144x144-maskable.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-144x144.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-192x192-maskable.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-192x192.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-256x256-maskable.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-256x256.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-384x384-maskable.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-384x384.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-512x512-maskable.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-512x512.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-72x72-maskable.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-72x72.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-96x96-maskable.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "icons/icon-96x96.png",
    "revision": "09d3dca10bd1b0dfd1dcea74fc4a4a79"
  }, {
    "url": "screenshots/screenshot-desktop.png",
    "revision": "5df4aad74413f8ec162cc1b05b97b98f"
  }, {
    "url": "screenshots/screenshot-mobile.png",
    "revision": "1a93377aea6fad7c2cc141ac4fbc7820"
  }, {
    "url": "manifest.webmanifest",
    "revision": "bee9377b13d49235fc07a5a0e9af260f"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
