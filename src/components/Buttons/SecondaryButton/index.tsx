import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { createButtonStyles } from './styles';
import { useTheme } from '@/utils/ThemeContext';
import { ThemeContextType } from '@/utils/ThemeContext';
import { globalStyles } from '@/utils/globalStyles';

interface SecondaryButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean | undefined;
}

const SecondaryButton = (props: SecondaryButtonProps) => {
  const { title, onPress, style, textStyle, disabled } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, disabled && styles.disabled, style]}
      activeOpacity={0.5}
      disabled={disabled}
    >
      <Text style={[styles.title, globalStyles.h4, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
