import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { StyleSheet } from 'react-native';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      width: '48%',
      backgroundColor: colors.background,
      borderRadius: 10,
      marginVertical: hp('1%'),
    },
    image: {
      width: '100%',
      height: hp('13%'),
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      resizeMode: 'cover',
    },
    name: {
      alignSelf: 'center',
      marginVertical: hp('1%'),
      textAlign: 'center',
    },
  });
