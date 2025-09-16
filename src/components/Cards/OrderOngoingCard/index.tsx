import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme, ThemeContextType } from '@/utils/ThemeContext';
import { globalStyles } from '@/utils/globalStyles';
import { createButtonStyles } from './styles';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Tag from '@/components/Tag';
import TimeCard from '../TimeCard';
import Calendar from '@/assets/icons/Calendar.svg';
import { useEffect, useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface OrderItem {
  item_name: string;
  quantity: number;
}

interface OrderRequstCardProps {
  orderNumber: string;
  items: OrderItem[];

  type?:
    | 'scheduled'
    | 'accepted'
    | 'preparing'
    | 'picked'
    | 'ready'
    | 'cancelled';

  style?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;

  title?: string;

  onPress?: () => void;
}

const OrderOngoingCard: React.FC<OrderRequstCardProps> = ({
  orderNumber,
  items,
  type,
  title,

  onPress,
}) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <TouchableOpacity activeOpacity={onPress ? 0.5 : 1} onPress={onPress}>
      <LinearGradient
        colors={[colors.orange, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.container]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[globalStyles.h4, { color: colors.inputTxt }]}>
              Order #{orderNumber}
            </Text>
            {title && (
              <Text style={[globalStyles.h5, styles.titleText]}>{title}</Text>
            )}
          </View>
          {type && <Tag type={type} style={styles.tag} />}
        </View>

        {/* Order Items Section */}
        <View style={[styles.itemsContainer]}>
          {items &&
            items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={[globalStyles.h5, styles.itemName]}>
                  {item?.item_name}
                </Text>

                <Text style={[globalStyles.h5, styles.quantityText]}>
                  x{item.quantity}
                </Text>
              </View>
            ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default OrderOngoingCard;
