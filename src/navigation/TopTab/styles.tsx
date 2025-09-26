import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: wp('4%'),
      backgroundColor: colors.searchInput,
      marginBottom: hp(1),
      borderRadius: 10,
      padding: wp(1),
    },
    buttonContainer: {
      paddingHorizontal: wp(5),
      paddingVertical: hp(1),
      borderRadius: 10,
      // margin: wp(1),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonText: {
      color: colors.background,
    },
    badgeContainer: {
      borderRadius: 100,
      width: wp(6),
      height: wp(6),
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 5,
    },
    badgeText: {
      fontSize: RFValue(8),
    },
  });
