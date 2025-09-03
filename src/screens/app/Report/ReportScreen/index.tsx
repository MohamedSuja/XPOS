import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import DateRangePicker from '@/components/Inputs/DateRangePicker';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import CalendarIcon from '@/assets/icons/Calendar2.svg';
import Invoice from '@/assets/icons/Invoice.svg';
import Share from '@/assets/icons/Share.svg';
import { globalStyles } from '@/utils/globalStyles';

const ReportScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.root}>
      <DateRangePicker />

      <View style={styles.dateCard}>
        <View style={styles.dateContainer}>
          <CalendarIcon height={25} width={25} />
          <Text style={[styles.date, globalStyles.h8]}>27/ 07/ 2025</Text>
          <Text style={[styles.dateText, globalStyles.h12]}>(Today)</Text>
        </View>

        <View style={styles.container1}>
          <View style={styles.completeContainer}>
            <Text style={[styles.completeText, globalStyles.h4]}>10</Text>
            <Text style={[styles.completeText, globalStyles.h12]}>
              Complete Orders
            </Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={[styles.totalText, globalStyles.h4]}>Rs. 10,000</Text>
            <Text style={[styles.totalText, globalStyles.h12]}>
              Total Earning
            </Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.invoiceButton}>
            <Invoice height={25} width={25} />
            <Text style={[styles.invoiceText, globalStyles.h8]}>Invoice</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton}>
            <Share height={25} width={25} />
            <Text style={[styles.shareText, globalStyles.h8]}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={[styles.summaryText, globalStyles.h5]}>Order Summary</Text>
        <Text style={[styles.todayText, globalStyles.h9]}>Today</Text>
      </View>

      <View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={data}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.itemContainer,
                index === data.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View>
                <Text style={[styles.itemTitle, globalStyles.h8]}>
                  {item.title}
                </Text>
                <Text style={[styles.itemQuantity, globalStyles.h12]}>
                  Qty: {item.quantity} X Rs.{item.price}
                </Text>
              </View>
              <Text style={[styles.itemPrice, globalStyles.h5]}>
                Rs. {item.quantity * item.price}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.totalAmountContainer}>
        <Text style={[styles.totalAmountText, globalStyles.h5]}>
          Total Amount
        </Text>
        <Text style={[styles.totalAmount, globalStyles.h5]}>Rs. 10,000</Text>
      </View>
    </View>
  );
};

const data = [
  {
    id: '1',
    title: 'Dum Chicken Biriyani',
    quantity: 10,
    price: 850,
  },
  {
    id: '2',
    title: 'Paneer Butter Masala',
    quantity: 5,
    price: 600,
  },
  {
    id: '3',
    title: 'Garlic Naan',
    quantity: 20,
    price: 50,
  },
];

export default ReportScreen;
