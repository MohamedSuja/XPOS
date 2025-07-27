import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    datePicker: {
      marginHorizontal: wp(4),
      marginTop: hp(1),
    },
  });
