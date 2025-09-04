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
import { globalStyles } from '@/utils/globalStyles';

interface TextButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean | undefined;
}

const TextButton = (props: TextButtonProps) => {
  const { title, onPress, style, titleStyle, disabled } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, disabled && styles.disabled, style]}
      disabled={disabled}
      activeOpacity={0.5}
    >
      <Text style={[globalStyles.h4, styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
