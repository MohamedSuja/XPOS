import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateRangePicker from '@/components/Inputs/DateRangePicker';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';

const CompletedScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const [dateRange, setDateRange] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
  }>({ startDate: '', endDate: '' });

  return (
    <View>
      <ScrollView>
        <DateRangePicker
          onChange={setDateRange}
          value={dateRange}
          style={styles.datePicker}
        />

        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Dum Chicken Biriyani ', quantity: 1 },
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          type="picked"
          cardStyle={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: 0.5,
          }}
          complete={'Today'}
        />

        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Dum Chicken Biriyani ', quantity: 1 },
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          type="picked"
          cardStyle={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: 0.5,
          }}
          complete={'Today'}
        />

        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Dum Chicken Biriyani ', quantity: 1 },
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          type="picked"
          cardStyle={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: 0.5,
          }}
          complete={'Today'}
        />
      </ScrollView>
    </View>
  );
};

export default CompletedScreen;
