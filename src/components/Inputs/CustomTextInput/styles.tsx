import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const createInputStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {},
    inputContainer: {
      flexDirection: 'row',
      height: Platform.OS == 'ios' ? hp(6) : hp(6.5),
      borderRadius: 8,
      paddingHorizontal: wp(2),
      alignItems: 'center',
      backgroundColor: colors.inputField,
    },
    activeInputContainer: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    activeInput: {
      color: colors.inputTxt,
      fontWeight: '700',
      fontSize: Platform.OS == 'android' ? RFValue(13) : RFValue(12),
    },
    errorInputContainer: { borderColor: colors.errorText },
    validationText: {
      color: colors.errorText,
      fontSize: RFValue(11),
      marginTop: hp(0.5),
    },
  });
