import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import SearchInput from '@/components/Inputs/SearchInput';
import { createStyles } from './styles';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  selectOrdersOngoingListData,
  selectOrdersOngoingListStatus,
} from '@/feature/slices/orders_slice';
import { requestOrdersListData } from '@/feature/thunks/orders_thunks';
import { STATUS } from '@/feature/services/status_constants';

const OngoingScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const dispatch = useAppDispatch();
  const ordersListData = useAppSelector(selectOrdersOngoingListData);
  const ordersListStatus = useAppSelector(selectOrdersOngoingListStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const orders = ordersListData?.data?.orders || [];
  const pagination = ordersListData?.data?.pagination_by_status?.ongoing;

  useEffect(() => {
    loadOrders(1, true);
  }, []);

  const loadOrders = useCallback(
    async (page: number, reset: boolean = false, searchOverride?: string) => {
      if (reset) {
        setCurrentPage(1);
        setHasMoreData(true);
      }

      try {
        await dispatch(
          requestOrdersListData({
            page: page,
            per_page: 10,
            search: searchOverride ?? searchQuery,
            request: 'ongoing',
          }),
        ).unwrap();

        if (pagination) {
          setHasMoreData(page < pagination.last_page);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    },
    [dispatch, searchQuery, pagination],
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

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setIsSearchLoading(true);
      await loadOrders(1, true, query);
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

      const orderType = getOrderType(order.status);

      return (
        <OrderRequestCard
          orderNumber={order.unique_id}
          items={orderItems}
          type={orderType}
          title={order.customer.name}
          style={{
            backgroundColor: colors.cardBG,
          }}
          cardStyle={{
            backgroundColor: colors.background,
            borderColor: colors.acceptedBorder,
            borderWidth: 0.5,
          }}
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
          No ongoing orders found
        </Text>
      </View>
    );
  }, [ordersListStatus, colors.headerTxt]);

  if (
    ordersListStatus === STATUS.LOADING &&
    currentPage === 1 &&
    !isSearchLoading
  ) {
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
      <SearchInput
        placeholder="Search Order ID"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
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
        refreshing={
          ordersListStatus === STATUS.LOADING &&
          currentPage === 1 &&
          !isSearchLoading
        }
        onRefresh={() => loadOrders(1, true, searchQuery)}
      />
    </View>
  );
};

export default OngoingScreen;
