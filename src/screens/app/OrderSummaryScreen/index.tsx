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
  requestOrderMarkDeliveredData,
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
import InstructionCard from '@/components/Cards/InstructionCard';
import { pdfOrderChit } from '@/utils/pdfOrderChit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomStatusBar } from '@/components/customStatusBar';

const OrderSummaryScreen = ({
  route,
}: UserStackScreenProps<'OrderSummaryScreen'>) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const dispatch = useAppDispatch();

  const OrderDetailsData = useAppSelector(selectOrderDetailsData);
  const data = OrderDetailsData?.data.order;

  const onPressPicked = () => {
    if (route.params?.orderId) {
      dispatch(requestOrderMarkDeliveredData(String(route.params.orderId)));
    } else {
      console.warn('Order ID is missing');
    }
  };

  return (
    <SafeAreaView style={[styles.root]}>
      <CustomStatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />
      <View style={[styles.headerContainer]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h5, styles.headerTxt]}>Order Summary</Text>
        </View>
      </View>

      {data?.delivery_type === 'delivery' &&
        data?.status !== 'delivered' &&
        data?.status !== 'cancelled' && (
          <View style={styles.deliveryMessageContainer}>
            <Text style={[globalStyles.h9, styles.deliveryMessage]}>
              A driver will collect it shortly for delivery
            </Text>
          </View>
        )}

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.orderInfoSection}>
          <View style={styles.orderIdContainer}>
            <Text style={[globalStyles.h6, styles.labelText]}>Order ID : </Text>
            <Text style={[globalStyles.h2, styles.valueText]}>
              # {data?.unique_id}
            </Text>
          </View>
          {data?.delivery_type !== 'delivery' && (
            <View style={styles.orderTypeContainer}>
              <Text style={[globalStyles.h8, styles.orderTypeText]}>
                {data?.delivery_type ?? ''}
              </Text>
            </View>
          )}

          {data?.status === 'cancelled' && (
            <View style={styles.orderCancelledContainer}>
              <Text style={[globalStyles.h8, styles.orderCancelledText]}>
                {data?.status}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.dateSection}>
          <View style={styles.dateContainer}>
            <Text style={[globalStyles.h6, styles.labelText]}>Date : </Text>
            <Text style={[globalStyles.h5, styles.valueText]}>
              {data?.created_at
                ? new Date(data.created_at)
                    .toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                    .replace(/\//g, '.')
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={[globalStyles.h6, styles.labelText]}>Time : </Text>
            <Text style={[globalStyles.h5, styles.valueText]}>
              {data?.created_at
                ? new Date(data.created_at).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })
                : 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.customerSection}>
          <Text style={[globalStyles.h6, styles.labelText]}>Customer : </Text>
          <Text style={[globalStyles.h5, styles.valueText]}>
            {data?.customer?.name}
          </Text>
        </View>

        {data?.payment_method && data?.status !== 'cancelled' && (
          <View style={styles.paymentSection}>
            <Text style={[globalStyles.h6, styles.labelText]}>
              Payment Method :{' '}
            </Text>
            <View style={styles.paymentMethodContainer}>
              <CashIcon height={wp(6)} width={wp(6)} />
              <Text style={[globalStyles.h5, styles.paymentMethodText]}>
                {data?.payment_method == 'cod'
                  ? 'Cash on delivery'
                  : 'Card payment'}
              </Text>
            </View>
          </View>
        )}

        {data?.status === 'cancelled' && data?.cancel_reason && (
          <View style={styles.reasonCancelContainer}>
            <Text style={[globalStyles.h12, styles.reasonCancelTitle]}>
              Reason of Cancel
            </Text>
            <Text style={[globalStyles.h9, styles.reasonCancel]}>
              {data?.cancel_reason}
            </Text>
          </View>
        )}

        {data?.preparation_instructions && data?.status !== 'cancelled' && (
          <InstructionCard title={data?.preparation_instructions} />
        )}

        <View style={styles.itemsSection}>
          {data?.items?.map((item, index) => (
            <View
              style={[
                styles.itemContainer,
                data?.items.length === index + 1 && {
                  borderBottomWidth: 0,
                },
              ]}
              key={index}
            >
              <View style={styles.itemHeader}>
                <Text style={[globalStyles.h5, styles.itemName]}>
                  {item?.item_name ?? ''}
                </Text>
                <Text style={[globalStyles.h5, styles.itemPrice]}>
                  Rs. {item.total_price?.toLocaleString()}
                </Text>
              </View>

              {item?.variants ? (
                <>
                  {item?.variants?.map((variant, index) => (
                    <View key={index} style={styles.itemVariant}>
                      <Text style={[globalStyles.h9, styles.variantText]}>
                        {variant?.variant_name}
                      </Text>
                      <Text style={[globalStyles.h9, styles.quantityText]}>
                        Qty : {variant?.quantity}
                      </Text>
                    </View>
                  ))}
                </>
              ) : (
                <View style={styles.itemVariant}>
                  <Text style={[globalStyles.h6, styles.variantText]}></Text>
                  <Text style={[globalStyles.h6, styles.quantityText]}>
                    Qty : {item?.quantity}
                  </Text>
                </View>
              )}

              {item?.special_instructions && (
                <View style={styles.itemInstruction}>
                  <Text style={[globalStyles.h12, styles.instructionText]}>
                    Instruction :
                  </Text>
                  <Text style={[globalStyles.h12, styles.instructionItemText]}>
                    {item?.special_instructions}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
        {data?.status !== 'cancelled' && (
          <View style={styles.totalSection}>
            <Text style={[globalStyles.h5, styles.totalLabel]}>
              Total Amount
            </Text>
            <Text style={[globalStyles.h5, styles.totalAmount]}>
              Rs. {data?.total ? parseFloat(data.total).toLocaleString() : '0'}
            </Text>
          </View>
        )}
      </ScrollView>

      {data?.status === 'delivered' && (
        <PrimaryButton
          style={styles.footerButton}
          title="Invoice"
          onPress={() => {
            pdfOrderChit(data);
          }}
        />
      )}

      {data?.delivery_type !== 'delivery' && (
        <View style={styles.footer}>
          <PrimaryButton
            style={styles.footerButton}
            title="Picked"
            onPress={onPressPicked}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderSummaryScreen;
