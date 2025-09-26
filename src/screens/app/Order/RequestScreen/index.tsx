import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  requestOrderAcceptData,
  requestOrderRejectData,
  requestOrdersListData,
} from '@/feature/thunks/orders_thunks';
import {
  selectOrderAcceptStatus,
  selectOrderRejectStatus,
  selectOrdersRequestListData,
  selectOrdersRequestListStatus,
  resetOrderAccept,
  resetOrderReject,
  selectOrderAcceptLoadingIds,
  selectOrderRejectLoadingIds,
} from '@/feature/slices/orders_slice';
import { STATUS } from '@/feature/services/status_constants';
import { createStyles } from './styles';
import EmptyValue from '@/assets/icons/EmptyValue.svg';
import { globalStyles } from '@/utils/globalStyles';
import { hp, wp } from '@/utils/Scaling';

const RequestScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const dispatch = useAppDispatch();
  const ordersListData = useAppSelector(selectOrdersRequestListData);
  const ordersListStatus = useAppSelector(selectOrdersRequestListStatus);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const orders = ordersListData?.data?.orders || [];
  const pagination = ordersListData?.data?.pagination_by_status?.request;

  useEffect(() => {
    loadOrders(true);
  }, []);

  // Monitor accept status and clear after success
  const OrderAcceptStatus = useAppSelector(selectOrderAcceptStatus);

  const acceptLoadingIds = useAppSelector(selectOrderAcceptLoadingIds);
  const rejectLoadingIds = useAppSelector(selectOrderRejectLoadingIds);

  const acceptLoadingSet = useMemo(
    () => new Set((acceptLoadingIds || []).map(id => String(id))),
    [acceptLoadingIds],
  );
  const rejectLoadingSet = useMemo(
    () => new Set((rejectLoadingIds || []).map(id => String(id))),
    [rejectLoadingIds],
  );

  useEffect(() => {
    if (OrderAcceptStatus === STATUS.SUCCEEDED) {
      // Clear the accept status after successful operation
      setTimeout(() => {
        dispatch(resetOrderAccept());
      }, 1000);
    }
  }, [OrderAcceptStatus, dispatch]);

  // Monitor reject status and clear after success
  const OrderRejectStatus = useAppSelector(selectOrderRejectStatus);

  useEffect(() => {
    if (OrderRejectStatus === STATUS.SUCCEEDED) {
      // Clear the reject status after successful operation
      setTimeout(() => {
        dispatch(resetOrderReject());
      }, 1000);
    }
  }, [OrderRejectStatus, dispatch]);

  const loadOrders = useCallback(
    async (
      reset: boolean = false,
      searchOverride?: string,
      per_page?: number,
    ) => {
      try {
        await dispatch(
          requestOrdersListData({
            page: 1,
            per_page: per_page ?? 10,
            search: searchOverride,
            request: 'request',
          }),
        ).unwrap();
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    },
    [dispatch, pagination],
  );

  const loadMoreOrders = useCallback(async () => {
    if (isLoadingMore || !pagination) return;

    if (pagination.per_page < pagination.total) {
      setIsLoadingMore(true);
      await loadOrders(false, undefined, pagination.per_page + 10);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, pagination, loadOrders]);

  const renderOrderItem = useCallback(
    ({ item }: { item: any }) => {
      const order = item;

      const onSelectDecline = () => {
        dispatch(requestOrderRejectData(item.id));
      };

      const onSelectAccept = () => {
        dispatch(requestOrderAcceptData(item.id));
      };

      // Check if this specific order is loading
      const isAcceptLoading = acceptLoadingSet.has(String(item.id));

      const isRejectLoading = rejectLoadingSet.has(String(item.id));

      // Format items for OrderRequestCard
      const orderItems =
        order.items?.map((item: any) => ({
          name: item.item_name,
          quantity: item.quantity || 1,
        })) || [];

      return (
        <OrderRequestCard
          orderNumber={order.unique_id}
          items={orderItems}
          onAccept={onSelectAccept}
          onDecline={onSelectDecline}
          loadingAccept={isAcceptLoading}
          loadingDecline={isRejectLoading}
        />
      );
    },
    [dispatch, acceptLoadingSet, rejectLoadingSet],
  );

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }, [isLoadingMore, colors.primary]);

  // Reload list whenever screen gains focus using navigation listener
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadOrders(true);
    });

    return unsubscribe;
  }, [navigation, loadOrders]);

  const renderEmpty = useCallback(() => {
    if (ordersListStatus === STATUS.LOADING) return null;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp('20%'),
        }}
      >
        <EmptyValue height={wp('40%')} width={wp('40%')} />
        <Text
          style={[
            globalStyles.h6,
            {
              color: colors.dropDownIcon,
              textAlign: 'center',
            },
          ]}
        >
          No any orders request found
        </Text>
      </View>
    );
  }, [ordersListStatus, colors.headerTxt]);

  if (ordersListStatus === STATUS.LOADING && !pagination) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreOrders}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshing={ordersListStatus === STATUS.LOADING && !pagination}
        onRefresh={() => loadOrders(true)}
      />
    </View>
  );
};

export default RequestScreen;
