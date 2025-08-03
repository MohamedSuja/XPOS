import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MenuStackParamList } from '../NavigationModels/MenuStack';
import CategoryScreen from '@/screens/app/Menu/CategoryScreen';
import CategoryViewScreen from '@/screens/app/Menu/CategoryViewScreen';

const Stack = createNativeStackNavigator<MenuStackParamList>();

const MenuStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CategoryScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="CategoryViewScreen" component={CategoryViewScreen} />
    </Stack.Navigator>
  );
};

export default MenuStack;
