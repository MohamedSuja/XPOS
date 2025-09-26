import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@/utils/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '@/utils/Scaling';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('2%'),
      borderBottomWidth: 1,
      borderBottomColor: colors.stroke,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: hp(0.5),
    },
    headerTxt: {
      fontSize: RFValue(16),
      color: colors.headerTxt,
      textAlign: 'center',
    },
    backBtn: {
      position: 'absolute',
      left: 0,
    },
    scrollView: {
      paddingHorizontal: wp(4),
      paddingVertical: hp(2),
    },
    deliveryMessageContainer: {
      backgroundColor: colors.acceptedBG,
      paddingVertical: hp(1),
      alignItems: 'center',
    },
    deliveryMessage: {
      color: colors.primary,
    },
    orderInfoSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp(1),
    },
    orderIdContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    orderTypeContainer: {
      backgroundColor: colors.acceptedBG,
      paddingHorizontal: wp(3),
      paddingVertical: hp(0.3),
      borderRadius: 5,
    },
    orderTypeText: {
      color: colors.primary,
    },

    orderCancelledContainer: {
      backgroundColor: colors.cancelledBG,
      paddingHorizontal: wp(3),
      paddingVertical: hp(0.3),
      borderRadius: 5,
      borderColor: colors.cancelledBorder,
      borderWidth: 1,
    },
    orderCancelledText: {
      color: colors.subTitle,
    },
    dateSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: hp(1),
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    customerSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp(1),
    },
    paymentSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paymentMethodContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: wp(1),
    },
    paymentMethodText: {
      color: colors.inputTxt,
      marginLeft: wp(1),
      marginBottom: wp(1),
    },

    reasonCancelContainer: {
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
      borderColor: colors.border3,
      borderWidth: 1,
      borderRadius: 10,
      marginTop: hp(1.5),
      backgroundColor: colors.acceptedBG,
    },
    reasonCancelTitle: {
      color: colors.primary,
    },
    reasonCancel: {
      color: colors.inputTxt,
    },

    itemsSection: {
      marginTop: hp(2),
      marginBottom: hp(2),
      backgroundColor: colors.searchInput,
      paddingHorizontal: wp(3),
      paddingVertical: hp(0.5),
      borderRadius: 10,
    },
    itemContainer: {
      marginBottom: hp(1),
      borderColor: colors.border2,
      borderBottomWidth: 0.5,
      paddingVertical: hp(1),
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp(0.5),
    },
    itemName: {
      color: colors.inputTxt,
      flex: 1,
    },
    itemPrice: {
      color: colors.inputTxt,
    },
    itemVariant: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: hp(0.3),
    },
    variantText: {
      color: colors.cancelledTxt,
    },
    quantityText: {
      color: colors.cancelledTxt,
    },

    itemInstruction: {
      flexDirection: 'row',
      marginTop: hp(0.3),
    },
    instructionText: {
      color: colors.dropDownIcon,
    },
    instructionItemText: {
      fontStyle: 'italic',
      color: colors.dropDownIcon,
      marginLeft: wp(1),
    },
    totalSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.totalBG,
      borderRadius: 10,
      padding: wp(3),
      borderColor: colors.border,
    },
    totalLabel: {
      color: colors.greenBG,
    },
    totalAmount: {
      color: colors.greenBG,
    },
    labelText: {
      color: colors.inputTxt,
      marginRight: wp(1),
    },
    valueText: {
      color: colors.headerTxt,
      fontSize: RFValue(16),
    },
    footer: {
      backgroundColor: colors.background,
      borderColor: colors.uploaderBorder,
      borderTopWidth: hp(0.1),
      paddingVertical: hp(1),
    },
    footerButton: {
      marginHorizontal: wp(4),
      marginVertical: hp(0.8),
    },
  });
