import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const createInputStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      borderRadius: 100,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(4),
    },
    inputContainer: {
      flexDirection: 'row',
      height: Platform.OS == 'ios' ? hp(6) : hp(6.5),

      paddingHorizontal: wp(2),
      alignItems: 'center',
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
