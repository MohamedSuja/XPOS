import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F9F9F9',
    },
    headerContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: wp('5%'),
      paddingBottom: hp(2.5),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: hp(0.5),
    },
    backBtn: {
      position: 'absolute',
      left: 0,
    },
    headerTxt: {
      color: colors.headerTxt,
      textAlign: 'center',
    },
    profileContainer: {
      paddingHorizontal: wp('5%'),
      paddingVertical: hp(2.5),
    },
    profileHeader: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    profileImageContainer: {},

    profileImage: {
      width: hp(12),
      height: hp(12),
      backgroundColor: colors.background,
      borderRadius: 100,
    },
    editIcon: {
      backgroundColor: colors.primary,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      width: hp(4),
      height: hp(4),
      borderWidth: 3,
      borderColor: colors.background,
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    profileName: {
      marginTop: hp(2),
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2),
      marginTop: hp(1),
    },
    locationText: {
      color: colors.headerTxt,
    },
    profileButtonContainer: {
      marginTop: hp(2),
      backgroundColor: colors.background,
      padding: hp(2),
      borderRadius: 10,
    },
    profileButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    profileButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2),
    },
    profileButtonText: {
      color: colors.headerTxt,
    },
    profileButtonSeparator: {
      height: 1,
      backgroundColor: colors.profileSeparator,
      marginVertical: hp(2),
    },
    logoutButton: {
      marginHorizontal: wp('5%'),
      marginTop: hp(3),
    },
  });
