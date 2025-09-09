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
    img: {
      width: wp('65%'),
      height: wp('65%'),
      resizeMode: 'contain',
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
