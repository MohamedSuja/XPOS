import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MenuStackParamList = {
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
};

export type MenuStackScreenProps<Screen extends keyof MenuStackParamList> =
  NativeStackScreenProps<MenuStackParamList, Screen>;
