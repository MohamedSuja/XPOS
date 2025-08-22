import React, { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (range: {
    startDate: string | undefined;
    endDate: string | undefined;
  }) => void;
  initialStartDate?: string | null; // 'YYYY-MM-DD'
  initialEndDate?: string | null; // 'YYYY-MM-DD'
  minDate?: string | undefined; // 'YYYY-MM-DD'
  maxDate?: string | undefined; // 'YYYY-MM-DD'
  title?: string;
};

const toYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const addDays = (dateStr: string, days: number) => {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return toYMD(d);
};

const getRange = (start: string, end: string) => {
  const res: string[] = [];
  let cur = start;
  while (cur <= end) {
    res.push(cur);
    cur = addDays(cur, 1);
  }
  return res;
};

const formatDMY = (dateStr: string | null) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
};

const DateRangePickerDialog: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
  initialStartDate = null,
  initialEndDate = null,
  minDate,
  maxDate,
  title = 'Select date range',
}) => {
  const { colors }: ThemeContextType = useTheme();

  const [startDate, setStartDate] = useState<string | null>(initialStartDate);
  const [endDate, setEndDate] = useState<string | null>(initialEndDate);

  useEffect(() => {
    if (visible) {
      setStartDate(initialStartDate ?? null);
      setEndDate(initialEndDate ?? null);
    }
  }, [visible, initialStartDate, initialEndDate]);

  const onDayPress = (day: DateData) => {
    const selected = day.dateString; // 'YYYY-MM-DD'
    if (!startDate || (startDate && endDate)) {
      setStartDate(selected);
      setEndDate(null);
      return;
    }
    if (selected < startDate) {
      setStartDate(selected);
      setEndDate(null);
      return;
    }
    setEndDate(selected);
  };

  const markedDates = useMemo(() => {
    const marks: Record<
      string,
      {
        startingDay?: boolean;
        endingDay?: boolean;
        color?: string;
        textColor?: string;
        disabled?: boolean;
        customTextStyle?: any;
      }
    > = {};

    if (startDate && !endDate) {
      marks[startDate] = {
        startingDay: true,
        endingDay: true,
        color: colors.primary,
        textColor: '#FFFFFF',
      };
      return marks;
    }

    if (startDate && endDate) {
      const range = getRange(startDate, endDate);
      range.forEach((d, idx) => {
        if (idx === 0) {
          marks[d] = {
            startingDay: true,
            color: colors.primary,
            textColor: '#FFFFFF',
          };
        } else if (idx === range.length - 1) {
          marks[d] = {
            endingDay: true,
            color: colors.primary,
            textColor: '#FFFFFF',
          };
        } else {
          marks[d] = {
            color: colors.primary,
            textColor: '#FFFFFF',
          };
        }
      });
    }

    return marks;
  }, [startDate, endDate, colors.primary]);

  const handleApply = () => {
    onConfirm({ startDate, endDate });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.loadingBackground },
          ]}
          onPress={onClose}
        />
        <View style={[styles.sheet, { backgroundColor: colors.background }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.headerTxt }]}>
              {title}
            </Text>
            <Text style={[styles.sub, { color: colors.subTitle }]}>
              {formatDMY(startDate) || 'DD/MM/YYYY'} -{' '}
              {formatDMY(endDate) || 'DD/MM/YYYY'}
            </Text>
          </View>

          <Calendar
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
            minDate={minDate}
            maxDate={maxDate}
            theme={{
              calendarBackground: colors.background,
              dayTextColor: colors.inputTxt,
              monthTextColor: colors.inputTxt,
              textDisabledColor: colors.disableHeader,
              arrowColor: colors.primary,
              todayTextColor: colors.primary,
            }}
            enableSwipeMonths={true}
          />

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.btn,
                styles.btnGhost,
                { borderColor: colors.btnBorder },
              ]}
              onPress={onClose}
            >
              <Text style={[styles.btnGhostTxt, { color: colors.primary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: colors.primary,
                  opacity: startDate ? 1 : 0.6,
                },
              ]}
              onPress={handleApply}
              disabled={!startDate}
            >
              <Text style={styles.btnTxt}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  sub: {
    marginTop: 4,
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingBottom: 6,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnTxt: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  btnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  btnGhostTxt: {
    fontWeight: '600',
  },
});

export default DateRangePickerDialog;
