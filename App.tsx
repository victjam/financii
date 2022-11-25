import { useFonts } from 'expo-font';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader';
import DarkThemeProvider from './provider/DarkThemeProvider';
import RouteStack from './routes/RouteStack';
import { persistor, store } from './store';

export default function App() {
  const [fontsLoaded] = useFonts({
    'SF-pro-bold': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
    'SF-pro-semibold': require('./assets/fonts/SF-Pro-Rounded-Semibold.otf'),
    'SF-pro-medium': require('./assets/fonts/SF-Pro-Rounded-Medium.otf'),
  });

  // const onLayoutRootView = useCallback(async () => {
  // if (fontsLoaded) {
  //   await SplashScreen.hideAsync();
  // }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <Loader>
        <PersistGate loading={null} persistor={persistor}>
          <DarkThemeProvider>
            <RouteStack />
          </DarkThemeProvider>
        </PersistGate>
      </Loader>
    </ReduxProvider>
  );
}
