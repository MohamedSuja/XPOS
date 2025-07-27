import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import { createButtonStyles } from './styles';
import { useTheme } from '@/utils/ThemeContext';
import { ThemeContextType } from '@/utils/ThemeContext';
import LeftArrowIcon from '@/assets/icons/LeftArrow.svg';
import { wp } from '@/utils/Scaling';
import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean | undefined;
}

const BackButton = (props: BackButtonProps) => {
  const navigation = useNavigation();
  const { onPress, style, disabled } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          navigation.goBack();
        }
      }}
      style={[styles.container, disabled && styles.disabled, style]}
      disabled={disabled}
      activeOpacity={0.5}
    >
      <LeftArrowIcon width={wp(5)} height={wp(5)} />
    </TouchableOpacity>
  );
};

export default BackButton;
