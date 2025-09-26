import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.inputField,
    },
    datePicker: {
      marginHorizontal: wp('4%'),
      marginTop: hp('2%'),
      marginBottom: hp('2%'),
    },
  });
