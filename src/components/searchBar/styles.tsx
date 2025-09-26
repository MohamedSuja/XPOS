import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ColorsType } from '@/utils/ThemeContext';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: hp('6%'),
      backgroundColor: colors.background,
      borderRadius: 10,
      alignItems: 'center',
      paddingHorizontal: wp('5%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputfield: {
      textDecorationLine: 'none',
      minWidth: wp('50%'),
      color: colors.inputTxt,
      marginHorizontal: wp('3%'),
    },
  });
