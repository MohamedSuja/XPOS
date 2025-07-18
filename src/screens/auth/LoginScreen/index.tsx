import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import React from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';

const LoginScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <Image
        style={styles.statusBar}
        source={require('@/assets/images/StatusBar.png')}
      />
      <StatusBar backgroundColor={colors.primary} />

      <Text style={[globalStyles.h1, styles.welcome]}>Welcome Back</Text>
      <Text style={[globalStyles.h10, styles.description]}>
        Please login to continue your order with us
      </Text>

      <View></View>
    </View>
  );
};

export default LoginScreen;
