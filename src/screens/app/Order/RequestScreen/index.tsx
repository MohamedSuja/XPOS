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
  selectOrderAcceptData,
  selectOrderAcceptStatus,
  selectOrderRejectData,
  selectOrderRejectStatus,
  selectOrdersRequestListData,
  selectOrdersRequestListStatus,
  resetOrderAccept,
  resetOrderReject,
  selectIsOrderAcceptLoading,
  selectIsOrderRejectLoading,
  selectOrderAcceptLoadingIds,
  selectOrderRejectLoadingIds,
} from '@/feature/slices/orders_slice';
import { STATUS } from '@/feature/services/status_constants';

const RequestScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const dispatch = useAppDispatch();
  const ordersListData = useAppSelector(selectOrdersRequestListData);
  const ordersListStatus = useAppSelector(selectOrdersRequestListStatus);

  const [perPage, setPerPage] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const orders = ordersListData?.data?.orders || [];
  const pagination = ordersListData?.data?.pagination_by_status?.request;

  useEffect(() => {
    loadOrders(true);
  }, []);

  // Monitor accept status and clear after success
  const OrderAcceptStatus = useAppSelector(selectOrderAcceptStatus);
  const OrderAcceptData = useAppSelector(selectOrderAcceptData);

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
  const OrderRejectData = useAppSelector(selectOrderRejectData);

  useEffect(() => {
    if (OrderRejectStatus === STATUS.SUCCEEDED) {
      // Clear the reject status after successful operation
      setTimeout(() => {
        dispatch(resetOrderReject());
      }, 1000);
    }
  }, [OrderRejectStatus, dispatch]);

  const loadOrders = useCallback(
    async (reset: boolean = false) => {
      const currentPerPage = reset ? 10 : perPage;
      if (reset) {
        setPerPage(10);
        setHasMoreData(true);
      }

      try {
        await dispatch(
          requestOrdersListData({
            request: 'request',
            per_page: currentPerPage,
            page: 1,
          }),
        ).unwrap();

        if (pagination) {
          setHasMoreData(perPage < pagination.total);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    },
    [dispatch, pagination, perPage],
  );

  const loadMoreOrders = useCallback(async () => {
    if (isLoadingMore || !hasMoreData || !pagination) return;

    const newPerPage = perPage + 10;

    setIsLoadingMore(true);
    setPerPage(newPerPage);
    await loadOrders(false);
    setIsLoadingMore(false);
  }, [perPage, isLoadingMore, hasMoreData, pagination, loadOrders]);

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

      // Format date and time
      const orderDate = new Date(order.created_at);
      const dateStr = orderDate.toLocaleDateString();
      const timeStr = orderDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      return (
        <OrderRequestCard
          orderNumber={order.unique_id}
          items={orderItems}
          onAccept={onSelectAccept}
          onDecline={onSelectDecline}
          loadingAccept={isAcceptLoading}
          loadingDecline={isRejectLoading}
          date={dateStr}
          time={timeStr}
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
          paddingVertical: 50,
        }}
      >
        <Text
          style={{
            color: colors.headerTxt,
            fontSize: 16,
            textAlign: 'center',
          }}
        >
          No pending orders found
        </Text>
      </View>
    );
  }, [ordersListStatus, colors.headerTxt]);

  if (ordersListStatus === STATUS.LOADING && perPage === 10) {
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreOrders}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshing={ordersListStatus === STATUS.LOADING && perPage === 10}
        onRefresh={() => loadOrders(true)}
      />
    </View>
  );
};

export default RequestScreen;
