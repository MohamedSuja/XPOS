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
      height: hp('100%'),
      backgroundColor: colors.background,
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
    formContainer: {
      marginTop: hp('5%'),
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('3%'),
      borderWidth: 1,
      borderBottomWidth:0,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderColor: colors.border,
    },
    label: {},
    input: {
      marginTop: hp('1%'),
      marginBottom: hp('2%'),
      fontSize: RFValue(14),
      fontFamily: 'Manrope-Regular',
    },
    button: {
      marginTop: hp('3%'),
    },

    centerText: {
      marginTop: hp('10%'),
      textAlign: 'center',
      color: colors.inputTxt,
    },
    linkText: {
      color: colors.primary,
      textDecorationLine: 'underline',
      height: 100,
    },
  });
