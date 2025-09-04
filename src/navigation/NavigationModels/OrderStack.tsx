import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type OrderStackParamList = {
  TopTabNavigator: undefined;
  OrderViewScreen: { orderId: string };
};

export type OrderStackScreenProps<Screen extends keyof OrderStackParamList> =
  NativeStackScreenProps<OrderStackParamList, Screen>;
