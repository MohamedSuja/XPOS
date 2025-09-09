import { StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      width: '100%',
      height: '100%',
    },
    header: {
      paddingHorizontal: wp('4%'),
      borderBottomWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      paddingVertical: hp('2%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('2%'),
      borderBottomWidth: 1,
      borderBottomColor: colors.stroke,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: hp(0.5),
    },
    headerTxt: {
      fontSize: RFValue(16),
      color: colors.headerTxt,
      textAlign: 'center',
    },
    backBtn: {
      position: 'absolute',
      left: 0,
    },
  });
