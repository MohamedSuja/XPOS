import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import DateRangePicker from '@/components/Inputs/DateRangePicker';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  selectOrdersCompletedListData,
  selectOrdersCompletedListStatus,
} from '@/feature/slices/orders_slice';
import {
  requestOrderDetailsData,
  requestOrdersListData,
} from '@/feature/thunks/orders_thunks';
import { STATUS } from '@/feature/services/status_constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserStackParamList } from '@/navigation/NavigationModels/UserStack';
import { hp, wp } from '@/utils/Scaling';
import { globalStyles } from '@/utils/globalStyles';
import EmptyValue from '@/assets/icons/EmptyValue.svg';

const CompletedScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<UserStackParamList>>();

  const dispatch = useAppDispatch();
  const ordersListData = useAppSelector(selectOrdersCompletedListData);
  const ordersListStatus = useAppSelector(selectOrdersCompletedListStatus);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [dateRange, setDateRange] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
  }>({ startDate: '', endDate: '' });

  const orders = ordersListData?.data?.orders || [];
  const pagination = ordersListData?.data?.pagination_by_status?.completed;

  useEffect(() => {
    loadOrders(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // When date range changes, reload from page 1
    loadOrders(true, dateRange.startDate, dateRange.endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange.startDate, dateRange.endDate]);

  const loadOrders = useCallback(
    async (
      reset: boolean = false,
      startDateOverride?: string,
      endDateOverride?: string,
      per_page?: number,
    ) => {
      try {
        await dispatch(
          requestOrdersListData({
            page: 1,
            per_page: per_page ?? 10,
            request: 'completed',
            start_date: (startDateOverride ?? dateRange.startDate) || undefined,
            end_date: (endDateOverride ?? dateRange.endDate) || undefined,
          }),
        ).unwrap();
      } catch (error) {
        console.error('Error loading completed orders:', error);
      }
    },
    [dispatch, dateRange.startDate, dateRange.endDate, pagination],
  );

  const loadMoreOrders = useCallback(async () => {
    if (isLoadingMore || !pagination) return;

    if (pagination.per_page < pagination.total) {
      setIsLoadingMore(true);
      await loadOrders(
        false,
        dateRange.startDate,
        dateRange.endDate,
        pagination.per_page + 10,
      );
      setIsLoadingMore(false);
    }
  }, [
    isLoadingMore,
    pagination,
    loadOrders,
    dateRange.startDate,
    dateRange.endDate,
  ]);

  // Reload list whenever screen gains focus using navigation listener
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadOrders(true);
    });

    return unsubscribe;
  }, [navigation, loadOrders]);

  const onRefresh = useCallback(async () => {
    // Clear date filter then reload first page without dates
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
      case 'delivered':
        return 'picked';
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

      const deliveredAt =
        order.delivered_at || order.completed_at || order.created_at;
      const completeDate = deliveredAt
        ? new Date(deliveredAt).toLocaleDateString()
        : undefined;

      const orderType = getOrderType(order.status);
      return (
        <OrderRequestCard
          orderNumber={order.unique_id}
          items={orderItems}
          type={orderType}
          cardStyle={{
            backgroundColor: colors.background,
            borderColor: colors.border1,
            borderWidth: 1,
          }}
          complete={completeDate}
          onPress={() => {
            dispatch(requestOrderDetailsData(item?.id));
            navigation.navigate('OrderSummaryScreen', {
              orderId: item?.id,
            });
          }}
        />
      );
    },
    [colors.cardBG, colors.background, colors.acceptedBorder],
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
          No any completed orders found
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
      <View style={{ marginVertical: hp('1%') }}>
        <DateRangePicker
          onChange={setDateRange}
          value={dateRange}
          style={styles.datePicker}
          onClear={() => {
            setDateRange({ startDate: '', endDate: '' });
          }}
        />
      </View>

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
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default CompletedScreen;
