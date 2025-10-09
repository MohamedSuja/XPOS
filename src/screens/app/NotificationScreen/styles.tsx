import { StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      width: '100%',
      height: '100%',
    },
    header: {
      paddingHorizontal: wp('4%'),
      borderBottomWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      paddingVertical: hp('2%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerTxt: {
      fontSize: RFValue(16),
      color: colors.headerTxt,
      textAlign: 'center',
    },
    backBtn: {
      padding: wp('1%'),
      borderRadius: 100,
      borderColor: colors.border,
      borderWidth: 1,
    },
    box: {
      borderWidth: 1,
      width: wp('92%'),
      padding: wp('2%'),
      borderRadius: 8,
      marginVertical: hp('0.5%'),
    },
    headerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: wp('2%'),
    },
    contentTxt: {
      color: colors.inputTxt,
      width: '100%',
    },
    noJobImg: {
      width: wp('50%'),
      height: wp('50%'),
      resizeMode: 'contain',
    },
  });
