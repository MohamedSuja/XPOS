import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeStackParamList } from '../NavigationModels/HomeStack';
import ProfileScreen from '../../screens/app/Home/ProfileScreen';
import WalletScreen from '@/screens/app/Home/WalletScreen';
import HomeScreen from '@/screens/app/Home/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
