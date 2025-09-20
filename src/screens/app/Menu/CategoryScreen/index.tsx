import { View, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [perPage, setPerPage] = useState(15);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const menuCategoriesData = useAppSelector(selectMenuCategoriesData);
  const menuCategoriesStatus = useAppSelector(selectMenuCategoriesStatus);

  useEffect(() => {
    dispatch(
      requestMenuCategories({
        per_page: perPage,
        page: 1,
        status: 'approved',
      }),
    );
  }, [dispatch, perPage]);

  // Update allCategories when new data arrives
  useEffect(() => {
    if (menuCategoriesData?.data?.categories) {
      // Always replace all categories since we're using page 1 with increasing per_page
      setAllCategories(menuCategoriesData.data.categories);
    }

    // Reset loading states when data arrives
    setIsRefreshing(false);
    setIsLoadingMore(false);
  }, [menuCategoriesData]);

  // Filter categories based on search query
  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Load more categories when reaching the end
  const loadMoreCategories = () => {
    const pagination = menuCategoriesData?.data?.pagination;
    if (
      pagination &&
      allCategories.length < pagination.total &&
      !isLoadingMore &&
      !isRefreshing
    ) {
      setIsLoadingMore(true);
      const newPerPage = perPage + 10;
      setPerPage(newPerPage);
      dispatch(
        requestMenuCategories({
          per_page: newPerPage,
          page: 1,
          status: 'approved',
        }),
      );
    }
  };

  // Pull to refresh functionality
  const onRefresh = () => {
    setIsRefreshing(true);
    setPerPage(15);
    setAllCategories([]);
    dispatch(
      requestMenuCategories({
        per_page: 15,
        page: 1,
        status: 'approved',
      }),
    );
  };

  // Reset pagination when search query changes
  useEffect(() => {
    if (searchQuery) {
      // For search, we'll filter locally from all loaded categories
      // In a real app, you might want to implement server-side search
    } else {
      // Reset to initial per_page when search is cleared
      if (perPage > 15) {
        setPerPage(15);
        setAllCategories([]);
        dispatch(
          requestMenuCategories({
            per_page: 15,
            page: 1,
            status: 'approved',
          }),
        );
      }
    }
  }, [searchQuery, dispatch, perPage]);

  const renderCategoryItem = ({ item }: { item: any }) => (
    <CategoryItem
      item={{
        id: item.id,
        name: item.name,
        image:
          item.image || 'https://via.placeholder.com/150x150?text=No+Image',
      }}
      onPress={() => {
        navigation.navigate('CategoryViewScreen', {
          item: item,
        });
      }}
    />
  );

  return (
    <View style={[styles.root]}>
      <View style={[styles.headerContainer, { paddingTop: hp(2.5) }]}>
        <SearchInput
          placeholder="Search main category"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMoreCategories}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

export default CategoryScreen;
