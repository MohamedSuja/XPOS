import { STATUS } from '../services/status_constants';

// Menu State Interface
export interface IMenuState {
  menuSliceStatus: string | undefined;

  // Error
  menuError: IMenuError | undefined;

  // Menu Categories Data
  menuCategoriesStatus: string | undefined;
  menuCategoriesData: IMenuCategoriesResponseBody | undefined;

  // Menu Subcategories Data
  menuSubcategoriesStatus: string | undefined;
  menuSubcategoriesData: IMenuSubcategoriesResponseBody | undefined;

  // Menu Items Data
  menuItemsStatus: string | undefined;
  menuItemsData: IMenuItemsResponseBody | undefined;
}

// Menu Categories Response Body
export interface IMenuCategoriesResponseBody {
  success: boolean;
  message: string;
  data: {
    categories: {
      id: number;
      name: string;
      image: string | null;
      is_featured: boolean;
      sort_order: number;
      status: string;
      subcategories: {
        id: number;
        name: string;
        image: string | null;
        is_featured: boolean;
        sort_order: number;
        status: string;
        created_at: string;
        updated_at: string;
      }[];
      subcategories_count: number;
      created_at: string;
      updated_at: string;
    }[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
    };
    filters: {
      search: string | null;
      status: string;
      featured: boolean | null;
      locale: string;
    };
    restaurant_branch: {
      id: number;
      name: string;
    };
  };
}

// Menu Categories Request Parameters
export interface IMenuCategoriesRequestParams {
  search?: string;
  featured?: boolean;
  status?: string;
  per_page: number;
  page: number;
}

// Menu Subcategories Response Body
export interface IMenuSubcategoriesResponseBody {
  success: boolean;
  message: string;
  data: {
    category: {
      id: number;
      name: string;
    };
    subcategories: {
      id: number;
      name: string;
      image: string | null;
      is_featured: boolean;
      sort_order: number;
      status: string;
      created_at: string;
      updated_at: string;
    }[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number | null;
      to: number | null;
    };
    filters: {
      search: string | null;
      status: string;
      featured: string | null;
      locale: string;
    };
    restaurant_branch: {
      id: number;
      name: string;
    };
  };
}

// Menu Subcategories Request Parameters
export interface IMenuSubcategoriesRequestParams {
  categoryId: number;
  search?: string;
  featured?: boolean;
  status?: string;
  per_page: number;
  page: number;
}

// Menu Items Response Body
export interface IMenuItemsResponseBody {
  success: boolean;
  message: string;
  data: {
    menu_items: {
      id: number;
      name: string;
      description: string;
      image: string | null;
      price: string | null;
      is_veg: boolean;
      is_available: boolean;
      status: string;
      category: {
        id: number;
        name: string;
      };
      subcategory: {
        id: number;
        name: string;
      } | null;
      variants: {
        id: number;
        name: string;
        price: string;
        final_price: number;
        discount_type: string | null;
        discount_value: string | null;
      }[];
      add_ons: any[];
      variants_count: number;
      add_ons_count: number;
      created_at: string;
      updated_at: string;
    }[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
    };
    filters: {
      search: string | null;
      status: string;
      available: boolean | null;
      is_veg: boolean | null;
      category_id: number | null;
      subcategory_id: number | null;
      locale: string;
    };
    restaurant_branch: {
      id: number;
      name: string;
    };
  };
}

// Menu Items Request Parameters
export interface IMenuItemsRequestParams {
  search?: string;
  category_id?: number;
  subcategory_id?: number;
  available?: boolean;
  status?: string;
  per_page: number;
  page: number;
}

// Menu Error Interface
export interface IMenuError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}
