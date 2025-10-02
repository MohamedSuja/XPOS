import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DateRangePicker from '@/components/Inputs/DateRangePicker';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import CalendarIcon from '@/assets/icons/Calendar2.svg';
import Invoice from '@/assets/icons/Invoice.svg';
import { globalStyles } from '@/utils/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomStatusBar } from '@/components/customStatusBar';
import { requests } from '@/feature/services/api';
import { ErrorFlash } from '@/utils/FlashMessage';
import { hp, wp } from '@/utils/Scaling';
import EmptyValue from '@/assets/icons/EmptyValue.svg';
import pdfInvoice from '@/utils/pdfInvoice';

const ReportScreen = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const [dateRange, setDateRange] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
  }>({ startDate: '', endDate: '' });
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [summaryDetails, setSummaryDetails] = useState<any>(null);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [functionLoading, setFunctionLoading] = useState(false);

  // get report details
  const getReportDetails = (
    refreshState: boolean,
    page?: number,
    dateRange?: any,
  ) => {
    try {
      if (refreshState) {
        setLoading(true);
      }
      let parameters: any = {
        page: page || currentPage,
        per_page: 10,
      };
      if (dateRange?.start && dateRange?.end) {
        parameters.start_date = dateRange.start;
        parameters.end_date = dateRange.end;
      }

      requests
        .get('/api/pos/reports/order-summary', parameters)
        .then(res => {
          if (!refreshState) {
            if (currentPage <= lastPage) {
              setOrderList(prev => [...prev, ...res.data?.data?.menu_items]);
              setCurrentPage(currentPage + 1);
            }
          } else {
            setIsRefreshing(false);
            setSummaryDetails(res.data?.data);
            setOrderList(res.data?.data?.menu_items);
            setCurrentPage(2);
          }
          setLastPage(res.data.data?.pagination?.last_page);
        })
        .catch(error => {
          console.log(error);
          ErrorFlash(error.message || 'Something went wrong!');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      ErrorFlash('Something went wrong!');
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportDetails(true, 1, null);
    setDateRange({ startDate: '', endDate: '' });
  }, []);

  if (loading) {
    return (
      <View style={[styles.root, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.root}>
      <CustomStatusBar
        backgroundColor={colors.inputField}
        barStyle="dark-content"
        translucent={false}
      />

      <DateRangePicker
        onChange={range => {
          setDateRange(range);
          getReportDetails(true, 1, {
            start: range?.startDate,
            end: range?.endDate,
          });
        }}
        value={dateRange}
        onClear={() => {
          setDateRange({ startDate: '', endDate: '' });
          getReportDetails(true, 1, null);
        }}
      />

      <View style={styles.dateCard}>
        <View style={styles.dateContainer}>
          <CalendarIcon fill={colors.headerTxt} height={25} width={25} />
          {dateRange?.startDate == '' && dateRange?.endDate == '' ? (
            <>
              <Text style={[styles.date, globalStyles.h8]}>
                {summaryDetails?.date_range?.start_date}
              </Text>
              <Text style={[styles.dateText, globalStyles.h12]}>(Today)</Text>
            </>
          ) : (
            <Text style={[styles.date, globalStyles.h8]}>
              {summaryDetails?.date_range?.start_date} -{' '}
              {summaryDetails?.date_range?.end_date}
            </Text>
          )}
        </View>

        <View style={styles.container1}>
          <View style={styles.completeContainer}>
            <Text style={[styles.completeText, globalStyles.h4]}>
              {summaryDetails?.summary?.completed_orders}
            </Text>
            <Text style={[styles.completeText, globalStyles.h12]}>
              Complete Orders
            </Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={[styles.totalText, globalStyles.h4]}>
              Rs. {summaryDetails?.summary?.total_revenue?.amount}
            </Text>
            <Text style={[styles.totalText, globalStyles.h12]}>
              Total Earning
            </Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.invoiceButton}
            onPress={() => {
              pdfInvoice(summaryDetails);
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.background} />
            ) : (
              <>
                <Invoice height={25} width={25} />
                <Text style={[styles.invoiceText, globalStyles.h8]}>
                  Invoice
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {orderList.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={orderList}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                getReportDetails(true, 1, null);
                setDateRange({ startDate: '', endDate: '' });
              }}
            />
          }
          onEndReached={() => {
            getReportDetails(false, currentPage, {
              start: dateRange?.startDate,
              end: dateRange?.endDate,
            });
          }}
          onEndReachedThreshold={1}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={[
                styles.itemContainer,
                index === orderList.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View>
                <Text style={[styles.itemTitle, globalStyles.h8]}>
                  {item?.menu_item_name}
                </Text>
                <Text style={[styles.itemQuantity, globalStyles.h12]}>
                  Qty: {item?.quantity} X Rs.{item?.unit_price?.amount}
                </Text>
              </View>
              <Text style={[styles.itemPrice, globalStyles.h5]}>
                Rs. {item?.total?.amount}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <EmptyValue height={wp('40%')} width={wp('40%')} />
          <Text style={[globalStyles.h6, { color: colors.dropDownIcon }]}>
            No any orders !
          </Text>
        </View>
      )}

      {/* <View style={styles.totalAmountContainer}>
        <Text style={[styles.totalAmountText, globalStyles.h5]}>
          Total Amount
        </Text>
        <Text style={[styles.totalAmount, globalStyles.h5]}>Rs. </Text>
      </View> */}
    </SafeAreaView>
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
