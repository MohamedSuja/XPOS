import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ReportStackParamList = {
  ReportScreen: undefined;
};

export type ReportStackScreenProps<Screen extends keyof ReportStackParamList> =
  NativeStackScreenProps<ReportStackParamList, Screen>;
