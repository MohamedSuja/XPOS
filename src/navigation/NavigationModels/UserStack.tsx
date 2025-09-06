import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type UserStackParamList = {
  BottomTab: undefined;
  ProfileScreen: undefined;
  WalletScreen: undefined;
  HomeScreen: undefined;
  CategoryScreen: undefined;
  CategoryViewScreen:
    | {
        item: {
          id: number;
          name: string;
          image: string;
        };
      }
    | undefined;
  TopTabNavigator: undefined;
  OrderViewScreen: { orderId: string };
  ReportScreen: undefined;
  OrderSummaryScreen: undefined;
};

export type UserStackScreenProps<Screen extends keyof UserStackParamList> =
  NativeStackScreenProps<UserStackParamList, Screen>;
