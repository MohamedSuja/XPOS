import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { StyleSheet } from 'react-native';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',

      borderRadius: 15,
      borderWidth: 1,

      paddingHorizontal: wp(2),
      paddingVertical: hp(1),
      marginBottom: hp(1),
    },
    image: {
      width: wp(18),
      height: hp(8),
      borderRadius: 10,
      resizeMode: 'cover',
    },
    infoContainer: {
      flex: 1,
      marginLeft: wp(2),
      gap: hp(0.5),
    },
    title: {
      color: colors.headerTxt,
    },
    description: {
      color: colors.subTitle,
    },
    loader: {
      marginRight: wp(3),
    },
  });
