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
    },
    statusBar: {
      resizeMode: 'stretch',
      width: '100%',
      height: Platform.OS === 'ios' ? hp('25%') : hp('20%'),
    },

    welcome: {
      color: colors.inputTxt,
      marginTop: hp('5%'),
      marginHorizontal: wp('5%'),
    },
    description: {
      color: colors.inputTxt,
      marginHorizontal: wp('5%'),
      marginTop: hp('1%'),
    },
  });
