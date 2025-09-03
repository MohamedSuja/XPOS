import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  ProfileScreen: undefined;
  WalletScreen: undefined;
};

export type AppStackScreenProps<Screen extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, Screen>;
