import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { StyleSheet } from 'react-native';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
      borderColor: colors.border3,
      borderWidth: 1,
      borderRadius: 10,
      marginTop: hp(1.5),
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('1%'),
    },

    title: {
      color: colors.primary,
    },
    description: {
      color: colors.inputTxt,
    },
  });
