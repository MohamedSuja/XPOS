import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from './Stacks/AuthStack';
import BottomTab from './BottomTab';
import { useAppSelector } from '@/feature/stateHooks';
import { selectAuthenticationLoginDataStatus } from '@/feature/slices/auth_slice';
import { STATUS } from '@/feature/services/status_constants';

const AppRoutes = () => {
  const AuthenticationLoginDataStatus = useAppSelector(
    selectAuthenticationLoginDataStatus,
  );
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
      {AuthenticationLoginDataStatus === STATUS.SUCCEEDED ? (
        <BottomTab />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppRoutes;
