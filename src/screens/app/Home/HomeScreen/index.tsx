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
import React, { useState } from 'react';
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
import OrderRequestCard from '@/components/Cards/OrderRequestCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { AppStackScreenProps } from '@/navigation/NavigationModels/HomeStack';

const HomeScreen = ({ navigation }: AppStackScreenProps<'HomeScreen'>) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const [earningLoading, setEarningLoading] = useState(false);

  // handle admin call
  const handleAdminCall = () => {
    try {
      Linking.openURL(`tel:+94242221484`);
    } catch (error) {
      console.log(error);
    }
  };

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
              source={require('../../../../assets/images/SampleLogo.png')}
              style={styles.logo}
            />
          </Pressable>
          <View>
            <Text style={[globalStyles.h4, { color: colors.inputTxt }]}>
              The Valampuri
            </Text>
            <View
              style={[
                styles.statusContainer,
                { backgroundColor: colors.readyBG },
              ]}
            >
              <Text style={[globalStyles.h12, { color: colors.readyTxt }]}>
                Opened
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
          source={require('../../../../assets/images/HomeBG.png')}
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
                    10 Deliveries
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
                  Rs.1,000.00
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
        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Dum Chicken Biriyani ', quantity: 1 },
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          type="preparing"
          style={{
            backgroundColor: colors.cardBG,
          }}
          cardStyle={{
            backgroundColor: colors.background,
            borderColor: colors.acceptedBorder,
            borderWidth: 0.5,
          }}
        />

        {/* send request */}

        <View style={styles.sendRequestBox}>
          <View style={{ width: wp('60%'), gap: hp('1%') }}>
            <Text style={[globalStyles.h5, { color: colors.headerTxt }]}>
              Need a Delivery Driver?
            </Text>
            <Text style={[globalStyles.h9, { color: colors.inputTxt }]}>
              Send a quick request and we'll assign a driver for your order.
            </Text>
            <TouchableOpacity style={styles.sendRequestButton}>
              <Text style={[globalStyles.h9, { color: colors.background }]}>
                Send Request
              </Text>
            </TouchableOpacity>
          </View>

          <FoodDeliveryIcon width={hp(3)} height={hp(3)} />
        </View>
        {/* Contact */}
        <View style={styles.contactBox}>
          <View style={{ width: wp('70%') }}>
            <Text style={[globalStyles.h5, { color: colors.headerTxt }]}>
              Need Help?
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
