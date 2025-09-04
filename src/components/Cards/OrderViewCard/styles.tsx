import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { StyleSheet } from 'react-native';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: colors.border1,
      paddingHorizontal: wp(2.5),
      paddingVertical: hp(1.5),
      marginVertical: hp(1),
    },

    titleContainer: {
      backgroundColor: colors.cardBG,
      flexDirection: 'row',
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
      alignItems: 'center',
      borderRadius: 13,
    },
    titleTextContainer: {
      flex: 1,
    },
    title: {
      color: colors.inputTxt,
    },
    titleSubContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp(0.5),
    },
    subtitle: {
      color: colors.subTitle,
    },
    subtitleNumber: {
      color: colors.inputTxt,
      marginRight: wp(3),
    },
    totalContainer: {
      borderColor: colors.divider3,
      borderLeftWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: wp(12),
      height: hp(6),
    },
    totalText: {
      color: colors.primary,
      marginLeft: wp(2),
      marginBottom: hp(0.6),
    },

    addOns: {
      color: colors.subTitle,
      marginTop: hp(2),
      marginBottom: hp(0.5),
    },
    addOnsItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: hp(0.3),
    },
    addOnsItem: {
      color: colors.greenBG,
      marginLeft: wp(2.5),
      marginBottom: wp(0.6),
    },
    Instruction: {
      color: colors.subTitle,
      marginTop: hp(2),
      marginBottom: hp(0.5),
    },
    instructionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: hp(0.3),
    },
    instructionItemText: {
      color: colors.warning,
      marginLeft: wp(2.5),
      marginBottom: wp(0.6),
    },
  });
