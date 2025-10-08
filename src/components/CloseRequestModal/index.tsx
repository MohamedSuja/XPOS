import { View, Text, Linking, Pressable } from 'react-native';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';

type CloseRequestModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
  onCancel: any;
};

const CloseRequestModal = (props: CloseRequestModalProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const snapPoints = useMemo(() => ['50%'], []);

  const handleRedirectCall = () => {
    try {
      Linking.openURL(`tel:+94242221484`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendEmail = () => {
    const email = 'xeatadmin@gmail.com';
    Linking.openURL(`mailto:${email}`);
  };

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
            Temporarily Close Your Shop
          </Text>
          <Text
            style={[
              globalStyles.h9,
              { color: colors.inputTxt, textAlign: 'center' },
            ]}
          >
            Are you sure you want to temporarily close your shop for today?
            Please contact admin.
          </Text>
        </View>
        <View style={styles.box}>
          <View>
            <Text style={[globalStyles.h9, { color: colors.inputTxt }]}>
              Contact Us
            </Text>
            <Text
              style={[
                globalStyles.h5,
                { color: colors.inputTxt, marginTop: hp('0.5%') },
              ]}
            >
              024 222 1484
            </Text>
          </View>
          <Pressable style={styles.iconBG} onPress={handleRedirectCall}>
            <MaterialIcons
              name="local-phone"
              size={RFValue(18)}
              color={colors.primary}
            />
          </Pressable>
        </View>

        <View style={styles.box}>
          <View>
            <Text style={[globalStyles.h9, { color: colors.inputTxt }]}>
              Email Address
            </Text>
            <Text
              style={[
                globalStyles.h5,
                { color: colors.inputTxt, marginTop: hp('0.5%') },
              ]}
            >
              xeatadmin@gmail.com
            </Text>
          </View>
          <Pressable style={styles.iconBG} onPress={handleSendEmail}>
            <Entypo name="mail" size={RFValue(16)} color={colors.primary} />
          </Pressable>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default CloseRequestModal;
