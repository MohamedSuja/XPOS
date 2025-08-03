import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const createInputStyles = (colors: ColorsType) =>
  StyleSheet.create({
    switchContainer: {
      borderRadius: 50,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    thumb: {
      borderRadius: 50,
      position: 'absolute',
      // backgroundColor: 'red',
    },
  });
