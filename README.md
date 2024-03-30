# Jump Rope Tracker

This is a writeup of my side project "Jump Rope Tracker" using svelte PWA w/indexedDB.

What's the motivation behind it?! I wanted something useful for myself to keep track of the progress I've made so far in my jump-rope journey and want it to be flexible according to my needs. So tada, why not create one instead!! Tada!

UI
My experience with svelte: It was surprisingly handy to pick up coming from an angular/react/solid background. I often felt like "it's like vanilla js but much better DX".
Svelte features:
Custom stores: It's the best part about the svelte so far I enjoyed the most. I got inspired by a redux -like store in Svelte by a fireship and went with that state management since it is a CRUD operation. And localstorage custom store was handy when you dealing with primitives which needs reactive changes across the application.

Storage:

            The end user is myself for personal use. I really didn't want to store and manage user data at all. looking at the options: we have LocalStorage, IndexedDB.. And Web SQL is deprecated. IndexedDB is an object oriented database which has a key-value store in which we are able to perform CRUD operations which live in your browser. Provides set of API to

LocalStorage - used to store the object which stores the streak data like max PR count, and other computational data. To avoid recalculating every time the user opens the application. Introduced an object property called hash which stores the hash of the IndexedDB rows. If the data in IndexedDB is tampered or if the user added a new log then, it will be recalculated. If not, then it will get from localstorage.

Service Workers
The service worker is used to handle notifications in the background when the app is not visible.

Notifications
There are two types of notifications on the web.
Push
Local

Push Notifications are sent from the remote server. For example: If Amazon offers any sale like independence day sale, it will be pushed from the server to the user.
Local Notifications don't need a server to show notification, and will be handled by the app itself. Local Notifications works the best for my use case where I am able to show notification when the web page is not visible and the timer is running.

One setback when working with notifications, Once the notifications are sent out to the user we have no control over it (ie) cannot be able to manipulate/update the content of the notification after it is sent out to the user. I wanted to display a running timer on the notification bar, as it runs for every second. Imagine the nightmare to show and delete notifications for every second, it will overload the browser resources and the worst user experience. So I went with, <insert timer is running>

If the timer is running and the app is not running on foreground on focus, it will display notifications like pause/stop.

If pause is pressed then close and show a new notification which contains play/stop instead.

Notifications can either be triggered from the main thread or service worker in the background. Since we don't have access to the main thread while the app is not visible, service worker notifications make much more sense.

Pain Points: tried moving the timer logic to the service worker to see if I could get away with closing the app entirely and just have a notification that the timer is running. But browsers kill the service worker if it detects abnormal operations.

Offline PWA Support
Uses vite-pwa-plugin for PWA configuration and caches.
