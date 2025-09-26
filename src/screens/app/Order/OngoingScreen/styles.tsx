import { StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.inputField,
    },
    searchInput: {
      marginHorizontal: wp(4),
      marginTop: hp(1),
    },
  });
