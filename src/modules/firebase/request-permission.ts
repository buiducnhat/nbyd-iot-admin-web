import { getToken } from 'firebase/messaging';

import { firebaseConfig, messaging } from '@/modules/firebase';

export const requestFcmPermission = async () => {
  // Requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey: firebaseConfig.vapidKey,
    });

    return token;
  } else if (permission === 'denied') {
    console.log('[Notification Permission] denied');
    return null;
  }

  return null;
};
