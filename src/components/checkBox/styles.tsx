import { StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    box: {
      borderRadius: 4,
      borderColor: colors.border,
      borderWidth: 1,
    },
    focusBox: {
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
    },
  });
