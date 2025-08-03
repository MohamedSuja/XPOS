import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from './Stacks/AuthStack';
import BottomTab from './BottomTab';

const AppRoutes = () => {
  const config = {
    screens: {
      // LoginScreen: {
      //   path: 'login/:token',
      // },
      // HomeStack: {
      //   path: 'home',
      //   screens: {
      //     NotificationScreen: {
      //       path: 'notification',
      //     },
      //   },
      // },
    },
  };

  const linking = {
    prefixes: ['com.xpos://', 'https://xpos.com/'],
    config,
  };

  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
};

export default AppRoutes;
