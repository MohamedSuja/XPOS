import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.tab,
      paddingBottom: hp(1),
    },
    buttonContainer: {
      paddingHorizontal: wp(5),
      paddingVertical: hp(1),
      borderRadius: 10,
      marginHorizontal: 5,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonText: {
      color: colors.background,
    },
    badgeContainer: {
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 10,
      marginLeft: 5,
    },
    badgeText: {},
  });
