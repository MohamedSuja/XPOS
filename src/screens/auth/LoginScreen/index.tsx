import { View, Text } from 'react-native';
import React from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';

const LoginScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;
