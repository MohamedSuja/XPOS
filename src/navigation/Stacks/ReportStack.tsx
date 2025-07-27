import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CategoryViewScreen from '@/screens/app/Menu/CategoryViewScreen';
import { ReportStackParamList } from '../NavigationModels/ReportStack';
import ReportScreen from '@/screens/app/Report/ReportScreen';

const Stack = createNativeStackNavigator<ReportStackParamList>();

const MenuStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReportScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
    </Stack.Navigator>
  );
};

export default MenuStack;
