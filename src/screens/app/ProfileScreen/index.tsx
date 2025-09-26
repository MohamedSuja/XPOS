import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import BackButton from '@/components/Buttons/BackButton';
import { globalStyles } from '@/utils/globalStyles';
import { hp } from '@/utils/Scaling';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import ClockIcon from '@/assets/icons/Clock.svg';
import StoreLockIcon from '@/assets/icons/StoreLock.svg';
import DriverIcon from '@/assets/icons/Driver.svg';
import SupportIcon from '@/assets/icons/Support.svg';
import PrivacyIcon from '@/assets/icons/Privacy.svg';
import WalletIcon from '@/assets/icons/Wallet.svg';
import Right from '@/assets/icons/Right.svg';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  resetAuth,
  selectAuthenticationLogoutDataStatus,
} from '@/feature/slices/auth_slice';
import { useUpdateEffect } from '@/utils/useUpdateEffect';
import { STATUS } from '@/feature/services/status_constants';
import { requestAuthenticateLogoutData } from '@/feature/thunks/auth_thunks';
import { RFValue } from 'react-native-responsive-fontsize';
import Octicons from 'react-native-vector-icons/Octicons';
import BankIcon from '@/assets/icons/Bank.svg';
import { requests } from '@/feature/services/api';
import { ErrorFlash } from '@/utils/FlashMessage';
import { useFocusEffect } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { formatTimeto12 } from '@/utils/formatTime';

const ProfileScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const dispatch = useAppDispatch();
  const logoutStatus = useAppSelector(selectAuthenticationLogoutDataStatus);

  const userData = useAppSelector(state => state.auth);

  const [version, setVersion] = useState<any>(null);
  const [versionName, setVersionName] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const getVersion = async () => {
    setVersion(DeviceInfo.getVersion());
    setVersionName(DeviceInfo.getBuildNumber());
  };

  useUpdateEffect(() => {
    if (logoutStatus == STATUS.SUCCEEDED) {
      dispatch(resetAuth());
    }
  }, [logoutStatus]);

  const handleLogout = () => {
    dispatch(requestAuthenticateLogoutData());
  };

  const getProfileData = () => {
    try {
      requests
        .get(`/api/pos/profile`)
        .then(res => {
          setProfileData(res?.data?.data);
        })
        .catch(err => {
          console.log(err);
          ErrorFlash(err?.message || 'Something went wrong!');
        });
    } catch (error) {
      console.log(error);
      ErrorFlash('Something went wrong!');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfileData();
    }, []),
  );

  useEffect(() => {
    getVersion();
  }, []);
  return (
    <View style={[styles.root]}>
      <View style={[styles.headerContainer]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h5, styles.headerTxt]}>Profile</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: userData.image }}
              style={styles.profileImage}
            />

            <Text style={[globalStyles.h5, styles.profileName]}>
              {userData.userName}
            </Text>
            <View style={styles.ratingBG}>
              <Text style={[globalStyles.h8, { color: colors.background }]}>
                {profileData?.branch?.details?.hygiene_ratings}
              </Text>
              <Octicons
                name="star-fill"
                size={RFValue(15)}
                color={colors.gold}
              />
            </View>
            <View style={styles.locationContainer}>
              {/* <ClockIcon width={hp(3)} height={hp(3)} /> */}
              <Text style={[globalStyles.h12, styles.locationText]}>
                Today{' '}
                {formatTimeto12(
                  profileData?.branch?.opening_hours?.today?.open_time,
                )}{' '}
                to{' '}
                {formatTimeto12(
                  profileData?.branch?.opening_hours?.today?.close_time,
                )}
              </Text>
            </View>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor: profileData?.branch?.opening_hours
                    ?.current_status?.is_available_for_orders
                    ? colors.readyBG
                    : colors.closeBG,
                },
              ]}
            >
              <Text
                style={[
                  globalStyles.h12,
                  {
                    color: profileData?.branch?.opening_hours?.current_status
                      ?.is_available_for_orders
                      ? colors.readyTxt
                      : colors.currentStatus,
                  },
                ]}
              >
                {profileData?.branch?.opening_hours?.current_status
                  ?.is_available_for_orders
                  ? 'Opened'
                  : 'Closed'}
              </Text>
            </View>
          </View>

          <View style={styles.profileButtonContainer}>
            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileButtonContent}>
                <DriverIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h8, styles.profileButtonText]}>
                  Driver Request
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>

            <View style={styles.profileButtonSeparator} />

            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileButtonContent}>
                <WalletIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h8, styles.profileButtonText]}>
                  Wallet
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>

            <View style={styles.profileButtonSeparator} />
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('BankDetailsScreen')}
            >
              <View style={styles.profileButtonContent}>
                <BankIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h8, styles.profileButtonText]}>
                  Bank Account Details
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>
            <View style={styles.profileButtonSeparator} />

            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileButtonContent}>
                <StoreLockIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h8, styles.profileButtonText]}>
                  Close Resturant
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>
            <View style={styles.profileButtonSeparator} />

            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('SupportCenterScreen')}
            >
              <View style={styles.profileButtonContent}>
                <SupportIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h8, styles.profileButtonText]}>
                  Support Center
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>

            <View style={styles.profileButtonSeparator} />

            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            >
              <View style={styles.profileButtonContent}>
                <PrivacyIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h8, styles.profileButtonText]}>
                  Privacy Policy
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          style={styles.logoutButton}
          title="Log Out"
          onPress={handleLogout}
        />

        <Text style={[globalStyles.h12, styles.versionTxt]}>
          Version {version} ({versionName})
        </Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
