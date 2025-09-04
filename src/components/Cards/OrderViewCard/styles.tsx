import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { StyleSheet } from 'react-native';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',

      borderRadius: 15,
      borderWidth: 1,

      paddingHorizontal: wp(2),
      paddingVertical: hp(1),
      marginBottom: hp(1),
    },
  });
