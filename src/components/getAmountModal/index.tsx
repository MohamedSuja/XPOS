import { View, Text } from 'react-native';
import React, { RefObject, useCallback, useMemo } from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { createStyles } from './styles';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { globalStyles } from '../../utils/globalStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import PrimaryButton from '../Buttons/PrimaryButton';

type GetAmountModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
  loading: boolean;
  onPress: any;
  onCancel: any;
};

const GetAmountModal = (props: GetAmountModalProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const snapPoints = useMemo(() => ['40%'], []);

  const validationSchema = yup.object({
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .required('Amount should be required'),
  });

  const formik = useFormik({
    initialValues: {
      amount: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      //   handleSubmit(values);
      props.onPress(values.amount);
    },
  });
  const handleSheetChange = useCallback((index: number) => {
    if (index == -1) {
      formik.resetForm();
    }
  }, []);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        style={styles.wrapper}
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior={'close'}
      />
    );
  }, []);

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      index={0}
      backgroundStyle={styles.container}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      keyboardBlurBehavior="restore"
      keyboardBehavior="fillParent"
      // android_keyboardInputMode="adjustResize"
    >
      <View style={styles.contentWrapper}>
        <View>
          <Text
            style={[
              globalStyles.h4,
              {
                color: colors.headerTxt,
                textAlign: 'center',
                marginBottom: hp('1%'),
              },
            ]}
          >
            Enter Withdraw Amount
          </Text>
          <Text
            style={[
              globalStyles.h9,
              { color: colors.inputTxt, textAlign: 'center' },
            ]}
          >
            Enter the amount you want to withdraw
          </Text>
        </View>
        <View>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor:
                  formik.errors.amount && formik.touched.amount
                    ? colors.errorText
                    : colors.border,
                paddingHorizontal: wp('6%'),
                backgroundColor:
                  formik.errors.amount && formik.touched.amount
                    ? colors.background
                    : colors.inputField,
                justifyContent: 'flex-start',
              },
            ]}
          >
            <BottomSheetTextInput
              value={formik.values.amount}
              onChangeText={formik.handleChange('amount')}
              onBlur={formik.handleBlur('amount')}
              placeholder="Enter amount"
              style={[globalStyles.h9, styles.inputfield]}
              placeholderTextColor={colors.placeHolder}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
          {formik.touched.amount && formik.errors.amount && (
            <Text style={[globalStyles.h10, styles.errorText]}>
              * {formik.errors.amount.toString()}
            </Text>
          )}
        </View>
        <PrimaryButton
          style={styles.footerButton}
          title="Withdraw"
          onPress={formik.handleSubmit}
          loading={props.loading}
        />
      </View>
    </BottomSheetModal>
  );
};

export default GetAmountModal;
