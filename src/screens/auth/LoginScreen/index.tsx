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
import React, { useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import CustomTextInput from '@/components/Inputs/CustomTextInput';
import PasswordTextInput from '@/components/Inputs/PasswordTextInput';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import { requestAuthenticateLoginData } from '@/feature/thunks/auth_thunks';
import {
  selectAuthenticationLoginDataStatus,
  setUserCredentials,
} from '@/feature/slices/auth_slice';

const LoginScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // Validation state
  const [errors, setErrors] = useState({
    userName: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    userName: false,
    password: false,
  });

  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const AuthenticationLoginDataStatus = useAppSelector(
    selectAuthenticationLoginDataStatus,
  );

  // Validation functions
  const validateUserName = (value: string) => {
    if (!value.trim()) {
      return 'User name is required';
    }
    // if (value.trim().length < 3) {
    //   return 'User name must be at least 3 characters';
    // }
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return 'Password is required';
    }
    // if (value.length < 6) {
    //   return 'Password must be at least 6 characters';
    // }
    return '';
  };

  const validateForm = () => {
    const userNameError = validateUserName(userName);
    const passwordError = validatePassword(password);

    setErrors({
      userName: userNameError,
      password: passwordError,
    });

    return !userNameError && !passwordError;
  };

  // Check if form is valid for real-time feedback
  const isFormValid = () => {
    return !validateUserName(userName) && !validatePassword(password);
  };

  const handleUserNameChange = (text: string) => {
    setUserName(text);
    // Clear error when user starts typing
    if (errors.userName) {
      setErrors(prev => ({ ...prev, userName: '' }));
    }
    // Validate in real-time if field has been touched
    if (touched.userName) {
      setErrors(prev => ({ ...prev, userName: validateUserName(text) }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // Clear error when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
    // Validate in real-time if field has been touched
    if (touched.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(text) }));
    }
  };

  const handleUserNameBlur = () => {
    setTouched(prev => ({ ...prev, userName: true }));
    setErrors(prev => ({ ...prev, userName: validateUserName(userName) }));
  };

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    setErrors(prev => ({ ...prev, password: validatePassword(password) }));
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(
        requestAuthenticateLoginData({
          user_name: userName,
          password: password,
        }),
      );
      dispatch(setUserCredentials({ username: userName, password: password }));

      // Reset validation errors after successful submission
      setErrors({ userName: '', password: '' });
      setTouched({ userName: false, password: false });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      /> */}
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
              style={[styles.input]}
              placeholder="Enter your user name"
              value={userName}
              onChangeText={handleUserNameChange}
              onBlur={handleUserNameBlur}
              error={errors.userName}
            />

            <Text style={[globalStyles.h10, styles.label]}>Password</Text>
            <PasswordTextInput
              style={[styles.input]}
              placeholder="Enter your password"
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={errors.password}
            />

            <PrimaryButton
              title="Login"
              style={styles.button}
              onPress={handleLogin}
              disabled={!isFormValid()}
            />

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
