import React from 'react';
import AppRoutes from '@/navigation/Routes';
import { ThemeProvider } from '@/utils/ThemeContext';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from '@/feature/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingProvider from '@/CustomProviders/LoadingProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <ThemeProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <LoadingProvider>
                <AppRoutes />
              </LoadingProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </Provider>
      </PersistGate>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
