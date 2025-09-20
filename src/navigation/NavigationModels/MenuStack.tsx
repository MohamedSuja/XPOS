import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MenuStackParamList = {
  CategoryScreen: undefined;
  CategoryViewScreen: {
    item: any;
  };
};

export type MenuStackScreenProps<Screen extends keyof MenuStackParamList> =
  NativeStackScreenProps<MenuStackParamList, Screen>;
