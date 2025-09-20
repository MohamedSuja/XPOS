import { STATUS } from '../services/status_constants';
import { RootState } from '../rootReducer';
import { createSlice } from '@reduxjs/toolkit';
import { ErrorFlash } from '@/utils/FlashMessage';
import { IMenuState } from '../redux_models/menu_model';
import {
  requestMenuCategories,
  requestMenuSubcategories,
  requestMenuItems,
} from '../thunks/menu_thunks';

const DEFAULT_STATE: IMenuState = {
  menuSliceStatus: undefined,

  // Error
  menuError: undefined,

  // Menu Categories Data
  menuCategoriesStatus: undefined,
  menuCategoriesData: undefined,

  // Menu Subcategories Data
  menuSubcategoriesStatus: undefined,
  menuSubcategoriesData: undefined,

  // Menu Items Data
  menuItemsStatus: undefined,
  menuItemsData: undefined,
};

const INITIAL_STATE: IMenuState = {
  ...DEFAULT_STATE,
};

const menu_slice = createSlice({
  name: 'menu',
  initialState: INITIAL_STATE,
  reducers: {
    resetMenu: () => {
      return DEFAULT_STATE;
    },
    clearMenuError: (state: IMenuState) => {
      state.menuError = undefined;
    },
  },
  extraReducers: (builder: any) => {
    // Start Menu Categories ---
    builder.addCase(requestMenuCategories.pending, (state: IMenuState) => {
      state.menuSliceStatus = STATUS.LOADING;
      state.menuCategoriesStatus = STATUS.LOADING;
      state.menuError = undefined;
    });
    builder.addCase(
      requestMenuCategories.fulfilled,
      (state: IMenuState, action: any) => {
        state.menuSliceStatus = STATUS.SUCCEEDED;
        state.menuCategoriesStatus = STATUS.SUCCEEDED;
        state.menuCategoriesData = action.payload;
      },
    );
    builder.addCase(
      requestMenuCategories.rejected,
      (state: IMenuState, action: any) => {
        state.menuError = action.payload;
        state.menuSliceStatus = STATUS.FAILED;
        state.menuCategoriesStatus = STATUS.FAILED;
      },
    );
    // End Menu Categories ---

    // Start Menu Subcategories ---
    builder.addCase(requestMenuSubcategories.pending, (state: IMenuState) => {
      state.menuSliceStatus = STATUS.LOADING;
      state.menuSubcategoriesStatus = STATUS.LOADING;
      state.menuError = undefined;
    });
    builder.addCase(
      requestMenuSubcategories.fulfilled,
      (state: IMenuState, action: any) => {
        state.menuSliceStatus = STATUS.SUCCEEDED;
        state.menuSubcategoriesStatus = STATUS.SUCCEEDED;
        state.menuSubcategoriesData = action.payload;
      },
    );
    builder.addCase(
      requestMenuSubcategories.rejected,
      (state: IMenuState, action: any) => {
        state.menuError = action.payload;
        state.menuSliceStatus = STATUS.FAILED;
        state.menuSubcategoriesStatus = STATUS.FAILED;
      },
    );
    // End Menu Subcategories ---

    // Start Menu Items ---
    builder.addCase(requestMenuItems.pending, (state: IMenuState) => {
      state.menuSliceStatus = STATUS.LOADING;
      state.menuItemsStatus = STATUS.LOADING;
      state.menuError = undefined;
    });
    builder.addCase(
      requestMenuItems.fulfilled,
      (state: IMenuState, action: any) => {
        state.menuSliceStatus = STATUS.SUCCEEDED;
        state.menuItemsStatus = STATUS.SUCCEEDED;
        state.menuItemsData = action.payload;
      },
    );
    builder.addCase(
      requestMenuItems.rejected,
      (state: IMenuState, action: any) => {
        state.menuError = action.payload;
        state.menuSliceStatus = STATUS.FAILED;
        state.menuItemsStatus = STATUS.FAILED;
      },
    );
    // End Menu Items ---
  },
});

// Menu Actions
export const { resetMenu, clearMenuError } = menu_slice.actions;

// Menu Selectors
export const selectMenuSliceStatus = (state: RootState) =>
  state.menu.menuSliceStatus;

export const selectMenuError = (state: RootState) => state.menu.menuError;

export const selectMenuCategoriesData = (state: RootState) =>
  state.menu.menuCategoriesData;
export const selectMenuCategoriesStatus = (state: RootState) =>
  state.menu.menuCategoriesStatus;

export const selectMenuSubcategoriesData = (state: RootState) =>
  state.menu.menuSubcategoriesData;
export const selectMenuSubcategoriesStatus = (state: RootState) =>
  state.menu.menuSubcategoriesStatus;

export const selectMenuItemsData = (state: RootState) =>
  state.menu.menuItemsData;
export const selectMenuItemsStatus = (state: RootState) =>
  state.menu.menuItemsStatus;

export default menu_slice;
