importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyAlF6Y3d9Z582OzqNxWVH7aPm9vE6g3Yyk',
  authDomain: 'nbyd-platform-47.firebaseapp.com',
  projectId: 'nbyd-platform-47',
  storageBucket: 'nbyd-platform-47.appspot.com',
  messagingSenderId: '625160394828',
  appId: '1:625160394828:web:bfb76e6e64d46ba1cefce9',
  measurementId: 'G-HPF1R2K4ZK',
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
