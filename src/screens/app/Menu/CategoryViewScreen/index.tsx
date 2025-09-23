import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchInput from '@/components/Inputs/SearchInput';
import CategoryItem from '@/components/Cards/CategoryItem';
import { MenuStackScreenProps } from '@/navigation/NavigationModels/MenuStack';
import BackButton from '@/components/Buttons/BackButton';
import { globalStyles } from '@/utils/globalStyles';
import { hp } from '@/utils/Scaling';
import CategoryButton from '@/components/Buttons/CategoryButton';
import ItemCard from '@/components/Cards/ItemCard';
import Subcategories from './Subcategories';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  selectMenuCategoriesData,
  selectMenuCategoriesStatus,
  selectMenuItemsData,
  selectMenuItemsStatus,
} from '@/feature/slices/menu_slice';
import {
  requestMenuCategories,
  requestMenuItems,
} from '@/feature/thunks/menu_thunks';
import { STATUS } from '@/feature/services/status_constants';

const CategoryViewScreen = ({
  navigation,
  route,
}: MenuStackScreenProps<'CategoryViewScreen'>) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const MenuItemsData = useAppSelector(selectMenuItemsData);
  const MenuItemsStatus = useAppSelector(selectMenuItemsStatus);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const menu = MenuItemsData?.data?.menu_items || [];
  const pagination = MenuItemsData?.data?.pagination;
  const [subcategoryId, setSubcategoryId] = useState('');

  useEffect(() => {
    loadMenu();
  }, []);

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
        ).unwrap();
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
          paddingVertical: 50,
        }}
      >
        <Text
          style={{
            color: colors.headerTxt,
            fontSize: 16,
            textAlign: 'center',
          }}
        >
          No Items found
        </Text>
      </View>
    );
  }, [MenuItemsStatus, colors.headerTxt]);

  if (MenuItemsStatus === STATUS.LOADING && !pagination && !isSearchLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const renderCategoryItem = useCallback(
    ({ item }: { item: any }) => (
      <ItemCard
        id={item.id.toString()}
        image={item.image ?? ''}
        title={item.name}
        available={item.is_available}
      />
    ),
    [navigation, MenuItemsStatus],
  );

  return (
    <View style={[styles.root]}>
      <View style={[styles.headerContainer, { paddingTop: hp(2.5) }]}>
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

      <SearchInput
        placeholder="Search Item"
        style={styles.searchInput}
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        contentContainerStyle={styles.itemList}
        data={menu}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderCategoryItem}
        onEndReached={loadMoreMenu}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshing={
          MenuItemsStatus === STATUS.LOADING && !pagination && !isSearchLoading
        }
        onRefresh={() => loadMenu(searchQuery)}
      />
    </View>
  );
};

export default CategoryViewScreen;
