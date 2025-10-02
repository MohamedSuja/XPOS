import { View, Text } from 'react-native';
import React, { RefObject, useCallback, useMemo } from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { createStyles } from './styles';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { globalStyles } from '../../utils/globalStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import PrimaryButton from '../Buttons/PrimaryButton';

type WithdrawRequestModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
  onCancel: any;
};

const WithdrawRequestModal = (props: WithdrawRequestModalProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const snapPoints = useMemo(() => ['35%'], []);

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
    >
      <View style={styles.contentWrapper}>
        <View style={styles.iconBG}>
          <AntDesign name="check" size={RFValue(22)} color={colors.greenBG} />
        </View>
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
            Withdrawal Request Submitted
          </Text>
          <Text
            style={[
              globalStyles.h9,
              { color: colors.inputTxt, textAlign: 'center' },
            ]}
          >
            Your request has been sent to the admin. The amount will be
            transferred to your bank account
          </Text>
        </View>

        <PrimaryButton
          style={styles.footerButton}
          title="Ok"
          onPress={props.onCancel}
        />
      </View>
    </BottomSheetModal>
  );
};

export default WithdrawRequestModal;
