import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchInput from '@/components/Inputs/SearchInput';
import CategoryItem from '@/components/Cards/CategoryItem';
import { MenuStackScreenProps } from '@/navigation/NavigationModels/MenuStack';
import { hp } from '@/utils/Scaling';

const CategoryScreen = ({
  navigation,
}: MenuStackScreenProps<'CategoryScreen'>) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root]}>
      <View style={[styles.headerContainer, { paddingTop: hp(2.5) }]}>
        <SearchInput
          placeholder="Search main category"
          style={styles.searchInput}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        data={categoryData}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            onPress={() => {
              navigation.navigate('CategoryViewScreen', {
                item: item,
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default CategoryScreen;

const categoryData = [
  {
    id: 1,
    name: 'Pizza',
    image:
      'https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg',
  },
  {
    id: 2,
    name: 'Burger',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5k7T60odhyrtndKnNo0Ef-GmdAQTIdl22jg&s',
  },
  {
    id: 3,
    name: 'Salad',
    image:
      'https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?semt=ais_hybrid&w=740',
  },
  {
    id: 4,
    name: 'Dessert',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8_kCgEQn9yIXh1QSwPJcN6QYJVceekyMXxQ&s',
  },
  {
    id: 5,
    name: 'Drink',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRoJ0RCxNrOLvYxHj8NSYEOBKgNLef73dF9A&s',
  },
  {
    id: 6,
    name: 'Soup',
    image:
      'https://bakewithshivesh.com/wp-content/uploads/2018/05/RASPBERRY-APPLE-CRISP.jpg',
  },
  {
    id: 7,
    name: 'Pasta',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjrvUCM4F6qU2P-gskxXTMQjn9jPhRPT5BZQ&s',
  },
  {
    id: 8,
    name: 'Fish',
    image:
      'https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2019/10/MG_3869.jpg?fit=1500%2C1011&ssl=1',
  },
  {
    id: 9,
    name: 'Chicken',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WF7SFm5a1kterAAcz-4ZxNDw6oglgIJHKA&s',
  },
  {
    id: 10,
    name: 'Beef',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjRHIfneW-xeaNFH91s9iLCN0w5fww9NPfEQ&s',
  },
  {
    id: 11,
    name: 'Vegetarian',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Ovgxx5xzyfkobvR99fY1YWgoqso0zr_hdg&s',
  },
  {
    id: 12,
    name: 'Vegan',
    image:
      'https://clicklovegrow.com/wp-content/uploads/2020/03/Naomi-Sherman-Advanced-Graduate4.jpg',
  },
];
