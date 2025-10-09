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
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('2%'),
      borderBottomWidth: 1,
      borderBottomColor: colors.stroke,
    },
    searchInput: {
      backgroundColor: colors.searchInput,
    },
    columnWrapper: {
      paddingHorizontal: wp('4%'),
      justifyContent: 'space-between',
    },
    listContainer: {
      paddingBottom: hp('2%'),
      paddingTop: hp('1%'),
    },
  });
