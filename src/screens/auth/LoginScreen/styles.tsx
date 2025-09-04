import { StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      width: '100%',
      height: '100%',
    },
    img: {
      width: '100%',
      height: hp('48%'),
      justifyContent: 'flex-end',
    },
    bottomContainer: {
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      backgroundColor: colors.background,
      paddingHorizontal: wp('4%'),
      paddingTop: hp('3%'),
      marginBottom: hp('4%'),
      flex: 1,
    },
    formContainer: {
      justifyContent: 'space-between',
      height: '100%',
    },
    countryWrapper: {
      borderRightWidth: 1,
      borderColor: colors.darkGray,
      height: '70%',
      justifyContent: 'center',
      marginRight: wp('2%'),
      width: wp('28%'),
    },
  });
