import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.inputField,
    },
    headerContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('1%'),
      borderBottomWidth: 1,
      borderBottomColor: colors.stroke,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: hp(0.5),
    },
    backBtn: {
      position: 'absolute',
      left: 0,
    },
    headerTxt: {
      color: colors.headerTxt,
      textAlign: 'center',
      width: '80%',
    },
    categoryList: {
      paddingVertical: hp(1),
    },
    searchInput: {
      marginHorizontal: wp(4),
      marginVertical: hp(1.5),
    },
    itemList: {
      paddingHorizontal: wp(4),
    },
  });
