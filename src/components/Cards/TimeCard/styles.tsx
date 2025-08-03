import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { StyleSheet } from 'react-native';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: hp('0.5%'),
      marginBottom: hp('2%'),
    },
    timeContainer: {
      alignItems: 'center',
    },
    timeNumber: {
      color: colors.background,
    },
    timeText: {
      color: colors.background,
    },
    divider: {
      width: 1,
      height: '100%',
      backgroundColor: colors.divider2,
      marginHorizontal: wp('8%'),
    },
  });
