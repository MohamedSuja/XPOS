import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from '../NavigationModels/UserStack';
import BottomTab from '../BottomTab';
import ProfileScreen from '@/screens/app/ProfileScreen';
import WalletScreen from '@/screens/app/WalletScreen';
import CategoryViewScreen from '@/screens/app/Menu/CategoryViewScreen';
import OrderViewScreen from '@/screens/app/OrderViewScreen';
import OrderSummaryScreen from '@/screens/app/OrderSummaryScreen';
import SupportCenterScreen from '@/screens/app/SupportCenterScreen';
import BankDetailsScreen from '@/screens/app/BankDetailsScreen';
import PrivacyPolicyScreen from '@/screens/app/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator<UserStackParamList>();

const UserStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTab'}
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.ScaleFromCenterAndroid
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="CategoryViewScreen" component={CategoryViewScreen} />
      <Stack.Screen name="OrderViewScreen" component={OrderViewScreen} />
      <Stack.Screen name="OrderSummaryScreen" component={OrderSummaryScreen} />
      <Stack.Screen
        name="SupportCenterScreen"
        component={SupportCenterScreen}
      />
      <Stack.Screen name="BankDetailsScreen" component={BankDetailsScreen} />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
