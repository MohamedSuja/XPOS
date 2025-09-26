import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  selectOrdersScheduledListData,
  selectOrdersScheduledListStatus,
} from '@/feature/slices/orders_slice';
import { requestOrdersListData } from '@/feature/thunks/orders_thunks';
import { STATUS } from '@/feature/services/status_constants';
import { useNavigation } from '@react-navigation/native';
import OrderScheduledCard from '@/components/Cards/OrderScheduledCard';
import { hp, wp } from '@/utils/Scaling';
import SearchBar from '@/components/searchBar';
import EmptyValue from '@/assets/icons/EmptyValue.svg';
import { globalStyles } from '@/utils/globalStyles';

const ScheduledScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const ordersListData = useAppSelector(selectOrdersScheduledListData);
  const ordersListStatus = useAppSelector(selectOrdersScheduledListStatus);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const orders = ordersListData?.data?.orders || [];
  const pagination = ordersListData?.data?.pagination_by_status?.scheduled;

  useEffect(() => {
    loadOrders(true);
  }, []);

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
            search: searchOverride ?? searchQuery,
            request: 'scheduled',
          }),
        ).unwrap();
      } catch (error) {
        console.error('Error loading scheduled orders:', error);
      }
    },
    [dispatch, searchQuery, pagination],
  );

  const loadMoreOrders = useCallback(async () => {
    if (isLoadingMore || !pagination) return;

    if (pagination.per_page < pagination.total) {
      setIsLoadingMore(true);
      await loadOrders(false, searchQuery, pagination.per_page + 10);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, pagination, loadOrders, searchQuery]);

  // Reload list whenever screen gains focus using navigation listener
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadOrders(true);
    });

    return unsubscribe;
  }, [navigation, loadOrders]);

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setIsSearchLoading(true);
      await loadOrders(true, query);
      setIsSearchLoading(false);
    },
    [loadOrders],
  );

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

      const orderDate = new Date(order.created_at);
      const dateStr = orderDate.toLocaleDateString();
      const timeStr = orderDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const orderType = getOrderType(order.status);

      return (
        <OrderScheduledCard
          orderNumber={order.unique_id}
          items={orderItems}
          type={orderType}
          date={dateStr}
          time={timeStr}
          title={order.customer.name}
          delivered_at={'2026-08-25T12:00:00'}
        />
      );
    },
    [colors.cardBG, colors.background, colors.acceptedBorder, getOrderType],
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
          No any scheduled orders request found
        </Text>
      </View>
    );
  }, [ordersListStatus, colors.headerTxt]);

  if (ordersListStatus === STATUS.LOADING && !pagination && !isSearchLoading) {
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
      <View
        style={{
          marginHorizontal: wp('4%'),
          marginTop: hp('2%'),
          marginBottom: hp('1%'),
        }}
      >
        <SearchBar
          onChange={(value: string) => {
            handleSearch(value);
          }}
          onClear={() => {
            handleSearch('');
          }}
          value={searchQuery}
          placeHolder="Search"
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
        refreshing={
          ordersListStatus === STATUS.LOADING && !pagination && !isSearchLoading
        }
        onRefresh={() => loadOrders(true, searchQuery)}
      />
    </View>
  );
};

export default ScheduledScreen;
