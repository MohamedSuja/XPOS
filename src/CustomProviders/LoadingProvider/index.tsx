import React, { ReactNode, useState } from 'react';
import { Platform, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { styles } from './styles';

import { STATUS } from '@/feature/services/status_constants';
import { useAppSelector } from '@/feature/stateHooks';
import { selectAuthSliceStatus } from '@/feature/slices/auth_slice';
import { useUpdateEffect } from '@/utils/useUpdateEffect';
import { hp } from '@/utils/Scaling';
import AppLoadingModel from '@/components/AppLoadingModel';

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const AuthSliceStatus = useAppSelector(selectAuthSliceStatus);

  useUpdateEffect(() => {
    if (AuthSliceStatus === STATUS.LOADING) {
      setLoading(true);
    } else if (AuthSliceStatus === STATUS.SUCCEEDED) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [AuthSliceStatus]);

  return (
    <View style={styles.root}>
      {children}
      <FlashMessage
        position="top"
        floating
        statusBarHeight={Platform.OS == 'ios' ? hp(6) : hp(4)}
      />
      <AppLoadingModel visible={loading} />
    </View>
  );
};

export default LoadingProvider;
