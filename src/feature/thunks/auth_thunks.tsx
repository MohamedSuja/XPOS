import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAuthenticationLoginDataRequestBody,
  IAuthError,
} from '../redux_models/auth_model';
import { requestAuthenticateLoginDataService } from '../services/api_calls/auth_service';
import { AxiosError } from 'axios';

// Auth Login Data Thunks -----
export const requestAuthenticateLoginData = createAsyncThunk(
  '@/auth/authenticate/login',
  // if you type your function argument here
  async (body: IAuthenticationLoginDataRequestBody, { rejectWithValue }) => {
    try {
      const response = await requestAuthenticateLoginDataService(body);
      return response?.data;
    } catch (err: any) {
      const error: AxiosError<IAuthError> = err; // cast the error for access
      if (!error) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error);
    }
  },
);
// End LogIn Data Thunks -----
