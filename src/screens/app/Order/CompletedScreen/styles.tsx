import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.inputField,
    },
    datePicker: {
      marginHorizontal: wp(4),
      marginTop: hp(1),
    },
  });
