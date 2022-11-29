import { useFonts } from 'expo-font';
import { getAuth } from 'firebase/auth';
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

  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    console.log(user);
  } else {
    // alert('logout');
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DarkThemeProvider>
          <Loader />
          <RouteStack />
        </DarkThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
