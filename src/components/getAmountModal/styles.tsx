import { ColorsType } from '@/utils/ThemeContext';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      backgroundColor: colors.background,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      flex: 1,
    },
    contentWrapper: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: wp('4%'),
      marginVertical: hp('3%'),
    },
    inputContainer: {
      borderWidth: 1,
      borderRadius: 10,
      marginVertical: hp('1%'),
      width: wp('92%'),
      height: hp('6%'),
      alignItems: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
    },
    inputfield: {
      textDecorationLine: 'none',
      minWidth: wp('60%'),
      color: colors.inputTxt,
    },
    errorText: {
      color: colors.errorText,
    },
    footerButton: {
      marginHorizontal: wp(4),
      marginVertical: hp(0.8),
      width: '100%',
    },
  });
