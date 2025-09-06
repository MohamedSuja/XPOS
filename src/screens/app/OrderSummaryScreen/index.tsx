import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import BackButton from '@/components/Buttons/BackButton';
import { globalStyles } from '@/utils/globalStyles';
import { hp, wp } from '@/utils/Scaling';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  resetAuth,
  selectAuthenticationLogoutDataStatus,
} from '@/feature/slices/auth_slice';
import Tag from '@/components/Tag';
import RoomServiceIcon from '@/assets/icons/RoomService.svg';
import OrderViewCard from '@/components/Cards/OrderViewCard';
import {
  requestOrderDetailsData,
  requestOrderMarkReadyData,
} from '@/feature/thunks/orders_thunks';
import { UserStackScreenProps } from '@/navigation/NavigationModels/UserStack';
import {
  selectOrderDetailsData,
  selectOrderDetailsStatus,
  selectOrderMarkReadyData,
  selectOrderMarkReadyStatus,
} from '@/feature/slices/orders_slice';
import { useUpdateEffect } from '@/utils/useUpdateEffect';
import { STATUS } from '@/feature/services/status_constants';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { SuccessFlash } from '@/utils/FlashMessage';
import CashIcon from '@/assets/icons/Cash.svg';

const OrderSummaryScreen = ({
  route,
}: UserStackScreenProps<'OrderSummaryScreen'>) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const dispatch = useAppDispatch();

  return (
    <View style={[styles.root]}>
      <View style={[styles.headerContainer, { paddingTop: hp(2.5) }]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h4, styles.headerTxt]}>Order Summary</Text>
        </View>
      </View>
      <View style={styles.deliveryMessageContainer}>
        <Text style={[globalStyles.h9, styles.deliveryMessage]}>
          A driver will collect it shortly for delivery
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.orderInfoSection}>
          <View style={styles.orderIdContainer}>
            <Text style={[globalStyles.h6, styles.labelText]}>Order ID : </Text>
            <Text style={[globalStyles.h2, styles.valueText]}>Order #1235</Text>
          </View>
          <View style={styles.orderTypeContainer}>
            <Text style={[globalStyles.h8, styles.orderTypeText]}>
              Take a away
            </Text>
          </View>
        </View>

        <View style={styles.dateSection}>
          <View style={styles.dateContainer}>
            <Text style={[globalStyles.h6, styles.labelText]}>Date : </Text>
            <Text style={[globalStyles.h5, styles.valueText]}>2025.07.10</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={[globalStyles.h6, styles.labelText]}>Date : </Text>
            <Text style={[globalStyles.h5, styles.valueText]}>2025.07.10</Text>
          </View>
        </View>

        <View style={styles.customerSection}>
          <Text style={[globalStyles.h6, styles.labelText]}>Customer : </Text>
          <Text style={[globalStyles.h5, styles.valueText]}>
            Manikandan Thavaselvam
          </Text>
        </View>

        <View style={styles.paymentSection}>
          <Text style={[globalStyles.h6, styles.labelText]}>
            Payment Method :{' '}
          </Text>
          <View style={styles.paymentMethodContainer}>
            <CashIcon height={wp(6)} width={wp(6)} />
            <Text style={[globalStyles.h5, styles.paymentMethodText]}>
              Cash on delivery
            </Text>
          </View>
        </View>

        <View style={styles.itemsSection}>
          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={[globalStyles.h5, styles.itemName]}>
                Dum Chicken Biriyani
              </Text>
              <Text style={[globalStyles.h5, styles.itemPrice]}>Rs. 1,850</Text>
            </View>
            <View style={styles.itemVariant}>
              <Text style={[globalStyles.h6, styles.variantText]}>Large</Text>
              <Text style={[globalStyles.h6, styles.quantityText]}>
                Qty : 1
              </Text>
            </View>
            <View style={styles.itemVariant}>
              <Text style={[globalStyles.h6, styles.variantText]}>
                Extra Large
              </Text>
              <Text style={[globalStyles.h6, styles.quantityText]}>
                Qty : 1
              </Text>
            </View>

            <View style={styles.itemInstruction}>
              <Text style={[globalStyles.h12, styles.instructionText]}>
                Instruction :
              </Text>
              <Text style={[globalStyles.h12, styles.instructionItemText]}>
                Avoid Onion and Chilly
              </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={[globalStyles.h5, styles.itemName]}>
                Dum Chicken Biriyani
              </Text>
              <Text style={[globalStyles.h5, styles.itemPrice]}>Rs. 1,850</Text>
            </View>
            <View style={styles.itemVariant}>
              <Text style={[globalStyles.h6, styles.variantText]}>Large</Text>
              <Text style={[globalStyles.h6, styles.quantityText]}>
                Qty : 1
              </Text>
            </View>
            <View style={styles.itemVariant}>
              <Text style={[globalStyles.h6, styles.variantText]}>
                Extra Large
              </Text>
              <Text style={[globalStyles.h6, styles.quantityText]}>
                Qty : 1
              </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={[globalStyles.h5, styles.itemName]}>
                Dum Chicken Biriyani
              </Text>
              <Text style={[globalStyles.h5, styles.itemPrice]}>Rs. 1,850</Text>
            </View>
            <View style={styles.itemVariant}>
              <Text style={[globalStyles.h6, styles.variantText]}>Large</Text>
              <Text style={[globalStyles.h6, styles.quantityText]}>
                Qty : 1
              </Text>
            </View>
            <View style={styles.itemVariant}>
              <Text style={[globalStyles.h6, styles.variantText]}>
                Extra Large
              </Text>
              <Text style={[globalStyles.h6, styles.quantityText]}>
                Qty : 1
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={[globalStyles.h5, styles.totalLabel]}>Total Amount</Text>
          <Text style={[globalStyles.h5, styles.totalAmount]}>Rs. 5,550</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton style={styles.footerButton} title="Picked" />
      </View>
    </View>
  );
};

export default OrderSummaryScreen;
