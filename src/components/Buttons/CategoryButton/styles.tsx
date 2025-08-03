import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(4),
      marginHorizontal: wp(1),
    },
    title: {
      color: colors.background,
      fontSize: Platform.OS === 'ios' ? RFValue(12) : RFValue(15),
      fontWeight: Platform.OS === 'ios' ? '600' : '700',
    },
  });
