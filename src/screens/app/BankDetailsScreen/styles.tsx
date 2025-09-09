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
    box: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      width: wp('92%'),
      marginHorizontal: wp('4%'),
      padding: wp('4%'),
      marginTop: hp('3%'),
    },
    editBtn: {
      backgroundColor: colors.tabBG,
      borderRadius: 100,
      width: wp('8%'),
      height: wp('8%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: colors.headerTxt,
      paddingHorizontal: wp('4%'),
      marginVertical: hp('2%'),
    },
    cardContainer: {
      borderWidth: 1,
      borderRadius: 10,
      width: wp('92%'),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: colors.border,
      paddingHorizontal: wp('4%'),
      height: hp('7%'),
      backgroundColor: colors.background,
    },
    addCardContainer: {
      width: wp('92%'),
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: hp('7%'),
      backgroundColor: colors.notificationBG,
      paddingHorizontal: wp('4%'),
      marginHorizontal: wp('4%'),
    },
    checkBG: {
      width: wp('6%'),
      height: wp('6%'),
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor: colors.btnBorder,
      borderColor: colors.btnBorder,
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
