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
    image: string | null;
  };
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const CategoryItem = ({ item, onPress }: CategoryItemProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  const defaultImage = 'https://via.placeholder.com/150x150?text=No+Image';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <Image
        source={{ uri: item.image || defaultImage }}
        style={styles.image}
        defaultSource={{ uri: defaultImage }}
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
