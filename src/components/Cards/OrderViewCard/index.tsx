import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import PlusIcon from '@/assets/icons/Plus.svg';
import DangerIcon from '@/assets/icons/Danger.svg';
import CrossIcon from '@/assets/icons/Cross.svg';
import { wp } from '@/utils/Scaling';

interface OrderItemProps {
  item_name: string;
  item_description: string;
  quantity: number | null;
  special_instructions: string | null;
  variants: Array<{
    variant_name: string;
    variant_quantity: string | null;
  }>;
  add_ons: any[];
}

const OrderViewCard = (props: OrderItemProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <View style={[styles.container]}>
      <View style={styles.titleContainer}>
        <View style={styles.titleTextContainer}>
          <Text style={[globalStyles.h5, styles.title]}>{props.item_name}</Text>
          <View style={styles.titleSubContainer}>
            {props.variants?.length > 0 &&
              props.variants.map((variant, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Text style={[globalStyles.h9, styles.subtitle]}>
                    {variant.variant_name}:{' '}
                  </Text>
                  <Text style={[globalStyles.h5, styles.subtitleNumber]}>
                    {variant.variant_quantity}
                  </Text>
                  {index < props.variants.length - 1 && (
                    <Text style={[globalStyles.h9, styles.subtitle]}> | </Text>
                  )}
                </View>
              ))}
          </View>
        </View>
        <View style={styles.totalContainer}>
          <CrossIcon width={wp(3)} height={wp(3)} />
          <Text style={[globalStyles.h2, styles.totalText]}>
            {props.quantity || 0}
          </Text>
        </View>
      </View>

      {props.add_ons && props.add_ons.length > 0 && (
        <>
          <Text style={[globalStyles.h8, styles.addOns]}>Add-ons</Text>
          {props.add_ons.map((addon, index) => (
            <View key={index} style={styles.addOnsItemContainer}>
              <PlusIcon width={wp(3)} height={wp(3)} />
              <Text style={[globalStyles.h9, styles.addOnsItem]}>
                {addon.name || addon}
              </Text>
            </View>
          ))}
        </>
      )}

      {props.special_instructions && (
        <>
          <Text style={[globalStyles.h8, styles.Instruction]}>Instruction</Text>
          <View style={styles.instructionContainer}>
            <DangerIcon width={wp(3)} height={wp(3)} />
            <Text style={[globalStyles.h9, styles.instructionItemText]}>
              {props.special_instructions}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default OrderViewCard;
