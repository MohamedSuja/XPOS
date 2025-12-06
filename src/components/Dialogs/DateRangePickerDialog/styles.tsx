import { StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    sheet: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: wp('4%'),
      paddingTop: hp('3%'),
      paddingBottom: hp('2%'),
      backgroundColor: colors.background,
    },
    header: {
      marginBottom: hp('1%'),
    },

    footer: {
      flexDirection: 'row',
      gap: wp('3%'),
      justifyContent: 'flex-end',
      paddingTop: hp('1%'),
      paddingBottom: hp('0.5%'),
    },
    btn: {
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('1%'),
      borderRadius: 10,
    },
    btnGhost: {
      backgroundColor: 'transparent',
      borderWidth: 1,
    },
  });
