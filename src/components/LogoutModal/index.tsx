import { View, Text } from 'react-native';
import React, { RefObject, useCallback, useMemo } from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { globalStyles } from '@/utils/globalStyles';
import { hp } from '@/utils/Scaling';
import SecondaryButton from '../Buttons/SecondaryButton';
import PrimaryButton from '../Buttons/PrimaryButton';

type LogoutModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
  loading: boolean;
  onPress: any;
  onCancel: any;
};

const LogoutModal = (props: LogoutModalProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const snapPoints = useMemo(() => ['30%'], []);

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
            Logout
          </Text>
          <Text
            style={[
              globalStyles.h9,
              { color: colors.inputTxt, textAlign: 'center' },
            ]}
          >
            Are you sure you want to logout?
          </Text>
        </View>

        <View style={styles.footerButton}>
          <SecondaryButton
            style={styles.btn}
            title="Cancel"
            onPress={props.onCancel}
          />
          <PrimaryButton
            onPress={props.onPress}
            style={styles.btn}
            title="Logout"
            loading={props.loading}
          />
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default LogoutModal;
