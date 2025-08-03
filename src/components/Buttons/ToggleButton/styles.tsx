import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { StyleSheet } from 'react-native';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp(2),
    },
    toggleContainer: {
      flexDirection: 'row',
      backgroundColor: colors.toggleBG,
      borderRadius: 40,
      padding: wp('1%'),
      margin: wp('2%'),
    },
    button: {
      paddingVertical: hp('1%'),
      paddingHorizontal: wp('6%'),
      borderRadius: 100,
      minWidth: wp('20%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftButton: {
      marginRight: wp('1%'),
    },
    rightButton: {
      marginLeft: wp('1%'),
    },
    activeButton: {
      backgroundColor: colors.disableBtnTxt,
    },
    activeButtonGreen: {
      backgroundColor: colors.greenBG,
    },
    buttonText: {
      color: colors.dropDownIcon,
    },
    leftActiveText: {
      color: colors.inputTxt,
    },
    activeText: {
      color: colors.background,
    },
    // Example styles
    exampleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      padding: 20,
    },
    statusText: {
      marginTop: 20,
      fontSize: 18,
      color: '#333',
    },
    spacer: {
      height: 40,
    },
  });
