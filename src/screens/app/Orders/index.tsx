import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Tag from '@/components/Tag';
import OrderRequestCard from '@/components/Cards/OrderRequestCard';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import TimeCard from '@/components/Cards/TimeCard';

const Orders = () => {
  const { colors }: ThemeContextType = useTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 100,
      }}
    >
      <ScrollView>
        <Text>OrdersScreen</Text>
        <Tag type="preparing" />
        <Tag type="picked" />
        <Tag type="cancelled" />
        <Tag type="ready" />
        <Tag type="accepted" />
        <Tag type="scheduled" />
        <SecondaryButton title="Accept" onPress={() => {}} />

        <OrderRequestCard
          orderNumber="1234567890"
          items={[
            { name: 'Item 1', quantity: 1 },
            { name: 'Item 2', quantity: 2 },
          ]}
          type="accepted"
        />
      </ScrollView>
    </View>
  );
};

export default Orders;
