import { StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 10,
      marginVertical: hp('1%'),
      width: '100%',
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
  });
