import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    headerContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: wp('5%'),

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
    categoryList: {
      paddingVertical: hp(1),
      marginVertical: hp(1),
    },
    searchInput: {
      backgroundColor: colors.background,
      marginHorizontal: wp(4),
      marginVertical: hp(1.5),
    },
    itemList: {
      paddingHorizontal: wp(4),
    },
  });
