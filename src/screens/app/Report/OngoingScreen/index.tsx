import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import SearchInput from '@/components/Inputs/SearchInput';
import { createStyles } from './styles';

const OngoingScreen = () => {
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
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          type="accepted"
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
            { name: 'Seafood Nasi Goreng', quantity: 2 },
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          type="preparing"
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
            { name: 'Seafood Nasi Goreng', quantity: 2 },
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          type="ready"
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

export default OngoingScreen;
