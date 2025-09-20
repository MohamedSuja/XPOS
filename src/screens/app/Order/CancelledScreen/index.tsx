import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import DateRangePicker from '@/components/Inputs/DateRangePicker';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  selectOrdersCanceledListData,
  selectOrdersCanceledListStatus,
} from '@/feature/slices/orders_slice';
import { requestOrdersListData } from '@/feature/thunks/orders_thunks';
import { STATUS } from '@/feature/services/status_constants';
import { useNavigation } from '@react-navigation/native';

const CancelledScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const ordersListData = useAppSelector(selectOrdersCanceledListData);
  const ordersListStatus = useAppSelector(selectOrdersCanceledListStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [dateRange, setDateRange] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
  }>({ startDate: '', endDate: '' });

  const orders = ordersListData?.data?.orders || [];
  const pagination = ordersListData?.data?.pagination_by_status?.cancelled;

  useEffect(() => {
    loadOrders(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadOrders(true, dateRange.startDate, dateRange.endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange.startDate, dateRange.endDate]);

  const loadOrders = useCallback(
    async (
      reset: boolean = false,
      startDateOverride?: string,
      endDateOverride?: string,
    ) => {
      if (reset) {
        setCurrentPage(1);
        setPerPage(10);
        setHasMoreData(true);
      }

      try {
        await dispatch(
          requestOrdersListData({
            page: 1,
            per_page: perPage,
            request: 'cancelled',
            start_date: (startDateOverride ?? dateRange.startDate) || undefined,
            end_date: (endDateOverride ?? dateRange.endDate) || undefined,
          }),
        ).unwrap();

        if (pagination) {
          setHasMoreData(perPage < pagination.total);
        }
      } catch (error) {
        console.error('Error loading cancelled orders:', error);
      }
    },
    [dispatch, dateRange.startDate, dateRange.endDate, pagination, perPage],
  );

  const loadMoreOrders = useCallback(async () => {
    if (isLoadingMore || !hasMoreData || !pagination) return;

    const newPerPage = perPage + 10;
    if (newPerPage <= pagination.total) {
      setIsLoadingMore(true);
      setPerPage(newPerPage);
      await loadOrders(false);
      setIsLoadingMore(false);
    }
  }, [perPage, isLoadingMore, hasMoreData, pagination, loadOrders]);

  // Reload list whenever screen gains focus using navigation listener
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadOrders(true);
    });

    return unsubscribe;
  }, [navigation, loadOrders]);

  const onRefresh = useCallback(async () => {
    setDateRange({ startDate: '', endDate: '' });
    await loadOrders(true, '', '');
  }, [loadOrders]);

  const getOrderType = useCallback((status: string) => {
    switch (status) {
      case 'accepted':
        return 'accepted';
      case 'pending':
        return 'preparing';
      case 'ready_for_pickup':
        return 'ready';
      case 'out_for_delivery':
        return 'picked';
      case 'cancelled':
        return 'cancelled';
      default:
        return undefined;
    }
  }, []);

  const renderOrderItem = useCallback(
    ({ item }: { item: any }) => {
      const order = item;

      const orderItems =
        order.items?.map((orderItem: any) => ({
          name: orderItem.item_name,
          quantity: orderItem.quantity || 1,
        })) || [];

      const cancelledAt =
        order.cancelled_at || order.updated_at || order.created_at;
      const completeDate = cancelledAt
        ? new Date(cancelledAt).toLocaleDateString()
        : undefined;

      const orderType = getOrderType(order.status);

      return (
        <OrderRequestCard
          orderNumber={order.unique_id}
          items={orderItems}
          type={orderType}
          cardStyle={{
            backgroundColor: colors.background,
            borderColor: colors.cancelledBorder,
            borderWidth: 0.5,
          }}
          complete={completeDate}
        />
      );
    },
    [colors.background, colors.cancelledBorder],
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
          No cancelled orders found
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
      <DateRangePicker
        onChange={setDateRange}
        value={dateRange}
        style={styles.datePicker}
      />

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
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default CancelledScreen;
