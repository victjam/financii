import RouteStack from './routes/RouteStack';
import { View } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import DarkThemeProvider from './provider/DarkThemeProvider';
import { useEffect, useCallback } from 'react';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'SF-pro-bold': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
    'SF-pro-semibold': require('./assets/fonts/SF-Pro-Rounded-Semibold.otf'),
    'SF-pro-medium': require('./assets/fonts/SF-Pro-Rounded-Medium.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    // if (fontsLoaded) {
    //   await SplashScreen.hideAsync();
    // }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DarkThemeProvider>
          <RouteStack />
        </DarkThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
