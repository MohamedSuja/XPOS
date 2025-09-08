import React from 'react';
import {
  ActivityIndicator,
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

interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean | undefined;
  loading?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { title, onPress, style, textStyle, disabled, loading } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      activeOpacity={0.5}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.background} />
      ) : (
        <Text
          style={[
            globalStyles.h4,
            styles.title,
            textStyle,
            (disabled || loading) && styles.disabledTitle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
