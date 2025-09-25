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
import { selectOrdersSliceStatus } from '@/feature/slices/orders_slice';

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const AuthSliceStatus = useAppSelector(selectAuthSliceStatus);
  const OrdersSliceStatus = useAppSelector(selectOrdersSliceStatus);

  useUpdateEffect(() => {
    if (AuthSliceStatus === STATUS.LOADING) {
      setLoading(true);
    } else if (AuthSliceStatus === STATUS.SUCCEEDED) {
      setLoading(false);
    } else if (AuthSliceStatus === STATUS.FAILED) {
      setLoading(false);
    }

    if (OrdersSliceStatus === STATUS.LOADING) {
      setLoading(true);
    } else if (OrdersSliceStatus === STATUS.SUCCEEDED) {
      setLoading(false);
    } else if (OrdersSliceStatus === STATUS.FAILED) {
      setLoading(false);
    }
  }, [AuthSliceStatus, OrdersSliceStatus]);

  return (
    <View style={styles.root}>
      {children}
      <FlashMessage
        position="top"
        statusBarHeight={Platform.OS == 'ios' ? hp(6) : hp(4)}
      />
      <AppLoadingModel visible={loading} />
    </View>
  );
};

export default LoadingProvider;
