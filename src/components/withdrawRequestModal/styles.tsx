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
    iconBG: {
      backgroundColor: colors.checkBG,
      borderRadius: 100,
      padding: wp('4%'),
    },
    footerButton: {
      marginHorizontal: wp(4),
      marginVertical: hp(0.8),
      width: '100%',
    },
  });
