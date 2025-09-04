import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TopTabNavigator from '../TopTab';
import { OrderStackParamList } from '../NavigationModels/OrderStack';
import OrderViewScreen from '@/screens/app/Order/OrderViewScreen';

const Stack = createNativeStackNavigator<OrderStackParamList>();

const OrderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TopTabNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TopTabNavigator" component={TopTabNavigator} />
      <Stack.Screen name="OrderViewScreen" component={OrderViewScreen} />
    </Stack.Navigator>
  );
};

export default OrderStack;
