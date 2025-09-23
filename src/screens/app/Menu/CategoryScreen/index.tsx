import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import SearchInput from '@/components/Inputs/SearchInput';
import CategoryItem from '@/components/Cards/CategoryItem';

import { hp } from '@/utils/Scaling';
import { MenuStackScreenProps } from '@/navigation/NavigationModels/MenuStack';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import {
  selectMenuCategoriesData,
  selectMenuCategoriesStatus,
} from '@/feature/slices/menu_slice';
import { requestMenuCategories } from '@/feature/thunks/menu_thunks';
import { STATUS } from '@/feature/services/status_constants';

const CategoryScreen = ({
  navigation,
}: MenuStackScreenProps<'CategoryScreen'>) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const dispatch = useAppDispatch();
  const menuCategoriesData = useAppSelector(selectMenuCategoriesData);
  const menuCategoriesStatus = useAppSelector(selectMenuCategoriesStatus);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const categories = menuCategoriesData?.data?.categories || [];
  const pagination = menuCategoriesData?.data?.pagination;

  useEffect(() => {
    loadCategories(true);
  }, []);

  const loadCategories = useCallback(
    async (
      reset: boolean = false,
      searchOverride?: string,
      per_page?: number,
    ) => {
      try {
        await dispatch(
          requestMenuCategories({
            page: 1,
            per_page: per_page ?? 10,
            search: searchOverride ?? searchQuery,
            status: 'approved',
          }),
        ).unwrap();
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    },
    [dispatch, searchQuery, pagination],
  );

  const loadMoreCategories = useCallback(async () => {
    if (isLoadingMore || !pagination) return;

    if (pagination.per_page < pagination.total) {
      setIsLoadingMore(true);
      await loadCategories(false, searchQuery, pagination.per_page + 10);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, pagination, loadCategories, searchQuery]);

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setIsSearchLoading(true);
      await loadCategories(true, query);
      setIsSearchLoading(false);
    },
    [loadCategories],
  );

  const renderCategoryItem = useCallback(
    ({ item }: { item: any }) => (
      <CategoryItem
        item={{
          id: item.id,
          name: item.name,
          image: item.image,
        }}
        onPress={() => {
          navigation.navigate('CategoryViewScreen', {
            item: item,
          });
        }}
      />
    ),
    [navigation],
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
    if (menuCategoriesStatus === STATUS.LOADING) return null;

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
          No categories found
        </Text>
      </View>
    );
  }, [menuCategoriesStatus, colors.headerTxt]);

  if (
    menuCategoriesStatus === STATUS.LOADING &&
    !pagination &&
    !isSearchLoading
  ) {
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

  return (
    <View style={[styles.root]}>
      <View style={[styles.headerContainer, { paddingTop: hp(2.5) }]}>
        <SearchInput
          placeholder="Search main category"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMoreCategories}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshing={
          menuCategoriesStatus === STATUS.LOADING &&
          !pagination &&
          !isSearchLoading
        }
        onRefresh={() => loadCategories(true, searchQuery)}
      />
    </View>
  );
};

export default CategoryScreen;
