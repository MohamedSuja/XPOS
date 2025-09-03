import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import PreparingIcon from '@/assets/icons/Preparing.svg';
import PickedIcon from '@/assets/icons/Picked.svg';
import ReadyIcon from '@/assets/icons/Ready.svg';
import AcceptedIcon from '@/assets/icons/Accepted.svg';

interface TextButtonProps {
  type:
    | 'preparing'
    | 'picked'
    | 'cancelled'
    | 'ready'
    | 'accepted'
    | 'scheduled';
  style?: StyleProp<ViewStyle>;
}

const Tag = (props: TextButtonProps) => {
  const { type, style } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);
  return (
    <View
      style={[
        styles.container,
        type === 'cancelled' && {
          borderColor: colors.cancelledBorder,
          backgroundColor: colors.cancelledBG,
        },
        type === 'accepted' && {
          borderColor: colors.acceptedBorder,
          backgroundColor: colors.acceptedBG,
        },
        type === 'ready' && {
          borderColor: colors.readyBorder,
          backgroundColor: colors.readyBG,
        },
        type === 'picked' && {
          borderColor: colors.packingBorder,
          backgroundColor: colors.packingBG,
        },
        type === 'preparing' && {
          borderColor: colors.preparingBorder,
          backgroundColor: colors.preparingBG,
        },
        type === 'scheduled' && {
          borderColor: colors.acceptedBG,
          backgroundColor: colors.acceptedBG,
        },
        style,
      ]}
    >
      {type === 'preparing' && <PreparingIcon width={25} height={25} />}
      {type === 'picked' && <PickedIcon width={25} height={25} />}
      {type === 'ready' && <ReadyIcon width={25} height={25} />}
      {type === 'accepted' && <AcceptedIcon width={25} height={25} />}
      <Text
        style={[
          styles.text,
          type === 'cancelled' && { color: colors.cancelledTxt },
          type === 'accepted' && { color: colors.acceptedTxt },
          type === 'ready' && { color: colors.readyTxt },
          type === 'picked' && { color: colors.packingTxt },
          type === 'preparing' && { color: colors.foodDelivery },
          type === 'scheduled' && { color: colors.acceptedTxt },
          globalStyles.h8,
        ]}
      >
        {type === 'preparing' && 'Preparing'}
        {type === 'picked' && 'Picked'}
        {type === 'cancelled' && 'Cancelled'}
        {type === 'ready' && 'Ready'}
        {type === 'accepted' && 'Accepted'}
        {type === 'scheduled' && 'Scheduled'}
      </Text>
    </View>
  );
};

export default Tag;
