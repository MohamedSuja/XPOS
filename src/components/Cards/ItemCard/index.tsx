import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomSwitch from '@/components/CustomSwitch';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';

interface ItemCardProps {
  image: string;
  title: string;
  available: boolean;
  onSwitchChange?: (active: boolean) => void;
}

const ItemCard = (props: ItemCardProps) => {
  const { image, title, available, onSwitchChange } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);
  const [isSwitching, setIsSwitching] = useState(available);

  const handleSwitchChange = (value: boolean) => {
    setIsSwitching(value);
    onSwitchChange?.(value);
  };

  useEffect(() => {
    setIsSwitching(available);
  }, [available]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSwitching
            ? colors.itemCard
            : colors.itemCardInactive,
          borderColor: isSwitching
            ? colors.itemCardBorder
            : colors.itemCardInactiveBorder,
        },
      ]}
    >
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={[globalStyles.h4, styles.title]}>{title}</Text>
        <Text
          style={[
            globalStyles.h9,
            styles.description,
            { color: isSwitching ? colors.readyTxt : colors.itemCardTxt },
          ]}
        >
          {isSwitching ? 'Available' : 'Unavailable'}
        </Text>
      </View>
      <CustomSwitch value={isSwitching} onChange={handleSwitchChange} />
    </View>
  );
};

export default ItemCard;
