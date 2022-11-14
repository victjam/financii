import RouteStack from './routes/RouteStack'
import { View } from 'react-native';
import { Provider as ReduxProvider } from "react-redux";
import DarkThemeProvider from "./provider/DarkThemeProvider";
import { useEffect, useCallback } from 'react';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'Rounded-Bold': require('./assets/fonts/MPLUSRounded1c-Bold.ttf'),
  //   'Rounded-Regular': require('./assets/fonts/MPLUSRounded1c-Regular.ttf'),
  //   'Rounded-Medium': require('./assets/fonts/MPLUSRounded1c-Medium.ttf'),
  // });


  // const onLayoutRootView = useCallback(async () => {
  //   // if (fontsLoaded) {
  //   //   await SplashScreen.hideAsync();
  //   // }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <ReduxProvider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <DarkThemeProvider>
          <RouteStack />
        </DarkThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
