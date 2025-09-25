import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { CustomStatusBar } from '@/components/customStatusBar';
import { globalStyles } from '@/utils/globalStyles';
import { RFValue } from 'react-native-responsive-fontsize';
import Octicons from 'react-native-vector-icons/Octicons';
import { hp, wp } from '@/utils/Scaling';
import EarningIcon from '@/assets/icons/Earning.svg';
import FoodDeliveryIcon from '@/assets/icons/food-delivery.svg';
import DriverRequestIcon from '@/assets/icons/DriverRequest.svg';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useNotification } from '@/CustomProviders/NotificationProvider';
import { useAppSelector } from '@/feature/stateHooks';
import { requests } from '@/feature/services/api';
import { ErrorFlash } from '@/utils/FlashMessage';
import { useFocusEffect } from '@react-navigation/native';
import OrderOngoingCard from '@/components/Cards/OrderOngoingCard';

const HomeScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const [earningLoading, setEarningLoading] = useState(false);
  const [earningData, setEarningData] = useState<any>(null);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [onlineStatus, setOnlineStatus] = useState(false);

  const { setNavigator } = useNotification();

  const userData = useAppSelector(state => state.auth);

  // handle admin call
  const handleAdminCall = () => {
    try {
      Linking.openURL(`tel:+94242221484`);
    } catch (error) {
      console.log(error);
    }
  };

  // get today earnings
  const getEarnings = () => {
    try {
      setEarningLoading(true);
      requests
        .get('/api/pos/stats/today-earnings')
        .then(res => {
          setEarningData(res?.data?.data);
        })
        .catch(error => {
          ErrorFlash(error?.message || 'Something went wrong!');
        })
        .finally(() => {
          setEarningLoading(false);
        });
    } catch (error) {
      setEarningLoading(false);
      ErrorFlash('Something went wrong!');
    }
  };

  // get latest Order
  const getLatestOrder = () => {
    try {
      requests
        .get('/api/pos/orders/latest-ongoing')
        .then(res => {
          setLastOrder(res.data?.data);
          console.log(res.data.data);
        })
        .catch(error => {
          console.log(error);
          ErrorFlash(error?.message || 'Something went wrong!');
        });
    } catch (error) {
      ErrorFlash('Something went wrong!');
    }
  };

  const getOrderType = (status: string) => {
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
  };

  // get online status
  const getOnlineStatus = () => {
    try {
      requests
        .get('/api/pos/online-status')
        .then(res => {
          setOnlineStatus(res.data?.data?.is_available_for_orders);
        })
        .catch(error => {
          console.log(error);
          ErrorFlash(error?.message || 'Something went wrong!');
        });
    } catch (error) {
      ErrorFlash('Something went wrong!');
    }
  };
  useEffect(() => {
    if (navigation) {
      setNavigator(navigation);
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getEarnings();
      getLatestOrder();
      getOnlineStatus();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}
          >
            <Image
              source={
                userData.image
                  ? { uri: userData.image }
                  : require('../../../assets/images/SampleLogo.png')
              }
              style={styles.logo}
            />
          </Pressable>
          <View>
            <Text
              style={[
                globalStyles.h4,
                {
                  color: colors.inputTxt,
                  width: wp('55%'),
                },
              ]}
            >
              {userData.userName}
            </Text>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor: onlineStatus
                    ? colors.readyBG
                    : colors.closeBG,
                },
              ]}
            >
              <Text
                style={[
                  globalStyles.h12,
                  {
                    color: onlineStatus
                      ? colors.readyTxt
                      : colors.currentStatus,
                  },
                ]}
              >
                {onlineStatus ? ' Opened' : 'Closed'}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={styles.notificationBG}
          onPress={() => {
            // navigation.navigate('NotificationScreen');
          }}
        >
          <Octicons
            name="bell-fill"
            size={RFValue(18)}
            color={colors.primary}
          />
          <View style={styles.notificationCount}>
            <Text
              style={[
                globalStyles.h12,
                { color: colors.primary, fontSize: RFValue(8) },
              ]}
            >
              10
            </Text>
          </View>
        </Pressable>
      </View>

      <ScrollView>
        {/* Current earnings */}
        <ImageBackground
          style={styles.currentBox}
          source={require('../../../assets/images/HomeBG.png')}
        >
          {earningLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <ActivityIndicator size={'small'} color={colors.background} />
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={styles.earningIcon}>
                  <EarningIcon width={hp(3)} height={hp(3)} />
                </View>

                <View style={styles.countBG}>
                  <FoodDeliveryIcon width={hp(3)} height={hp(3)} />
                  <Text style={[globalStyles.h8, { color: colors.earningBG }]}>
                    {earningData?.delivered_orders} Deliveries
                  </Text>
                </View>
              </View>
              <View
                style={{
                  gap: wp('1%'),
                }}
              >
                <Text
                  style={[
                    globalStyles.h1,
                    { color: colors.background, fontSize: RFValue(22) },
                  ]}
                >
                  {earningData?.currency} {earningData?.today_earnings}
                </Text>
                <Text style={[globalStyles.h9, { color: colors.background }]}>
                  Earnings Today
                </Text>
              </View>
            </>
          )}
        </ImageBackground>

        {/* Latest Order */}

        <View style={styles.subTitle}>
          <Text style={[globalStyles.h8, { color: colors.headerTxt }]}>
            Order History
          </Text>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: wp('1%'),
            }}
            onPress={() => {
              // navigation.navigate('TopTab');
            }}
          >
            <Text style={[globalStyles.h8, { color: colors.primary }]}>
              View All
            </Text>
            <MaterialCommunityIcons
              name="arrow-top-right"
              size={RFValue(15)}
              color={colors.primary}
            />
          </Pressable>
        </View>

        <OrderOngoingCard
          orderNumber={lastOrder?.order?.unique_id}
          items={lastOrder?.order?.items}
          type={getOrderType(lastOrder?.order?.status)}
          title={lastOrder?.order?.customer?.name}
          onPress={() => {
            navigation.navigate('OrderViewScreen', {
              orderId: lastOrder?.order?.id,
            });
          }}
        />

        {/* send request */}

        <View style={styles.sendRequestBox}>
          <View style={{ width: wp('50%'), gap: hp('1%') }}>
            <Text style={[globalStyles.h8, { color: colors.headerTxt }]}>
              Need a Delivery Driver?
            </Text>
            <Text style={[globalStyles.h12, { color: colors.inputTxt }]}>
              Send a quick request and we'll assign a driver for your order.
            </Text>
            <TouchableOpacity style={styles.sendRequestButton}>
              <Text style={[globalStyles.h7, { color: colors.background }]}>
                Send Request
              </Text>
            </TouchableOpacity>
          </View>

          <DriverRequestIcon width={hp(14)} height={hp(14)} />
        </View>
        {/* Contact */}
        <View style={styles.contactBox}>
          <View style={{ width: wp('70%') }}>
            <Text style={[globalStyles.h5, { color: colors.headerTxt }]}>
              Help & Support
            </Text>
            <Text style={[globalStyles.h9, { color: colors.inputTxt }]}>
              Reach out anytime for quick answers and admin support.
            </Text>
          </View>
          <Pressable style={styles.callBG} onPress={handleAdminCall}>
            <FontAwesome
              name="phone"
              size={RFValue(18)}
              color={colors.primary}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
