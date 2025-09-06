import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      flex: 1,
      paddingTop: hp(2.5),
      paddingHorizontal: wp('5%'),
    },

    dateCard: {
      backgroundColor: colors.cardBG,
      borderRadius: 10,
      paddingHorizontal: wp('2%'),
      paddingVertical: hp(2),
      borderColor: colors.cardBorder,
      borderWidth: 1,
      marginTop: hp(2),
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    date: {
      color: colors.headerTxt,
      marginLeft: wp('2%'),
    },
    dateText: {
      color: colors.headerTxt,
      marginLeft: wp('2%'),
    },
    container1: {
      flexDirection: 'row',
      marginTop: hp(1),
      justifyContent: 'space-between',
    },
    completeContainer: {
      backgroundColor: colors.packingBG,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.packingBorder,
      flex: 0.4,
      paddingHorizontal: wp('2%'),
      paddingVertical: hp(1),
    },
    completeText: {
      color: colors.packingTxt,
      marginTop: hp(0.5),
    },
    totalContainer: {
      backgroundColor: colors.readyBG,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.readyBorder,
      flex: 0.58,
      paddingHorizontal: wp('2%'),
      paddingVertical: hp(1),
    },
    totalText: {
      color: colors.greenBG,
      marginTop: hp(0.5),
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: hp(2),
    },
    invoiceButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      width: '45%',
      height: hp(5),
      justifyContent: 'center',
    },
    invoiceText: {
      color: colors.background,
      marginLeft: wp('2%'),
    },
    shareButton: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      width: '45%',
      height: hp(5),
      justifyContent: 'center',
    },
    shareText: {
      color: colors.primary,
      marginLeft: wp('2%'),
    },
    summaryContainer: {
      marginTop: hp(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryText: {
      color: colors.headerTxt,
    },
    todayText: {
      color: colors.subTitle,
    },
    listContent: {
      backgroundColor: colors.background,
      borderRadius: 10,
      marginTop: hp(2),
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: hp(1),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginHorizontal: wp('3%'),
    },
    itemTitle: {
      color: colors.headerTxt,
    },
    itemQuantity: {
      color: colors.subTitle,
    },
    itemPrice: {
      color: colors.headerTxt,
    },
    totalAmountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.readyBG,
      alignItems: 'center',
      borderRadius: 10,
      paddingHorizontal: wp('2%'),
      paddingVertical: hp(1),
      marginTop: hp(2),
    },
    totalAmountText: {
      color: colors.greenBG,
    },
    totalAmount: {
      color: colors.greenBG,
    },
  });
