import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      height: hp(6.5),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    disabled: {
      borderColor: colors.disableBtnBG,
    },
    title: {
      color: colors.primary,
    },
    disabledTitle: {
      color: colors.disableBtnTxt,
    },
  });
