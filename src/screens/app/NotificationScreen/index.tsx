import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { createStyles } from './styles';
import { globalStyles } from '../../../utils/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { requests } from '@/feature/services/api';
import { ErrorFlash } from '@/utils/FlashMessage';
import EmptyValue from '@/assets/icons/EmptyValue.svg';
import { CustomStatusBar } from '@/components/customStatusBar';
import { requestOrderDetailsData } from '@/feature/thunks/orders_thunks';
import { useAppDispatch } from '@/feature/stateHooks';

const NotificationScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const [loading, setLoading] = useState(true);
  const [notificationList, setNotificationList] = useState<any[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const formatUTCToLocal = (utcDateString: string) => {
    const localDate = moment.utc(utcDateString).local(); // Convert to local time
    const currentYear = moment().year();
    const dateYear = localDate.year();

    if (currentYear === dateYear) {
      return localDate.format('D MMMM'); // e.g., "26 July"
    } else {
      return localDate.format('DD/MM/YYYY'); // e.g., "26/07/2025"
    }
  };

  const getNotification = (refreshState: boolean, page?: number) => {
    try {
      if (refreshState) {
        setLoading(true);
      }
      let parameters: any = {
        page: page || currentPage,
        per_page: 10,
      };
      requests
        .get('api/pos/notifications', parameters)
        .then(res => {
          if (!refreshState) {
            if (currentPage <= lastPage) {
              setNotificationList(prev => [
                ...prev,
                ...res.data?.data?.notifications,
              ]);
              setCurrentPage(currentPage + 1);
            }
          } else {
            setIsRefreshing(false);
            setNotificationList(res.data?.data?.notifications);
            console.log(res.data?.data?.notifications);
            setCurrentPage(2);
          }
          setLastPage(res.data.data?.pagination?.last_page);
        })
        .catch(error => {
          console.log(error);
          ErrorFlash(error?.message || 'Something went wrong!');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      ErrorFlash('Something went wrong!');
      setLoading(false);
    }
  };

  // handle read
  const handleRead = (id: number) => {
    try {
      requests
        .put(`api/pos/notifications/${id}/mark-read`)
        .then(() => {
          console.log('Successfully read');
          getNotification(true, 1);
        })
        .catch(error => {
          let errorMessage = '';

          if (error.status == 422) {
            let alertDescription = '';
            const errors = error?.errors;

            if (errors) {
              for (const key in errors) {
                const errorMessagesArray = errors[key];
                errorMessagesArray.forEach((message: string) => {
                  alertDescription += `${message}\n`;
                });
              }
            }
            errorMessage = alertDescription.trim();
          } else {
            errorMessage = error?.message;
          }

          ErrorFlash(errorMessage || 'Something went wrong!');
        });
    } catch (error) {
      console.log(error);
      ErrorFlash('Something went wrong!');
    }
  };

  const navigateOrderScreen = useCallback(
    (status: string | undefined, orderId: string) => {
      switch (status) {
        case 'pending':
          navigation.navigate('OrderStack', { screen: 'Request' });
          break;
        case 'accepted':
          dispatch(requestOrderDetailsData(orderId));
          navigation.navigate('OrderViewScreen', { orderId: orderId });
          break;
        case 'preparing':
          dispatch(requestOrderDetailsData(orderId));
          navigation.navigate('OrderViewScreen', { orderId: orderId });
          break;
        case 'ready_for_pickup':
          dispatch(requestOrderDetailsData(orderId));
          navigation.navigate('OrderSummaryScreen', {
            orderId: orderId,
          });
          break;
        case 'out_for_delivery':
          dispatch(requestOrderDetailsData(orderId));
          navigation.navigate('OrderSummaryScreen', {
            orderId: orderId,
          });
          break;
        case 'delivered':
          dispatch(requestOrderDetailsData(orderId));
          navigation.navigate('OrderSummaryScreen', {
            orderId: orderId,
          });
          break;
        case 'cancelled':
          dispatch(requestOrderDetailsData(orderId));
          navigation.navigate('OrderSummaryScreen', {
            orderId: orderId,
          });
          break;
        default:
          navigation.navigate('OrderStack', { screen: 'Request' });
          break;
      }
    },
    [],
  );
  useEffect(() => {
    getNotification(true, 1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign
            name="arrowleft"
            size={RFValue(18)}
            color={colors.primary}
          />
        </TouchableOpacity>
        <Text style={[globalStyles.h5, styles.headerTxt]}>Notification</Text>
        <View style={{ width: wp('8%') }} />
      </View>
      {/* Notification list */}
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {notificationList.length > 0 ? (
            <FlatList
              data={notificationList}
              contentContainerStyle={{
                marginHorizontal: wp('4%'),
                marginVertical: hp('2%'),
              }}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={() => {
                    getNotification(true, 1);
                  }}
                />
              }
              onEndReached={() => {
                getNotification(false, currentPage);
              }}
              onEndReachedThreshold={1}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.box,
                    {
                      backgroundColor: item?.is_read
                        ? 'transparent'
                        : colors.notificationBG,
                      borderColor: item?.is_read
                        ? colors.border
                        : colors.notificationBorder,
                    },
                  ]}
                  onPress={() => {
                    if (!item?.is_read) {
                      handleRead(item.id);
                    }
                    if (item?.order) {
                      navigateOrderScreen(
                        item?.order?.status,
                        item?.order?.order_id,
                      );
                    }
                  }}
                >
                  <View style={styles.headerWrapper}>
                    <Text
                      style={[
                        globalStyles.h8,
                        {
                          color: colors.headerTxt,
                          width: wp('62%'),
                        },
                      ]}
                    >
                      {item?.title}
                    </Text>
                    <Text
                      style={[globalStyles.h11, { color: colors.inputTxt }]}
                    >
                      {formatUTCToLocal(item?.created_at)}
                    </Text>
                  </View>
                  <Text
                    style={[globalStyles.h12, styles.contentTxt]}
                    numberOfLines={2}
                  >
                    {item?.message}
                  </Text>
                </Pressable>
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: hp('10%'),
              }}
            >
              <EmptyValue height={wp('40%')} width={wp('40%')} />
              <Text style={[globalStyles.h6, { color: colors.dropDownIcon }]}>
                No any notifications yet!
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
