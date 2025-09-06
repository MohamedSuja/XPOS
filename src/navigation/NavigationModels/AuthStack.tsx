import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  LoginScreen: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;
