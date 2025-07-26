import { hp, wp } from '@/utils/Scaling';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const createButtonStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderRadius: 5,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderWidth: 1,
      paddingHorizontal: wp(2),
      paddingVertical: hp(0.5),
    },
    text: {},
  });
