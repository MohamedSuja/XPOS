import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import CustomSwitch from '@/components/CustomSwitch';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import { ErrorFlash } from '@/utils/FlashMessage';
import { requests } from '@/feature/services/api';

interface ItemCardProps {
  id: string;
  image: string;
  title: string;
  available: boolean;
  onSwitchChange?: (active: boolean) => void;
}

const ItemCard = (props: ItemCardProps) => {
  const { id, image, title, available, onSwitchChange } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);
  const [isSwitching, setIsSwitching] = useState(available);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleSwitchChange = useCallback(
    (value: boolean) => {
      setIsSwitching(value);
      onSwitchChange?.(value);
      updateAvailability();
    },
    [available],
  );

  useEffect(() => {
    setIsSwitching(available);
  }, [available]);

  const updateAvailability = () => {
    try {
      setUpdateLoading(true);
      requests
        .put(`/api/pos/menu-items/${props.id}/availability`, {
          is_available: !isSwitching,
        })
        .then(res => {
          console.log(res.data);
          setIsSwitching(!isSwitching);
          setUpdateLoading(false);
        })
        .catch(error => {
          ErrorFlash(error?.message || 'Something went wrong!');
          setIsSwitching(isSwitching);
        })
        .finally(() => {
          setUpdateLoading(false);
        });
    } catch (error) {
      setUpdateLoading(false);
      setIsSwitching(isSwitching);
      ErrorFlash('Something went wrong!');
    }
  };

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
        <Text style={[globalStyles.h8, styles.title]}>{title}</Text>
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
      {updateLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : (
        <CustomSwitch
          value={isSwitching ? true : false}
          onChange={handleSwitchChange}
        />
      )}
    </View>
  );
};

export default ItemCard;
