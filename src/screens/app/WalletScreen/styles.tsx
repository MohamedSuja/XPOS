import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.inputField,
      width: '100%',
      height: '100%',
    },
    backBtn: {
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    box: {
      backgroundColor: colors.currentStatus,
      height: hp('40%'),
      justifyContent: 'space-between',
      paddingHorizontal: wp('4%'),
      paddingBottom: hp('8%'),
      paddingTop: hp('1%'),
    },
    icon: {
      backgroundColor: colors.background,
      borderRadius: 100,
      width: wp('12%'),
      height: wp('12%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    withdrawBtn: {
      height: hp('6%'),
      borderRadius: 8,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
    },
    bottomContainer: {
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      backgroundColor: colors.inputField,
      paddingHorizontal: wp('4%'),
      paddingTop: hp('3%'),
      marginBottom: hp('2%'),
      marginTop: -hp('5%'),
      flex: 1,
    },
    datePicker: {
      marginTop: hp(0.5),
    },
    title: {
      marginTop: hp('2%'),
      marginBottom: hp('1%'),
      color: colors.headerTxt,
    },
    earningsCard: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingVertical: wp('2%'),
      paddingHorizontal: wp('3%'),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      width: '100%',
    },
  });
