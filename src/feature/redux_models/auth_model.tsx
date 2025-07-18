/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IAuthState {
  authSliceStatus: string | undefined;

  // Auth Error
  authenticationError: IAuthError | undefined;

  // Login data
  authenticationLoginData: IAuthenticationLoginDataResponseBody | undefined;
  authenticationLoginStatus: string | undefined;
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
  email: string | undefined;
  password: string | undefined;
  rememberMe: boolean;
  grantType: string | undefined;
  mobileToken: string | undefined;
}

// Auth Login Data Response Body ---
export interface IAuthenticationLoginDataResponseBody {
  status: boolean | undefined;
  message: string | undefined;
  errors: string;
  accessToken?: string;
  refreshToken?: string;
}
// End Auth Login Data Body ---
