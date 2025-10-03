import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { requests } from '@/feature/services/api';
import { ErrorFlash } from '@/utils/FlashMessage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomStatusBar } from '@/components/customStatusBar';
import { globalStyles } from '@/utils/globalStyles';
import BackButton from '@/components/Buttons/BackButton';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { hp, wp } from '@/utils/Scaling';
import DateRangePicker from '@/components/Inputs/DateRangePicker';
import EmptyValue from '@/assets/icons/EmptyValue.svg';
import { formatDate, formatTime } from '@/utils/formatTime';
import { toTwoDigit } from '@/utils/formatCurrency';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import GetAmountModal from '@/components/getAmountModal';
import WithdrawRequestModal from '@/components/withdrawRequestModal';

const WalletScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const [loading, setLoading] = useState(true);
  const [functionLoading, setFunctionLoading] = useState(false);
  const [walletDetails, setWalletDetails] = useState<any>(null);
  const [listLoading, setListLoading] = useState(true);
  const [transactionList, setTransactionList] = useState<any[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
  }>({ startDate: '', endDate: '' });

  const withdrawModalRef: any = useRef<BottomSheetModal>(null);
  const withdrawSuccessModalRef: any = useRef<BottomSheetModal>(null);

  const handleOpenWithdrawModalModal = useCallback(() => {
    withdrawModalRef.current?.present();
  }, []);

  const handleOpenWithdrawSuccessModalModal = useCallback(() => {
    withdrawSuccessModalRef.current?.present();
  }, []);

  const handleCloseWithdrawModalModal = useCallback(() => {
    withdrawModalRef.current?.dismiss();
  }, []);

  const handleCloseWithdrawSuccessModalModal = useCallback(() => {
    withdrawSuccessModalRef.current?.dismiss();
  }, []);

  // get wallet balance
  const getWalletDetails = () => {
    try {
      requests
        .get('/api/pos/wallet/balance')
        .then(res => {
          setWalletDetails(res.data?.data);
        })
        .catch(error => {
          console.log(error);
          ErrorFlash(error?.message || 'Something went wrong!');
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

  // get transcation list

  const getTransactions = (
    refreshState: boolean,
    page?: number,
    dateRange?: any,
  ) => {
    try {
      if (refreshState) {
        setListLoading(true);
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
        .get('/api/pos/wallet/withdrawal-transactions', parameters)
        .then(res => {
          if (!refreshState) {
            if (currentPage <= lastPage) {
              setTransactionList(prev => [
                ...prev,
                ...res.data?.data?.withdrawal_transactions,
              ]);
              setCurrentPage(currentPage + 1);
            }
          } else {
            setIsRefreshing(false);
            setTransactionList(res.data?.data?.withdrawal_transactions);
            setCurrentPage(2);
          }
          setLastPage(res.data.data?.pagination?.last_page);
        })
        .catch(error => {
          console.log(error);
          ErrorFlash(error.message || 'Something went wrong!');
        })
        .finally(() => {
          setListLoading(false);
        });
    } catch (error) {
      console.log(error);
      ErrorFlash('Something went wrong!');
      setListLoading(false);
    }
  };

  // send withdraw request
  const sendWithdrawRequest = async (amount: number) => {
    try {
      setFunctionLoading(true);
      const transcationBody = {
        amount: amount,
      };

      await requests
        .post('/api/pos/wallet/withdraw', transcationBody)
        .then(async res => {
          setFunctionLoading(false);
          handleCloseWithdrawModalModal();
          handleOpenWithdrawSuccessModalModal();
          getTransactions(true, 1, null);
        })
        .catch(error => {
          let errorMessage = '';
          console.log(error);
          if (error.status == 422) {
            let alertDescription = '';
            const errors = error.data?.errors;

            if (errors) {
              for (const key in errors) {
                const errorMessagesArray = errors[key];
                errorMessagesArray.forEach((message: string) => {
                  alertDescription += `${message}\n`;
                });
              }
            }
            errorMessage = alertDescription.trim();
          } else {
            errorMessage = error.data?.message;
          }

          ErrorFlash(errorMessage || 'Something went wrong!');
          setFunctionLoading(false);
          handleCloseWithdrawModalModal();
        });
    } catch (error) {
      console.log(error);
      ErrorFlash('Something went wrong!');
      setFunctionLoading(false);
      handleCloseWithdrawModalModal();
    }
  };

  useFocusEffect(
    useCallback(() => {
      getWalletDetails();
      getTransactions(true, 1, null);
    }, []),
  );
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar
        backgroundColor={colors.currentStatus}
        barStyle="dark-content"
        translucent={false}
      />

      <View style={[styles.box]}>
        <View style={styles.header}>
          <BackButton style={styles.backBtn} />
          <Text style={[globalStyles.h5, { color: colors.background }]}>
            My Wallet
          </Text>
          <Pressable
            style={styles.icon}
            onPress={() => {
              navigation.navigate('BankDetailsScreen');
            }}
          >
            <FontAwesome
              name="bank"
              size={RFValue(18)}
              color={colors.primary}
            />
          </Pressable>
        </View>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="small" color={colors.background} />
          </View>
        ) : (
          <>
            <View>
              <Text
                style={[
                  globalStyles.h1,
                  {
                    color: colors.background,
                    textAlign: 'center',
                    fontSize: RFValue(22),
                    marginBottom: hp('1%'),
                  },
                ]}
              >
                Rs. {walletDetails?.current_balance}
              </Text>
              <Text
                style={[
                  globalStyles.h9,
                  { color: colors.background, textAlign: 'center' },
                ]}
              >
                Total Balance
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <TouchableOpacity
                style={styles.withdrawBtn}
                onPress={() => {
                  handleOpenWithdrawModalModal();
                }}
              >
                <Text style={[globalStyles.h4, { color: colors.btnBorder }]}>
                  Withdraw
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {/* transcation conatiner */}

      <View style={styles.bottomContainer}>
        <DateRangePicker
          onChange={range => {
            setDateRange(range);
            getTransactions(true, 1, {
              start: range?.startDate,
              end: range?.endDate,
            });
          }}
          value={dateRange}
          style={styles.datePicker}
          onClear={() => {
            setDateRange({ startDate: '', endDate: '' });
            getTransactions(true, 1, null);
          }}
        />
        <Text style={[globalStyles.h5, styles.title]}>Transactions</Text>

        {listLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : transactionList.length > 0 ? (
          <FlatList
            data={transactionList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: hp('1%') }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => {
                  getTransactions(true, 1, null);
                  setDateRange({ startDate: '', endDate: '' });
                }}
              />
            }
            onEndReached={() => {
              getTransactions(false, currentPage, {
                start: dateRange?.startDate,
                end: dateRange?.endDate,
              });
            }}
            onEndReachedThreshold={1}
            renderItem={({ item }) => (
              <View style={styles.earningsCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{ justifyContent: 'space-between', gap: hp('0.5%') }}
                  >
                    <Text style={[globalStyles.h5, { color: colors.inputTxt }]}>
                      Ref. {item?.id}
                    </Text>
                    <Text
                      style={[globalStyles.h12, { color: colors.inputTxt }]}
                    >
                      {formatDate(item?.created_at)} |{' '}
                      {formatTime(item?.created_at)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    gap: hp('0.5%'),
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={[globalStyles.h4, { color: colors.greenBG }]}>
                    Rs. {toTwoDigit(item?.amount)}
                  </Text>
                  <Text style={[globalStyles.h12, { color: colors.inputTxt }]}>
                    {item?.status}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: hp('2%'),
            }}
          >
            <EmptyValue height={wp('40%')} width={wp('40%')} />
            <Text style={[globalStyles.h6, { color: colors.dropDownIcon }]}>
              No any transcations yet!
            </Text>
          </View>
        )}
      </View>

      <GetAmountModal
        bottomSheetModalRef={withdrawModalRef}
        loading={functionLoading}
        onPress={(amount: any) => {
          sendWithdrawRequest(amount);
        }}
        onCancel={() => {
          handleCloseWithdrawModalModal();
        }}
      />
      <WithdrawRequestModal
        bottomSheetModalRef={withdrawSuccessModalRef}
        onCancel={() => handleCloseWithdrawSuccessModalModal()}
      />
    </SafeAreaView>
  );
};

export default WalletScreen;
