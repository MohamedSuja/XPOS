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
  name: string;
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
  date?: string;
  time?: string;
  complete?: string;
  title?: string;
  delivered_at?: string;
  onPress?: () => void;
}

const OrderScheduledCard: React.FC<OrderRequstCardProps> = ({
  orderNumber,
  items,
  type,
  date,
  time,
  complete,
  title,
  delivered_at,
  onPress,
}) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  const [countDays, setCountDays] = useState<number>(0);
  const [countTime, setCountTime] = useState<string>('00:00');

  const targetDate = useMemo(() => {
    if (!delivered_at) return undefined;
    const parsed = new Date(delivered_at);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }, [delivered_at]);

  useEffect(() => {
    if (!targetDate) {
      setCountDays(0);
      setCountTime('00:00');
      return;
    }

    const computeAndSet = () => {
      const now = new Date();
      let diff = targetDate.getTime() - now.getTime();
      if (diff < 0) diff = 0;

      const minutesTotal = Math.floor(diff / (1000 * 60));
      const days = Math.floor(minutesTotal / (60 * 24));
      const hours = Math.floor((minutesTotal - days * 24 * 60) / 60);
      const minutes = minutesTotal % 60;

      const hh = String(hours).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');

      setCountDays(days);
      setCountTime(`${hh}:${mm}`);
    };

    // initial compute immediately
    computeAndSet();
    // update every minute, aligned roughly to minute ticks
    const intervalId = setInterval(computeAndSet, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetDate]);

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
            {date && time && !complete && (
              <View style={styles.dateContainer}>
                <Text style={[globalStyles.h8, styles.dateText]}>{date}</Text>
                <Text style={[globalStyles.h9, { color: colors.divider3 }]}>
                  |
                </Text>
                <Text style={[globalStyles.h9, styles.dateText]}>{time}</Text>
              </View>
            )}

            {complete && (
              <View style={styles.dateContainer}>
                <Calendar fill={'#4D4D4D'} width={16} height={16} />
                <Text style={[globalStyles.h12, styles.completeText]}>
                  {complete}
                </Text>
              </View>
            )}
          </View>
          {type && <Tag type={type} style={styles.tag} />}
        </View>

        {delivered_at && <TimeCard time={countTime} days={countDays} />}

        {/* Order Items Section */}
        <View style={[styles.itemsContainer]}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={[globalStyles.h5, styles.itemName]}>
                {item.name}
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

export default OrderScheduledCard;
