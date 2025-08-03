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
  countTime?: string;
  countDays?: number;
  complete?: string;
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
  countTime,
  countDays,
  complete,
}) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

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
              <Calendar width={16} height={16} />
              <Text style={[globalStyles.h9, styles.completeText]}>
                {complete}
              </Text>
            </View>
          )}
        </View>
        {type && <Tag type={type} style={styles.tag} />}
      </View>

      {countTime && countDays && <TimeCard time={countTime} days={countDays} />}

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
