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
import Colors from '@/utils/Colors';
import { createButtonStyles } from './styles';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Tag from '@/components/Tag';
import TimeCard from '../TimeCard';
import Calendar from '@/assets/icons/Calendar.svg';
import { useEffect, useMemo, useState } from 'react';

interface OrderItem {
  name: string;
  quantity: number;
}

interface OrderRequstCardProps {
  orderNumber: string;
  items: OrderItem[];
  onAccept?: () => void;
  onDecline?: () => void;
  type?:
    | 'scheduled'
    | 'accepted'
    | 'preparing'
    | 'picked'
    | 'ready'
    | 'cancelled';
  date?: string;
  time?: string;
  style?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  complete?: string;
  title?: string;
  delivered_at?: string;
}

const OrderRequestCard: React.FC<OrderRequstCardProps> = ({
  orderNumber,
  items,
  onAccept,
  onDecline,
  type,
  date,
  time,
  style,
  cardStyle,
  complete,
  title,
  delivered_at,
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
    <View
      style={[styles.container, { backgroundColor: colors.background }, style]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[globalStyles.h4, { color: colors.inputTxt }]}>
            Order #{orderNumber}
          </Text>
          {title && (
            <Text style={[globalStyles.h8, styles.titleText]}>{title}</Text>
          )}
          {date && time && !complete && (
            <View style={styles.dateContainer}>
              <Text style={[globalStyles.h9, styles.dateText]}>{date}</Text>
              <Text style={[globalStyles.h9, { color: colors.divider2 }]}>
                |
              </Text>
              <Text style={[globalStyles.h9, styles.dateText]}>{time}</Text>
            </View>
          )}

          {complete && (
            <View style={styles.dateContainer}>
              <Calendar fill={'#4D4D4D'} width={16} height={16} />
              <Text style={[globalStyles.h9, styles.completeText]}>
                {complete}
              </Text>
            </View>
          )}
        </View>
        {type && <Tag type={type} style={styles.tag} />}
      </View>

      {delivered_at && <TimeCard time={countTime} days={countDays} />}

      {/* Order Items Section */}
      <View
        style={[
          styles.itemsContainer,
          { backgroundColor: colors.cardBG },
          cardStyle,
        ]}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={[globalStyles.h5, styles.itemName]}>{item.name}</Text>

            <Text style={[globalStyles.h5, styles.quantityText]}>
              x{item.quantity}
            </Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      {onAccept && onDecline && (
        <View style={styles.buttonContainer}>
          <SecondaryButton
            title="Decline"
            onPress={onDecline}
            style={styles.declineButton}
          />

          <PrimaryButton
            title="Accept"
            onPress={onAccept}
            style={styles.acceptButton}
          />
        </View>
      )}
    </View>
  );
};

export default OrderRequestCard;
