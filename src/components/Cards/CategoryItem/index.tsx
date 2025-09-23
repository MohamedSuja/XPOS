import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import Food from '@/assets/images/Food.png';

interface CategoryItemProps {
  item: {
    id: number;
    name: string;
    image: string | null;
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
      <Image
        style={styles.image}
        source={!item.image ? (Food as number) : { uri: item.image }}
        defaultSource={Food as number}
      />

      <Text style={[globalStyles.h8, styles.name]}>
        {item.name?.length > 10
          ? item.name.substring(0, 10) + '...'
          : item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
