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
      fontSize: Platform.OS == 'android' ? RFValue(14) : RFValue(12),
    },
    activeInputContainer: {
      borderWidth: 1,
      borderColor: colors.cancelledBorder,
    },
    activeInput: {
      color: colors.inputTxt,
      fontWeight: '700',
      fontSize: Platform.OS == 'android' ? RFValue(14) : RFValue(12),
    },
    errorInputContainer: { borderColor: colors.errorText, borderWidth: 1 },
    validationText: {
      color: colors.errorText,
      fontSize: RFValue(11),
      marginTop: hp(0.5),
    },
  });
