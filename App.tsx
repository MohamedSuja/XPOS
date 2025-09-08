import React, { useEffect } from 'react';
import AppRoutes from '@/navigation/Routes';
import { ThemeProvider } from '@/utils/ThemeContext';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from '@/feature/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingProvider from '@/CustomProviders/LoadingProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
import { NotificationProvider } from '@/CustomProviders/NotificationProvider';

const App = () => {
  useEffect(() => {
    const init = async () => {
      console.log('Execute function');
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <ThemeProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <LoadingProvider>
                <NotificationProvider>
                  <AppRoutes />
                </NotificationProvider>
              </LoadingProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </Provider>
      </PersistGate>
    </ThemeProvider>
  );
};

export default App;
