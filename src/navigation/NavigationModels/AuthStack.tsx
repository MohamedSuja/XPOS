import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;
