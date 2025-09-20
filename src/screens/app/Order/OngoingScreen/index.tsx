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
import {
  requestOrderDetailsData,
  requestOrdersListData,
} from '@/feature/thunks/orders_thunks';
import { STATUS } from '@/feature/services/status_constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserStackParamList } from '@/navigation/NavigationModels/UserStack';
import OrderOngoingCard from '@/components/Cards/OrderOngoingCard';

const OngoingScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<UserStackParamList>>();

  const dispatch = useAppDispatch();
  const ordersListData = useAppSelector(selectOrdersOngoingListData);
  const ordersListStatus = useAppSelector(selectOrdersOngoingListStatus);

  const [perPage, setPerPage] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const orders = ordersListData?.data?.orders || [];
  const pagination = ordersListData?.data?.pagination_by_status?.ongoing;

  useEffect(() => {
    loadOrders(true);
  }, []);

  const loadOrders = useCallback(
    async (reset: boolean = false, searchOverride?: string) => {
      const currentPerPage = reset ? 10 : perPage;

      if (reset) {
        setPerPage(10);
        setHasMoreData(true);
      }

      try {
        await dispatch(
          requestOrdersListData({
            page: 1,
            per_page: currentPerPage,
            search: searchOverride ?? searchQuery,
            request: 'ongoing',
          }),
        ).unwrap();

        if (pagination) {
          setHasMoreData(currentPerPage < pagination.total);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    },
    [dispatch, searchQuery, pagination, perPage],
  );

  const loadMoreOrders = useCallback(async () => {
    if (isLoadingMore || !hasMoreData || !pagination) return;

    const newPerPage = perPage + 10;

    setIsLoadingMore(true);
    setPerPage(newPerPage);
    await loadOrders(false, searchQuery);
    setIsLoadingMore(false);
  }, [perPage, isLoadingMore, hasMoreData, pagination, loadOrders]);

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
      case 'preparing':
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

      // Format date and time
      const orderDate = new Date(order.created_at);
      const dateStr = orderDate.toLocaleDateString();
      const timeStr = orderDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const orderType = getOrderType(order.status);

      return (
        <OrderOngoingCard
          orderNumber={order?.unique_id}
          items={order?.items}
          type={orderType}
          title={order?.customer.name}
          onPress={() => {
            dispatch(requestOrderDetailsData(item?.id));
            if (orderType === 'preparing') {
              navigation.navigate('OrderViewScreen', {
                orderId: item?.id,
              });
            } else if (orderType === 'accepted') {
              navigation.navigate('OrderViewScreen', {
                orderId: item?.id,
              });
            } else if (orderType === 'ready') {
              navigation.navigate('OrderSummaryScreen', {
                orderId: item?.id,
              });
            }
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
    perPage === 10 &&
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
          perPage === 10 &&
          !isSearchLoading
        }
        onRefresh={() => loadOrders(true, searchQuery)}
      />
    </View>
  );
};

export default OngoingScreen;
