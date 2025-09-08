import { View, Text } from 'react-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  getMessaging,
  onMessage,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
  Event,
} from '@notifee/react-native';
import SoundPlayer from 'react-native-sound-player';

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
  const messaging = getMessaging();

  const navigationRef = useRef<any>(null);

  onMessage(messaging, async remoteMessage => {
    console.log('foreground remoteMessage', remoteMessage);
    if (typeof remoteMessage?.data?.notifee === 'string') {
      console.log('foreground trigger');
      // SoundPlayer.playAsset(require('../../assets/audios/OrderRing.wav'));
      // handleViewOrder(JSON.parse(remoteMessage?.data?.notifee)?.data);
    } else {
      displayForegroundPushNotification(remoteMessage?.notification);
    }
  });
  //background handler
  setBackgroundMessageHandler(messaging, async remoteMessage => {
    console.log('background message', remoteMessage);
    if (typeof remoteMessage?.data?.notifee === 'string') {
      // displayNotification(JSON.parse(remoteMessage?.data?.notifee));
    }
  });

  const createChannel = async () => {
    try {
      await notifee.createChannel({
        id: 'order-response-channel',
        name: 'Order response',
        badge: false,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        vibration: true,
        sound: 'default',
        bypassDnd: true,
        vibrationPattern: [300, 200],
      });

      await notifee.createChannel({
        id: 'normal-channel',
        name: 'normal notification',
        badge: false,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        vibration: true,
        bypassDnd: true,
        sound: 'default',
        vibrationPattern: [300, 200],
      });

      await notifee.onBackgroundEvent(async (event: Event) => {
        console.log('BG trigger', event?.detail?.pressAction?.id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // response display notification
  const displayResponseNotification = (responseMessage: any) => {
    try {
      notifee.displayNotification({
        title: responseMessage?.action_performed
          ? 'Order Accepted'
          : 'Order Declined',
        body: `Order ID : ${responseMessage?.driver_request?.id}`,
        data: { requestId: responseMessage?.driver_request?.id },
        android: {
          channelId: 'order-response-channel',
          category: AndroidCategory.MESSAGE,
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
          // Custom colors
          color: '#EB2229',

          // Enhanced properties
          autoCancel: false,
          showTimestamp: true,
          ongoing: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // foreground message
  const displayForegroundPushNotification = (responseMessage: any) => {
    try {
      notifee.displayNotification({
        title: responseMessage?.title,
        body: responseMessage?.body,
        android: {
          channelId: 'normal-channel',
          category: AndroidCategory.REMINDER,
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          smallIcon: 'ic_launcher',
          // asForegroundService: true,
          // Custom colors
          color: '#EB2229',

          // Enhanced properties
          autoCancel: false,
          showTimestamp: true,
          ongoing: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createChannel();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        // setNavigate: (navigation: any) => {
        //   navigationRef.current = navigation;
        // },
        setNavigator: (navigation: any) => {
          navigationRef.current = navigation;
        },
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
