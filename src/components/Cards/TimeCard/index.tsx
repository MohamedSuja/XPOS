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

interface TimeCardProps {
  time: string;
  days: number;
}

const TimeCard: React.FC<TimeCardProps> = ({ time, days }) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  const timeArray = time.split(':');

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={[globalStyles.h1, styles.timeNumber]}>{days}</Text>
        <Text style={[globalStyles.h9, styles.timeText]}>Days</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.timeContainer}>
        <Text style={[globalStyles.h1, styles.timeNumber]}>{timeArray[0]}</Text>
        <Text style={[globalStyles.h9, styles.timeText]}>Hours</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.timeContainer}>
        <Text style={[globalStyles.h1, styles.timeNumber]}>{timeArray[1]}</Text>
        <Text style={[globalStyles.h9, styles.timeText]}>Minutes</Text>
      </View>
    </View>
  );
};

export default TimeCard;
