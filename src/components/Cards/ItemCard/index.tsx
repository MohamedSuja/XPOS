import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import CustomSwitch from '@/components/CustomSwitch';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import { ErrorFlash } from '@/utils/FlashMessage';
import { requests } from '@/feature/services/api';
import Food from '@/assets/images/Food.png';
import LinearGradient from 'react-native-linear-gradient';

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
      onSwitchChange?.(value);
      updateAvailability(value);
    },
    [available],
  );

  useEffect(() => {
    setIsSwitching(available);
  }, [available]);

  const updateAvailability = (value: boolean) => {
    try {
      setUpdateLoading(true);
      requests
        .put(`/api/pos/menu-items/${props.id}/availability`, {
          is_available: value,
        })
        .then(res => {
          console.log(res.data);
          setIsSwitching(value);
          setUpdateLoading(false);
        })
        .catch(error => {
          ErrorFlash(error?.message || 'Something went wrong!');
          setIsSwitching(!value);
        })
        .finally(() => {
          setUpdateLoading(false);
        });
    } catch (error) {
      setUpdateLoading(false);
      setIsSwitching(!value);
      ErrorFlash('Something went wrong!');
    }
  };

  return (
    <LinearGradient
      colors={
        isSwitching
          ? [colors.orange, colors.background]
          : [colors.itemCardInactive, colors.itemCardInactive]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.container,
        {
          borderColor: isSwitching
            ? colors.itemCardBorder
            : colors.itemCardInactiveBorder,
          opacity: isSwitching ? 1 : 0.6,
        },
      ]}
    >
      <Image
        style={styles.image}
        source={!image ? (Food as number) : { uri: image }}
        defaultSource={Food as number}
      />

      <View style={styles.infoContainer}>
        <Text style={[globalStyles.h5, styles.title]}>{title}</Text>
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
    </LinearGradient>
  );
};

export default ItemCard;
