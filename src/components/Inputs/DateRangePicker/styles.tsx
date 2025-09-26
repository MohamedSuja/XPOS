import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const createInputStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      paddingHorizontal: wp(3),
      height: hp('6%'),
      borderRadius: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputText: {
      color: colors.dateText,
    },
    divider: {
      width: 7,
      height: 1,
      borderRadius: 100,
      backgroundColor: colors.inputTxt,
      marginHorizontal: wp(7),
    },
  });
