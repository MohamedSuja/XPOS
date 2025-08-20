declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL?: string;
    GOOGLE_MAP_API_KEY?: string;
    PUSHER_API_KEY: string;
    PUSHER_CLUSTER: string;
    PUSHER_END_POINT: string;
    GENIUE_WEBHOOK: string;
    GENIUE_API_KEY: string;
    BACKGROUND_LOCATION_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
