import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import CategoryButton from '@/components/Buttons/CategoryButton';
import { useAppDispatch, useAppSelector } from '@/feature/stateHooks';
import { requestMenuSubcategories } from '@/feature/thunks/menu_thunks';
import {
  selectMenuSubcategoriesData,
  selectMenuSubcategoriesStatus,
} from '@/feature/slices/menu_slice';
import { STATUS } from '@/feature/services/status_constants';

interface SubcategoriesProps {
  id?: string;
  onPress?: (id: string) => void;
}

const Subcategories = (props: SubcategoriesProps) => {
  const { id, onPress } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const dispatch = useAppDispatch();
  const MenuSubcategoriesData = useAppSelector(selectMenuSubcategoriesData);
  const MenuSubcategoriesStatus = useAppSelector(selectMenuSubcategoriesStatus);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const categoryData = MenuSubcategoriesData?.data?.subcategories || [];
  const pagination = MenuSubcategoriesData?.data?.pagination;

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    loadSubcategories();
  }, [id]);

  const loadSubcategories = useCallback(
    async (per_page?: number) => {
      dispatch(
        requestMenuSubcategories({
          categoryId: id ?? '',
          status: 'approved',
          per_page: per_page || 10,
          page: 1,
        }),
      );
    },
    [dispatch, pagination],
  );

  const loadMoreCategories = useCallback(async () => {
    if (isLoadingMore || !pagination) return;

    if (pagination.per_page < pagination.total) {
      setIsLoadingMore(true);
      await loadSubcategories(pagination.per_page + 10);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, pagination, loadSubcategories]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }, [isLoadingMore, colors.primary]);

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        data={categoryData}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={() => (
          <CategoryButton
            title={'All Items'}
            active={activeIndex === -1}
            onPress={() => {
              setActiveIndex(-1);
              onPress?.('');
            }}
          />
        )}
        renderItem={({ item, index }) => (
          <CategoryButton
            title={item.name}
            active={activeIndex === index}
            onPress={() => {
              setActiveIndex(index);
              onPress?.(item.id.toString());
            }}
          />
        )}
        onScrollToIndexFailed={() => {
          // Handle scroll failure gracefully
          console.log('Scroll to index failed');
        }}
        onEndReached={loadMoreCategories}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshing={MenuSubcategoriesStatus === STATUS.LOADING && !pagination}
        onRefresh={() => loadSubcategories()}
      />
    </View>
  );
};

export default Subcategories;
