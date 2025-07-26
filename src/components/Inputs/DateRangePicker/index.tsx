import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import CalendarIcon from '@/assets/icons/Calendar.svg';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createInputStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';

interface DateRangePickerProps {
  style?: StyleProp<ViewStyle>;
}

const DateRangePicker = (props: DateRangePickerProps) => {
  const { style } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createInputStyles(colors);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <Text style={[globalStyles.h8, styles.inputText]}>DD/MM/YYYY</Text>
        <View style={styles.divider} />
        <Text style={[globalStyles.h8, styles.inputText]}>DD/MM/YYYY</Text>
      </View>

      <TouchableOpacity>
        <CalendarIcon height={25} width={25} />
      </TouchableOpacity>
    </View>
  );
};

export default DateRangePicker;
