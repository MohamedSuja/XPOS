import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import { requestOrdersListData } from '@/feature/thunks/orders_thunks';
import {
  selectOrdersRequestListData,
  selectOrdersRequestListStatus,
} from '@/feature/slices/orders_slice';
import { STATUS } from '@/feature/services/status_constants';
import { OrderStackScreenProps } from '@/navigation/NavigationModels/OrderStack';

const RequestScreen = ({
  navigation,
}: OrderStackScreenProps<'TopTabNavigator'>) => {
  const { colors }: ThemeContextType = useTheme();
  const dispatch = useAppDispatch();
  const ordersListData = useAppSelector(selectOrdersRequestListData);
  const ordersListStatus = useAppSelector(selectOrdersRequestListStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const orders = ordersListData?.data?.orders || [];
  const pagination = ordersListData?.data?.pagination_by_status?.request;

  useEffect(() => {
    loadOrders(1, true);
  }, []);

  const loadOrders = useCallback(
    async (page: number, reset: boolean = false) => {
      if (reset) {
        setCurrentPage(1);
        setHasMoreData(true);
      }

      try {
        await dispatch(
          requestOrdersListData({
            request: 'request',
            per_page: 10,
            page: page,
          }),
        ).unwrap();

        if (pagination) {
          setHasMoreData(page < pagination.last_page);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    },
    [dispatch, pagination],
  );

  const loadMoreOrders = useCallback(async () => {
    if (isLoadingMore || !hasMoreData || !pagination) return;

    const nextPage = currentPage + 1;
    if (nextPage <= pagination.last_page) {
      setIsLoadingMore(true);
      await loadOrders(nextPage, false);
      setCurrentPage(nextPage);
      setIsLoadingMore(false);
    }
  }, [currentPage, isLoadingMore, hasMoreData, pagination, loadOrders]);

  const handleAccept = useCallback((orderId: number) => {
    // TODO: Implement accept order logic
    console.log('Accept order:', orderId);
  }, []);

  const handleDecline = useCallback((orderId: number) => {
    // TODO: Implement decline order logic
    console.log('Decline order:', orderId);
  }, []);

  const renderOrderItem = useCallback(
    ({ item }: { item: any }) => {
      const order = item;

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
          onAccept={() => handleAccept(order.id)}
          onDecline={() => handleDecline(order.id)}
          onPress={() =>
            navigation.navigate('OrderViewScreen', {
              orderId: '',
            })
          }
        />
      );
    },
    [handleAccept, handleDecline],
  );

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }, [isLoadingMore, colors.primary]);

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

  if (ordersListStatus === STATUS.LOADING && currentPage === 1) {
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
        refreshing={ordersListStatus === STATUS.LOADING && currentPage === 1}
        onRefresh={() => loadOrders(1, true)}
      />
    </View>
  );
};

export default RequestScreen;
