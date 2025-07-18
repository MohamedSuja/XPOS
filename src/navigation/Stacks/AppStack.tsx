import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomTab from '../BottomTab';
import { AppStackParamList } from '../NavigationModels/AppStack';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default AppStack;
