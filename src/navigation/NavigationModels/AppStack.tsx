import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
  BottomTab: undefined;
};

export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;
