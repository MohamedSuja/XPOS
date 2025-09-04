import React from 'react';
import {
  View,
  NativeSyntheticEvent,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { createStyles } from './styles';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';

const AppLoadingModel = (props: {
  visible?: boolean;
  onRequestClose?: (event: NativeSyntheticEvent<any>) => void;
}) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const { visible, onRequestClose } = props;

  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      transparent
      onRequestClose={onRequestClose}
      animationType="fade"
    >
      <View style={styles.root}>
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.indicator}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AppLoadingModel;
