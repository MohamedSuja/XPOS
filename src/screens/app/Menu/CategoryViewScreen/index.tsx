import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import SearchInput from '@/components/Inputs/SearchInput';
import { MenuStackScreenProps } from '@/navigation/NavigationModels/MenuStack';
import BackButton from '@/components/Buttons/BackButton';
import { globalStyles } from '@/utils/globalStyles';
import { hp, wp } from '@/utils/Scaling';
import ItemCard from '@/components/Cards/ItemCard';
import Subcategories from './Subcategories';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  selectMenuItemsData,
  selectMenuItemsStatus,
} from '@/feature/slices/menu_slice';
import {
  requestMenuItems,
  requestMenuSubcategories,
} from '@/feature/thunks/menu_thunks';
import { STATUS } from '@/feature/services/status_constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomStatusBar } from '@/components/customStatusBar';
import SearchBar from '@/components/searchBar';
import EmptyValue from '@/assets/icons/EmptyValue.svg';

const CategoryViewScreen = ({
  navigation,
  route,
}: MenuStackScreenProps<'CategoryViewScreen'>) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const dispatch = useAppDispatch();

  const MenuItemsData = useAppSelector(selectMenuItemsData);
  const MenuItemsStatus = useAppSelector(selectMenuItemsStatus);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const menu = MenuItemsData?.data?.menu_items || [];
  const pagination = MenuItemsData?.data?.pagination;
  const [subcategoryId, setSubcategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadMenu()
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading menu:', error);
        setLoading(false);
      });
  }, []);

  const loadSubcategories = () => {
    dispatch(
      requestMenuSubcategories({
        categoryId: route.params?.item?.id ?? '',
        status: 'approved',
        per_page: 10,
        page: 1,
      }),
    );
  };

  const loadMenu = useCallback(
    async (
      searchOverride?: string,
      per_page?: number,
      subcategoryId?: string,
    ) => {
      try {
        await dispatch(
          requestMenuItems({
            page: 1,
            per_page: per_page ?? 10,
            search: searchOverride ?? searchQuery,
            status: 'approved',
            category_id: route.params?.item?.id ?? '',
            subcategory_id: subcategoryId ?? '',
          }),
        );
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    },
    [dispatch, searchQuery, pagination],
  );

  const loadMoreMenu = useCallback(async () => {
    if (isLoadingMore || !pagination) return;

    if (pagination.per_page < pagination.total) {
      setIsLoadingMore(true);
      await loadMenu(searchQuery, pagination.per_page + 10, subcategoryId);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, pagination, loadMenu, searchQuery]);

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setIsSearchLoading(true);
      await loadMenu(query, undefined, subcategoryId);
      setIsSearchLoading(false);
    },
    [loadMenu],
  );

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }, [isLoadingMore, colors.primary]);

  const renderEmpty = useCallback(() => {
    if (MenuItemsStatus === STATUS.LOADING) return null;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp('20%'),
        }}
      >
        <EmptyValue height={wp('40%')} width={wp('40%')} />
        <Text
          style={[
            globalStyles.h6,
            {
              color: colors.dropDownIcon,
              textAlign: 'center',
            },
          ]}
        >
          No Items found
        </Text>
      </View>
    );
  }, [MenuItemsStatus, colors.dropDownIcon]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return MenuItemsStatus === STATUS.LOADING &&
    !pagination &&
    !isSearchLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  ) : (
    <SafeAreaView style={[styles.root]}>
      <CustomStatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />
      <View style={[styles.headerContainer]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h2, styles.headerTxt]}>
            {route.params?.item?.name ?? ''}
          </Text>
        </View>

        <Subcategories
          id={route.params?.item?.id ?? ''}
          onPress={(subcategoryId: string) => {
            setSubcategoryId(subcategoryId);
            if (subcategoryId === '') {
              loadMenu(undefined, 10, undefined);
            } else {
              loadMenu(undefined, 10, subcategoryId);
            }
          }}
        />
      </View>
      <View style={styles.searchInput}>
        <SearchBar
          onChange={(value: string) => {
            handleSearch(value);
          }}
          onClear={() => {
            handleSearch('');
          }}
          value={searchQuery}
          placeHolder="Search Item"
        />
      </View>

      <FlatList
        contentContainerStyle={styles.itemList}
        data={menu}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ItemCard
            id={item.id.toString()}
            image={item.image ?? ''}
            title={item.name}
            available={item.is_available}
          />
        )}
        onEndReached={loadMoreMenu}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshing={
          MenuItemsStatus === STATUS.LOADING && !pagination && !isSearchLoading
        }
        onRefresh={() => {
          loadMenu(searchQuery);
          loadSubcategories();
        }}
      />
    </SafeAreaView>
  );
};

export default CategoryViewScreen;
