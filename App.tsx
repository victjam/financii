import RouteStack from './routes/RouteStack'
import { Provider as ReduxProvider } from "react-redux";
import DarkThemeProvider from "./provider/DarkThemeProvider";
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
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
