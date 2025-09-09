import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AuthStack from './Stacks/AuthStack';
import BottomTab from './BottomTab';
import { useAppSelector } from '@/feature/stateHooks';
import {
  selectAuthenticationLoginData,
  selectAuthenticationLoginDataStatus,
} from '@/feature/slices/auth_slice';
import { STATUS } from '@/feature/services/status_constants';
import UserStack from './Stacks/UserStack';
import { setAccessToken } from '@/feature/services/api';

const AppRoutes = () => {
  const AuthenticationLoginDataStatus = useAppSelector(
    selectAuthenticationLoginDataStatus,
  );

  const AuthenticationLoginData = useAppSelector(selectAuthenticationLoginData);

  useEffect(() => {
    if (AuthenticationLoginDataStatus == STATUS.SUCCEEDED) {
      setAccessToken(AuthenticationLoginData?.data.token);
    }
  }, []);

  return (
    <NavigationContainer>
      {AuthenticationLoginDataStatus === STATUS.SUCCEEDED ? (
        <UserStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppRoutes;
