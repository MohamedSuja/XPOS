import { hp, wp } from '@/utils/Scaling';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const createButtonStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderRadius: 100,
      alignSelf: 'flex-start',
      padding: wp(2.5),
      borderWidth: 1,
      borderColor: colors.border,
    },
    disabled: {
      opacity: 0.5,
    },
    title: {
      color: colors.primaryButton,
      fontSize: Platform.OS === 'ios' ? RFValue(11) : RFValue(13),
      fontWeight: 'bold',
    },
  });
