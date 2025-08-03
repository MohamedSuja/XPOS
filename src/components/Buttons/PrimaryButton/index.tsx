import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { createButtonStyles } from "./styles";
import { useTheme } from "@/utils/ThemeContext";
import { ThemeContextType } from "@/utils/ThemeContext";

interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean | undefined;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
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
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
