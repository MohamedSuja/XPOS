import { hp } from '@/utils/Scaling';
import { StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      alignItems: 'center',
      flex: 1,
      backgroundColor: colors.loadingBackground,
    },
    indicatorContainer: {
      backgroundColor: colors.loadingBackground,
      marginTop: hp(40),
      padding: hp(2),
      borderRadius: 10,
    },
    indicator: {},
  });
