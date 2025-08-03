import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      height: hp(6.5),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabled: {
      opacity: 0.7,
    },
    title: {
      color: colors.background,
      fontSize: Platform.OS === 'ios' ? RFValue(12) : RFValue(15),
      fontWeight: Platform.OS === 'ios' ? '600' : '700',
    },
  });
