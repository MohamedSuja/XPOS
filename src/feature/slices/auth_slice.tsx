import IAuthState from '../redux_models/auth_model';
import {
  requestAuthenticateLoginData,
  requestAuthenticateLogoutData,
} from '../thunks/auth_thunks';
import { STATUS } from '../services/status_constants';
import { removeAccessToken, setAccessToken } from '../services/api';
import { RootState } from '../rootReducer';
import { createSlice } from '@reduxjs/toolkit';
import { requestRegisterDevice } from '../services/api_calls/auth_service';
import { ErrorFlash } from '@/utils/FlashMessage';

const DEFAULT_STATE: IAuthState = {
  authSliceStatus: undefined,

  // Error
  authenticationError: undefined,

  // Auth Login Data
  authenticationLoginStatus: undefined,
  authenticationLogoutStatus: undefined,

  // user data
  id: undefined,
  userName: undefined,
  address: undefined,
  image: undefined,
  contactNo: undefined,
  token: undefined,
};

const INITIAL_STATE: IAuthState = {
  ...DEFAULT_STATE,
};

const auth_slice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    resetAuth: () => {
      return DEFAULT_STATE;
    },
  },
  extraReducers: (builder: any) => {
    // Start Authenticate Login ---
    builder.addCase(
      requestAuthenticateLoginData.pending,
      (state: IAuthState) => {
        state.authSliceStatus = STATUS.LOADING;
        state.authenticationLoginStatus = STATUS.LOADING;
      },
    );
    builder.addCase(
      requestAuthenticateLoginData.fulfilled,
      (state: IAuthState, action: any) => {
        setAccessToken(action.payload.data.token);

        state.authSliceStatus = STATUS.SUCCEEDED;
        state.authenticationLoginStatus = STATUS.SUCCEEDED;
        state.id = action.payload.data?.branch?.id;
        state.userName = action.payload.data?.branch?.name;
        state.address =
          action.payload.data?.branch?.address_line_1 +
          ' ' +
          action.payload.data?.branch?.address_line_2;
        state.image = action.payload.data?.user?.image;
        state.token = action.payload.data?.token;
        state.contactNo = action.payload.data?.user?.contact;
        requestRegisterDevice();
      },
    );
    builder.addCase(
      requestAuthenticateLoginData.rejected,
      (state: IAuthState, action: any) => {
        state.authenticationError = action.payload;
        state.authSliceStatus = STATUS.FAILED;
        state.authenticationLoginStatus = STATUS.FAILED;
        let errorMessage = '';

        if (action?.payload?.status == 422) {
          let alertDescription = '';
          const errors = action?.payload?.errors;

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
          errorMessage = action?.payload?.message;
        }
        ErrorFlash(errorMessage || 'Something went wrong!');
      },
    );
    // End Authenticate Login ---

    // Start Authenticate Logout ---
    builder.addCase(
      requestAuthenticateLogoutData.pending,
      (state: IAuthState) => {
        state.authSliceStatus = STATUS.LOADING;
        state.authenticationLogoutStatus = STATUS.LOADING;
      },
    );
    builder.addCase(
      requestAuthenticateLogoutData.fulfilled,
      (state: IAuthState, action: any) => {
        removeAccessToken();
        state.authSliceStatus = STATUS.SUCCEEDED;
        state.authenticationLogoutStatus = STATUS.SUCCEEDED;
        state.authenticationLoginStatus = STATUS.FAILED;
        state.id = undefined;
        state.userName = undefined;
        state.address = undefined;
        state.image = undefined;
        state.token = undefined;
      },
    );
    builder.addCase(
      requestAuthenticateLogoutData.rejected,
      (state: IAuthState, action: any) => {
        state.authenticationError = action.payload;
        state.authSliceStatus = STATUS.FAILED;
        state.authenticationLogoutStatus = STATUS.FAILED;
        let errorMessage = '';

        if (action?.payload?.status == 422) {
          let alertDescription = '';
          const errors = action?.payload?.errors;

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
          errorMessage = action?.payload?.message;
        }
        ErrorFlash(errorMessage || 'Something went wrong!');
      },
    );
    // End Authenticate Logout ---
  },
});
// Reset Auth
export const { resetAuth } = auth_slice.actions;

export const selectAuthSliceStatus = (state: RootState) =>
  state.auth.authSliceStatus;

export const selectAuthenticationError = (state: RootState) =>
  state.auth.authenticationError;

// Auth Login Data Selectors ---
export const selectAuthenticationLoginData = (state: RootState) =>
  state.auth.token;
export const selectAuthenticationLoginDataStatus = (state: RootState) =>
  state.auth.authenticationLoginStatus;
// End Auth Login Data Selectors ---

export const selectAuthenticationLogoutDataStatus = (state: RootState) =>
  state.auth.authenticationLogoutStatus;

export default auth_slice;
