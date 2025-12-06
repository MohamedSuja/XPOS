import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createInputStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import DateRangePickerDialog from '@/components/Dialogs/DateRangePickerDialog';
import moment from 'moment';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';

interface DateRangePickerProps {
  style?: StyleProp<ViewStyle>;
  value?: any;
  onChange?: (range: {
    startDate: string | undefined;
    endDate: string | undefined;
  }) => void;
  onClear: any;
  minDate?: string | undefined;
  maxDate?: string | undefined;
}

const DateRangePicker = (props: DateRangePickerProps) => {
  const { style, value, onChange, minDate, maxDate } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createInputStyles(colors);

  const [visible, setVisible] = useState(false);
  const [internal, setInternal] = useState<any>({
    startDate: value?.startDate ?? null,
    endDate: value?.endDate ?? null,
  });

  const startDate = (value?.startDate ?? internal.startDate) || null;
  const endDate = (value?.endDate ?? internal.endDate) || null;

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const handleConfirm = (range: {
    startDate: string | null;
    endDate: string | null;
  }) => {
    if (onChange) {
      onChange(range);
    } else {
      setInternal(range);
    }
  };

  return (
    <TouchableOpacity onPress={onOpen}>
      <View style={[styles.container, style]}>
        <View style={styles.inputContainer}>
          <Text style={[globalStyles.h9, styles.inputText]}>
            {startDate ? (
              <Text style={{ color: colors.inputTxt }}>
                {moment(startDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}
              </Text>
            ) : (
              'DD/MM/YYYY'
            )}
          </Text>
          <View style={styles.divider} />
          <Text style={[globalStyles.h9, styles.inputText]}>
            {endDate ? (
              <Text style={{ color: colors.inputTxt }}>
                {moment(endDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}
              </Text>
            ) : (
              'DD/MM/YYYY'
            )}
          </Text>
        </View>

        {startDate || endDate ? (
          <TouchableOpacity
            onPress={() => {
              props.onClear();
            }}
          >
            <EvilIcons
              name="close"
              size={RFValue(18)}
              color={colors.subTitle}
            />
          </TouchableOpacity>
        ) : (
          <Entypo
            name="calendar"
            size={RFValue(16)}
            color={colors.disableHeader}
          />
        )}
        <DateRangePickerDialog
          visible={visible}
          onClose={onClose}
          onConfirm={handleConfirm}
          initialStartDate={startDate}
          initialEndDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DateRangePicker;
