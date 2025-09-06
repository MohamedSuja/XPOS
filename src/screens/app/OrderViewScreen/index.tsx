import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '@/components/Buttons/BackButton';
import { globalStyles } from '@/utils/globalStyles';
import { hp, wp } from '@/utils/Scaling';
import EditIcon from '@/assets/icons/fe_edit.svg';
import MapMarkerIcon from '@/assets/icons/MapMarker.svg';
import ToggleButton from '@/components/Buttons/ToggleButton';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import EditProfileIcon from '@/assets/icons/EditProfile.svg';
import ChangePasswordIcon from '@/assets/icons/ChangePassword.svg';
import DriverIcon from '@/assets/icons/Driver.svg';
import SupportIcon from '@/assets/icons/Support.svg';
import PrivacyIcon from '@/assets/icons/Privacy.svg';
import Right from '@/assets/icons/Right.svg';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  resetAuth,
  selectAuthenticationLogoutDataStatus,
  selectPassword,
  selectUsername,
} from '@/feature/slices/auth_slice';
import { useUpdateEffect } from '@/utils/useUpdateEffect';
import { STATUS } from '@/feature/services/status_constants';
import { requestAuthenticateLogoutData } from '@/feature/thunks/auth_thunks';
import Tag from '@/components/Tag';
import RoomServiceIcon from '@/assets/icons/RoomService.svg';
import OrderViewCard from '@/components/Cards/OrderViewCard';

const OrderViewScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const dispatch = useAppDispatch();
  const logoutStatus = useAppSelector(selectAuthenticationLogoutDataStatus);

  return (
    <View style={[styles.root]}>
      <View style={[styles.headerContainer, { paddingTop: hp(2.5) }]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h4, styles.headerTxt]}>Order #1235</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Tag type="accepted" />

        <View style={styles.customerContainer}>
          <Text style={[globalStyles.h6, styles.customerText]}>
            Customer :{' '}
          </Text>
          <Text style={[globalStyles.h5, styles.customerText]}>
            Manikandan Thavaselvam
          </Text>
        </View>

        <View style={styles.orderItemsContainer}>
          <Text style={[globalStyles.h8, styles.orderItemsTitle]}>
            Order Items
          </Text>
          <View style={styles.orderItemsInfo}>
            <RoomServiceIcon
              height={wp(5)}
              width={wp(4)}
              fill={colors.subTitle}
            />
            <Text style={[globalStyles.h8, styles.orderItemsCount]}>
              4 Items
            </Text>
          </View>
        </View>

        <OrderViewCard />
        <OrderViewCard />
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton style={styles.logoutButton} title="Mark as preparing" />
      </View>
    </View>
  );
};

export default OrderViewScreen;
