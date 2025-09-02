import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  ActivityIndicator,
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

const HomeScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const [earningLoading, setEarningLoading] = useState(false);

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
          <Image
            source={require('../../../../assets/images/SampleLogo.png')}
            style={styles.logo}
          />
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
    </SafeAreaView>
  );
};

export default HomeScreen;
