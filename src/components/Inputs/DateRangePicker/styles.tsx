import { ColorsType } from '@/utils/ThemeContext';
import { hp, wp } from '@/utils/Scaling';
import { StyleSheet } from 'react-native';

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
      marginVertical: hp('1%'),
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputText: {
      color: colors.disableHeader,
    },
    divider: {
      width: 7,
      height: 1,
      borderRadius: 100,
      backgroundColor: colors.disableHeader,
      marginHorizontal: wp(7),
    },
  });
