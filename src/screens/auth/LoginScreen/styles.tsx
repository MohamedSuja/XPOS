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
    imageContainer: {
      height: hp('60%'),
    },
    statusBar: {
      resizeMode: 'stretch',
      width: '100%',
      height: '100%',
      position: 'absolute',
    },

    welcome: {
      color: colors.background,
      marginTop: '70%',
      marginHorizontal: wp('5%'),
    },
    description: {
      color: colors.background,
      marginHorizontal: wp('5%'),
      marginTop: hp('1%'),
    },
    formContainer: {
      marginTop: -hp('18%'),
      backgroundColor: colors.background,
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('3%'),
      borderWidth: 1,
      borderBottomWidth: 0,
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
      marginTop: hp('15%'),
      textAlign: 'center',
      color: colors.inputTxt,
    },
    linkText: {
      color: colors.primary,
      textDecorationLine: 'underline',
      height: 100,
    },
  });
