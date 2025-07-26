import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import CustomTextInput from '@/components/Inputs/CustomTextInput';
import PasswordTextInput from '@/components/Inputs/PasswordTextInput';
import PrimaryButton from '@/components/Buttons/PrimaryButton';

const LoginScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={[styles.root, { paddingBottom: insets.bottom }]}>
          <View style={[styles.imageContainer]}>
            <Image
              style={styles.statusBar}
              source={require('@/assets/images/LoginImage.png')}
            />
            <StatusBar backgroundColor={colors.primary} />

            <Text style={[globalStyles.h1, styles.welcome]}>Welcome Back</Text>
            <Text style={[globalStyles.h10, styles.description]}>
              Please login to continue your order with us
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={[globalStyles.h10, styles.label]}>User Name</Text>
            <CustomTextInput
              style={styles.input}
              placeholder="Enter your user name"
            />
            <Text style={[globalStyles.h10, styles.label]}>Password</Text>
            <PasswordTextInput
              style={styles.input}
              placeholder="Enter your password"
            />

            <PrimaryButton title="Login" style={styles.button} />

            <Text style={[globalStyles.h11, styles.centerText]}>
              Do you need help & support?{' '}
              <TouchableWithoutFeedback>
                <Text style={[globalStyles.h11, styles.linkText]}>
                  Contact Us
                </Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
