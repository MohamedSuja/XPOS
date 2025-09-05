import IAuthState from '../redux_models/auth_model';
import {
  requestAuthenticateLoginData,
  requestAuthenticateLogoutData,
} from '../thunks/auth_thunks';
import { STATUS } from '../services/status_constants';
import { removeAccessToken, setAccessToken } from '../services/api';
import { RootState } from '../rootReducer';
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_STATE: IAuthState = {
  authSliceStatus: undefined,

  // Error
  authenticationError: undefined,

  // Auth Login Data
  authenticationLoginData: undefined,
  authenticationLoginStatus: undefined,

  authenticationLogoutData: undefined,
  authenticationLogoutStatus: undefined,
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
        state.authenticationLoginData = action.payload;
        state.authSliceStatus = STATUS.SUCCEEDED;
        state.authenticationLoginStatus = STATUS.SUCCEEDED;
      },
    );
    builder.addCase(
      requestAuthenticateLoginData.rejected,
      (state: IAuthState, action: any) => {
        if (action?.payload?.status === 500) {
          // ErrorFlash(action?.payload?.error);
        } else if (action?.payload?.status === 400) {
          // ErrorFlash(action?.payload?.errors[0]);
        } else if (action?.error) {
          // ErrorFlash(action?.payload?.error);
        }
        state.authenticationError = action.payload;
        state.authSliceStatus = STATUS.FAILED;
        state.authenticationLoginStatus = STATUS.FAILED;
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
        state.authenticationLogoutData = undefined;
        state.authSliceStatus = STATUS.SUCCEEDED;
        state.authenticationLogoutStatus = STATUS.SUCCEEDED;
      },
    );
    builder.addCase(
      requestAuthenticateLogoutData.rejected,
      (state: IAuthState, action: any) => {
        if (action?.payload?.status === 500) {
          // ErrorFlash(action?.payload?.error);
        } else if (action?.payload?.status === 400) {
          // ErrorFlash(action?.payload?.errors[0]);
        } else if (action?.error) {
          // ErrorFlash(action?.payload?.error);
        }
        state.authenticationError = action.payload;
        state.authSliceStatus = STATUS.FAILED;
        state.authenticationLogoutStatus = STATUS.FAILED;
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
  state.auth.authenticationLoginData;
export const selectAuthenticationLoginDataStatus = (state: RootState) =>
  state.auth.authenticationLoginStatus;
// End Auth Login Data Selectors ---

export const selectAuthenticationLogoutData = (state: RootState) =>
  state.auth.authenticationLogoutData;
export const selectAuthenticationLogoutDataStatus = (state: RootState) =>
  state.auth.authenticationLogoutStatus;

export default auth_slice;
