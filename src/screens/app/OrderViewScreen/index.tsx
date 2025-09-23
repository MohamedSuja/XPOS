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
import Tag from '@/components/Tag';
import RoomServiceIcon from '@/assets/icons/RoomService.svg';
import OrderViewCard from '@/components/Cards/OrderViewCard';
import {
  requestOrderDetailsData,
  requestOrderMarkPreparingData,
  requestOrderMarkReadyData,
} from '@/feature/thunks/orders_thunks';
import { UserStackScreenProps } from '@/navigation/NavigationModels/UserStack';
import {
  selectOrderDetailsData,
  selectOrderDetailsStatus,
  selectOrderMarkPreparingData,
  selectOrderMarkPreparingStatus,
  selectOrderMarkReadyData,
  selectOrderMarkReadyStatus,
} from '@/feature/slices/orders_slice';
import { useUpdateEffect } from '@/utils/useUpdateEffect';
import { STATUS } from '@/feature/services/status_constants';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { SuccessFlash } from '@/utils/FlashMessage';
import InstructionCard from '@/components/Cards/InstructionCard';
import { pdfOrderChit } from '@/utils/pdfOrderChit';

const OrderViewScreen = ({
  route,
  navigation,
}: UserStackScreenProps<'OrderViewScreen'>) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const OrderDetailsData = useAppSelector(selectOrderDetailsData);
  const OrderDetailsStatus = useAppSelector(selectOrderDetailsStatus);

  const OrderMarkReadyData = useAppSelector(selectOrderMarkReadyData);
  const OrderMarkReadyStatus = useAppSelector(selectOrderMarkReadyStatus);

  const OrderMarkPreparingData = useAppSelector(selectOrderMarkPreparingData);
  const OrderMarkPreparingStatus = useAppSelector(
    selectOrderMarkPreparingStatus,
  );

  const data = OrderDetailsData?.data.order;
  const [status, setStatus] = useState<any>(undefined);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (route.params?.orderId) {
      dispatch(requestOrderDetailsData(route.params?.orderId));
    }
  }, [dispatch, route.params?.orderId]);

  const getOrderType = useCallback((status: string | undefined) => {
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
        return 'accepted';
    }
  }, []);

  useUpdateEffect(() => {
    if (OrderDetailsStatus == STATUS.SUCCEEDED) {
      setStatus(getOrderType(data?.status));
    }
  }, [OrderDetailsStatus]);

  const onPressPreparing = () => {
    dispatch(requestOrderMarkPreparingData(route.params?.orderId));
  };

  useUpdateEffect(() => {
    if (OrderMarkPreparingStatus == STATUS.SUCCEEDED) {
      setStatus(getOrderType('preparing'));
    }
  }, [OrderMarkPreparingStatus]);

  const onPressReady = () => {
    dispatch(requestOrderMarkReadyData(route.params?.orderId));
  };

  useUpdateEffect(() => {
    if (OrderMarkReadyStatus == STATUS.SUCCEEDED) {
      setStatus(getOrderType(data?.status));
      navigation.navigate('OrderSummaryScreen', { orderId: data?.id });
    }
  }, [OrderMarkReadyStatus]);

  return (
    <View style={[styles.root]}>
      <View style={[styles.headerContainer, { paddingTop: hp(2.5) }]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h4, styles.headerTxt]}>
            Order #{data?.unique_id}
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Tag type={status} />

        {data?.preparation_instructions && (
          <InstructionCard title={data?.preparation_instructions} />
        )}

        <View style={styles.customerContainer}>
          <Text style={[globalStyles.h6, styles.customerText]}>
            Customer :{' '}
          </Text>
          <Text style={[globalStyles.h5, styles.customerText]}>
            {data?.customer?.name}
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
              {data?.items.length} Items
            </Text>
          </View>
        </View>

        {data?.items
          ? data?.items.map((item, index) => (
              <OrderViewCard
                key={index}
                add_ons={item.add_ons}
                variants={item.variants}
                item_name={item.item_name}
                item_description={item.item_description}
                quantity={item.quantity}
                special_instructions={item.special_instructions}
              />
            ))
          : null}
      </ScrollView>
      <View style={styles.footer}>
        {status == 'accepted' ? (
          <PrimaryButton
            style={styles.footerButton}
            title="Mark as preparing"
            onPress={onPressPreparing}
          />
        ) : status == 'preparing' ? (
          <>
            <PrimaryButton
              onPress={onPressReady}
              style={styles.footerButton}
              title="Mark as Ready"
            />
            <SecondaryButton
              style={styles.footerButton}
              title="Export"
              onPress={() => pdfOrderChit(data)}
            />
          </>
        ) : null}
      </View>
    </View>
  );
};

export default OrderViewScreen;
