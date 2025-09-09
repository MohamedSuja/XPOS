import { hp, wp } from '@/utils/Scaling';
import { ColorsType } from '@/utils/ThemeContext';
import { StyleSheet } from 'react-native';

export const createButtonStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      borderRadius: 12,
      padding: wp('4%'),
      marginHorizontal: wp('4%'),
      marginVertical: hp('1%'),
      borderWidth: 1,
      borderColor: colors.border3,
    },
    header: {
      marginBottom: hp('2%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleText: {
      color: colors.inputTxt,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('1%'),
      marginTop: hp(0.5),
    },
    dateText: {
      color: colors.primary,
    },
    completeText: {
      color: colors.subTitle,
    },
    tag: {
      marginTop: hp(0.5),
    },
    itemsContainer: {
      borderRadius: 8,
      padding: wp('3%'),

      backgroundColor: colors.background,
      borderColor: colors.acceptedBorder,
      borderWidth: 0.5,
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: hp('1%'),
    },
    itemName: {
      color: colors.inputTxt,
      borderRightWidth: 1,
      width: '88%',
      borderColor: colors.cardBorder,
    },
    quantityText: {
      color: colors.primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: wp('3%'),
      marginTop: hp('2%'),
    },
    declineButton: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      height: hp('5.5'),
    },
    acceptButton: {
      flex: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.readyTxt,
      height: hp('5.5'),
    },
  });
