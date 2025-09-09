/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IAuthState {
  authSliceStatus: string | undefined;

  // Auth Error
  authenticationError: IAuthError | undefined;
  // Login data
  authenticationLoginStatus: string | undefined;
  // Logout data
  authenticationLogoutStatus: string | undefined;

  // user data
  id: number | undefined;
  userName: string | undefined;
  address: string | undefined;
  image: string | undefined;
  token: string | undefined;
}

// Auth Data Error
export interface IAuthError {
  status: boolean | undefined;
  message: string | undefined;
  errors: number | undefined;
  errorDescription: string | undefined;
}

// Auth Login Data Request Body ---
export interface IAuthenticationLoginDataRequestBody {
  user_name: string | undefined;
  password: string | undefined;
}

// Auth Login Data Response Body ---
export interface IAuthenticationLoginDataResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}

// Auth Logout Data Response Body ---
export interface IAuthenticationLogoutDataResponseBody {
  success: boolean | undefined;
  message: string | undefined;
  errors: any[];
  data: any;
}
// End Auth Logout Data Body ---

// End Auth Login Data Body ---
