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
import { useAppDispatch } from '@/feature/stateHooks';
import { requestOrdersListData } from '@/feature/thunks/orders_thunks';

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
  const messaging = getMessaging();

  const navigationRef = useRef<any>(null);

  const dispatch = useAppDispatch();

  onMessage(messaging, async remoteMessage => {
    console.log('foreground remoteMessage', remoteMessage);
    if (typeof remoteMessage?.data?.notifee === 'string') {
      SoundPlayer.playAsset(require('../../assets/audios/OrderRing.wav'));
      displayOrderAlertNotificationForeground(
        JSON.parse(remoteMessage?.data?.notifee),
      );
      // Reload request orders list
      await dispatch(
        requestOrdersListData({
          request: 'request',
          per_page: 10,
          page: 1,
        }),
      ).unwrap();
    } else {
      displayForegroundPushNotification(remoteMessage?.notification);
    }
  });
  //background handler
  setBackgroundMessageHandler(messaging, async remoteMessage => {
    console.log('background message', remoteMessage);
    if (typeof remoteMessage?.data?.notifee === 'string') {
      displayOrderAlertNotification(JSON.parse(remoteMessage?.data?.notifee));
      await dispatch(
        requestOrdersListData({
          request: 'request',
          per_page: 10,
          page: 1,
        }),
      ).unwrap();
    }
  });

  const createChannel = async () => {
    try {
      await notifee.createChannel({
        id: 'order-alert-channel',
        name: 'Order response',
        badge: false,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        vibration: true,
        sound: 'orderring',
        bypassDnd: true,
        vibrationPattern: [300, 200],
      });

      await notifee.createChannel({
        id: 'order-alert-foreground-channel',
        name: 'Order response',
        badge: false,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        vibration: true,
        sound: 'none',
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
        if (event?.detail?.pressAction?.id == 'ViewOrder') {
          navigationRef.current.navigate('OrderStack');
          if (event?.detail?.notification?.id) {
            notifee.cancelDisplayedNotification(event?.detail.notification.id);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // response display notification
  const displayOrderAlertNotification = (responseMessage: any) => {
    try {
      notifee.displayNotification({
        title: responseMessage?.data?.message_en,
        body: `Order ID : #${responseMessage?.data?.uniqueId}`,
        data: { requestId: responseMessage?.data?.orderId },
        android: {
          channelId: 'order-alert-channel',
          category: AndroidCategory.MESSAGE,
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'ViewOrder',
            launchActivity: 'default',
          },
          // Custom colors
          color: '#EB2229',

          // Enhanced properties
          ongoing: true,
          autoCancel: false,
          showTimestamp: true,
          loopSound: true,
          timeoutAfter: 20000,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // response display order alert notification foreground
  const displayOrderAlertNotificationForeground = (responseMessage: any) => {
    try {
      notifee.displayNotification({
        title: responseMessage?.data?.message_en,
        body: `Order ID : #${responseMessage?.data?.uniqueId}`,
        data: { requestId: responseMessage?.data?.orderId },
        android: {
          channelId: 'order-alert-foreground-channel',
          category: AndroidCategory.MESSAGE,
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'ViewOrder',
            launchActivity: 'default',
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
