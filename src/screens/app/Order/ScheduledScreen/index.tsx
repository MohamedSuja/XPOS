import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import SearchInput from '@/components/Inputs/SearchInput';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';

const ScheduledScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  return (
    <View>
      <ScrollView>
        <SearchInput placeholder="Search Order ID" style={styles.searchInput} />

        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Dum Chicken Biriyani ', quantity: 1 },
            { name: 'Dum Chicken Biriyani ', quantity: 2 },
          ]}
          type="accepted"
          date="2025-07-14"
          time="12.30 pm"
          countTime="12:30"
          countDays={2}
          style={{
            backgroundColor: colors.cardBG,
          }}
          cardStyle={{
            backgroundColor: colors.background,
            borderColor: colors.acceptedBorder,
            borderWidth: 0.5,
          }}
        />

        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Dum Chicken Biriyani ', quantity: 1 },
            { name: 'Dum Chicken Biriyani ', quantity: 2 },
          ]}
          type="preparing"
          date="2025-07-14"
          time="12.30 pm"
          countTime="12:30"
          countDays={2}
          style={{
            backgroundColor: colors.cardBG,
          }}
          cardStyle={{
            backgroundColor: colors.background,
            borderColor: colors.acceptedBorder,
            borderWidth: 0.5,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ScheduledScreen;
