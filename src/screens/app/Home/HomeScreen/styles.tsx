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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: wp('4%'),
      backgroundColor: colors.background,
      paddingVertical: hp('1%'),
    },
    notificationBG: {
      width: wp('12%'),
      height: wp('12%'),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.tabBG,
      borderRadius: 100,
    },
    notificationCount: {
      position: 'absolute',
      backgroundColor: colors.background,
      width: wp('4%'),
      height: wp('4%'),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      top: wp('2%'),
      right: wp('2%'),
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('2%'),
    },
    logo: {
      width: wp('17%'),
      height: wp('17%'),
      resizeMode: 'contain',
      borderRadius: 100,
    },
    statusContainer: {
      paddingVertical: hp('0.7%'),
      paddingHorizontal: wp('3%'),
      borderRadius: 4,
      alignSelf: 'flex-start',
      marginTop: hp('0.5%'),
    },
    currentBox: {
      width: wp('92%'),
      borderRadius: 12,
      backgroundColor: colors.currentStatus,
      padding: wp('4%'),
      height: hp('20%'),
      overflow: 'hidden',
      justifyContent: 'space-between',
      marginHorizontal: wp('4%'),
      marginVertical: hp('2%'),
    },
    earningIcon: {
      alignSelf: 'flex-start',
      padding: wp('3%'),
      borderRadius: 8,
      backgroundColor: colors.earningBG,
    },
    countBG: {
      backgroundColor: colors.background,
      paddingHorizontal: wp('3%'),
      paddingVertical: hp('0.8%'),
      alignSelf: 'center',
      borderRadius: 36,
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('2%'),
    },
  });
