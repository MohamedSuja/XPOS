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
      backgroundColor: colors.disableBtnBG,
    },
    title: {
      color: colors.background,
    },
    disabledTitle: {
      color: colors.disableBtnTxt,
    },
  });
