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

type CommingSoonModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
  onCancel: any;
};

const CommingSoonModal = (props: CommingSoonModalProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const snapPoints = useMemo(() => ['20%'], []);

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
            Coming Soon
          </Text>
          <Text
            style={[
              globalStyles.h9,
              { color: colors.inputTxt, textAlign: 'center' },
            ]}
          >
            This feature is coming soon.
          </Text>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default CommingSoonModal;
