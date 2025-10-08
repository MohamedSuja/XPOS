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
    footerButton: {
      marginHorizontal: wp(4),
      marginVertical: hp(0.8),
      width: '100%',
    },
    box: {
      borderWidth: 1,
      borderColor: colors.stroke,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: wp('4%'),
      width: wp('92%'),
      paddingHorizontal: wp('4%'),
      justifyContent: 'space-between',
      height: hp('9%'),
      marginTop: hp('2%'),
    },
    iconBG: {
      backgroundColor: colors.tabBG,
      width: wp('10%'),
      height: wp('10%'),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
    },
  });
