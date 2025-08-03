import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';

interface CategoryItemProps {
  item: {
    id: number;
    name: string;
    image: string;
  };
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const CategoryItem = ({ item, onPress }: CategoryItemProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[globalStyles.h8, styles.name]}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
