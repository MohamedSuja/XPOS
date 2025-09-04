import {
  View,
  Text,
  Keyboard,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './styles';
import * as yup from 'yup';
import { Formik } from 'formik';
import { globalStyles } from '../../../utils/globalStyles';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import { selectAuthenticationLoginDataStatus } from '@/feature/slices/auth_slice';
import { requestAuthenticateLoginData } from '@/feature/thunks/auth_thunks';
import CustomInput from '@/components/Inputs/customInput';
import PrimaryButton from '@/components/Buttons/PrimaryButton';

const LoginScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    userName: yup.string().required('User name is required'),
    password: yup.string().required('Password is required'),
  });

  const inputRefs: any = [useRef<TextInput>(null), useRef<TextInput>(null)];

  const focusNextField = (index: number) => {
    if (index < inputRefs.length - 1 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current.focus();
    }
  };

  const AuthenticationLoginDataStatus = useAppSelector(
    selectAuthenticationLoginDataStatus,
  );

  const handleSubmit = (values: any) => {
    try {
      dispatch(
        requestAuthenticateLoginData({
          user_name: values?.userName,
          password: values?.password,
        }),
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // handle admin call
  const handleAdminCall = () => {
    try {
      Linking.openURL(`tel:+94242221484`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      {!keyboardStatus && (
        <ImageBackground
          source={require('@/assets/images/LoginImage.png')}
          style={styles.img}
        >
          <View
            style={{ paddingBottom: hp('7%'), paddingHorizontal: wp('4%') }}
          >
            <Text style={[globalStyles.h1, { color: colors.background }]}>
              Welcome Back
            </Text>
            <Text style={[globalStyles.h9, { color: colors.background }]}>
              Please login to continue your ride with us
            </Text>
          </View>
        </ImageBackground>
      )}

      <View
        style={[
          styles.bottomContainer,
          { marginTop: keyboardStatus ? insets.top : -hp('5%') },
        ]}
      >
        <Formik
          initialValues={{
            userName: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => {
            return (
              <View style={styles.formContainer}>
                <View>
                  <Text style={[globalStyles.h8, { color: colors.headerTxt }]}>
                    User Name
                  </Text>

                  <CustomInput
                    value={values.userName}
                    placeHolder="Enter your user name"
                    onChangeText={handleChange('userName')}
                    onBlur={handleBlur('userName')}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextField(0)}
                    ref={inputRefs[0]}
                    errorText={errors.userName}
                    errorTextState={touched.userName}
                  />

                  <Text style={[globalStyles.h8, { color: colors.headerTxt }]}>
                    Password
                  </Text>
                  {/* Password */}
                  <CustomInput
                    value={values.password}
                    placeHolder="Enter your password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    returnKeyType="done"
                    onSubmitEditing={() => focusNextField(1)}
                    ref={inputRefs[1]}
                    errorText={errors.password}
                    errorTextState={touched.password}
                    secureTextEntry={showPassword}
                    endAdornment={
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={showPassword ? 'eye' : 'eye-off'}
                          size={RFValue(20)}
                          color={colors.pwdIcon}
                        />
                      </TouchableOpacity>
                    }
                  />

                  <View style={{ marginTop: hp('2%') }}>
                    <PrimaryButton title="Login" onPress={handleSubmit} />
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      gap: wp('2%'),
                      marginTop: hp('1%'),
                    }}
                  >
                    <Text
                      style={[globalStyles.h12, { color: colors.headerTxt }]}
                    >
                      Do you need help & support?
                    </Text>
                    <Pressable
                      onPress={() => {
                        handleAdminCall();
                      }}
                    >
                      <Text
                        style={[
                          globalStyles.h8,
                          {
                            color: colors.primary,
                            textDecorationLine: 'underline',
                          },
                        ]}
                      >
                        Contact Us
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};

export default LoginScreen;
