import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  ProfileScreen: undefined;
  WalletScreen: undefined;
};

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, Screen>;
