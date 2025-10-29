import React from 'react';
import { AuthStackParamList } from '../NavigationModels/AuthStack';
import LoginScreen from '@/screens/auth/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrivacyPolicyScreen from '@/screens/app/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
