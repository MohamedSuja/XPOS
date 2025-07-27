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

interface CategoryButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  active?: boolean | undefined;
}

const CategoryButton = (props: CategoryButtonProps) => {
  const { title, onPress, style, textStyle, active } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: active ? colors.primary : colors.cancelledBG,
        },
        style,
      ]}
      activeOpacity={0.5}
    >
      <Text
        style={[
          styles.title,
          {
            color: active ? colors.background : colors.dropDownIcon,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
