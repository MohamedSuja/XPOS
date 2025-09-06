import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
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
    scrollView: {
      paddingHorizontal: wp(4),
      paddingVertical: hp(2),
    },

    customerContainer: {
      flexDirection: 'row',
      marginTop: hp(1.5),
    },
    customerText: {
      color: colors.inputTxt,
    },
    orderItemsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp(1.5),
    },
    orderItemsTitle: {
      color: colors.inputTxt,
    },
    orderItemsInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    orderItemsCount: {
      color: colors.subTitle,
      marginLeft: wp(2),
    },

    footer: {
      backgroundColor: colors.background,
      borderColor: colors.uploaderBorder,
      borderTopWidth: hp(0.1),
      paddingVertical: hp(1),
    },
    footerButton: {
      marginHorizontal: wp(4),
      marginVertical: hp(0.8),
    },
  });
