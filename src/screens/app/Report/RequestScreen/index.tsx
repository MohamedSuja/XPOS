import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';

const ReportScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Dum Chicken Biriyani ', quantity: 1 },
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          onAccept={() => {}}
          onDecline={() => {}}
        />

        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Dum Chicken Biriyani ', quantity: 1 },
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          onAccept={() => {}}
          onDecline={() => {}}
          type="scheduled"
          date="2025-07-14"
          time="12.30 pm"
        />

        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Dum Chicken Biriyani ', quantity: 1 },
            { name: 'Seafood Nasi Goreng', quantity: 2 },
          ]}
          onAccept={() => {}}
          onDecline={() => {}}
        />
      </ScrollView>
    </View>
  );
};

export default ReportScreen;
