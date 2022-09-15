import RouteStack from './routes/RouteStack'
import { Provider as ReduxProvider } from "react-redux";
import DarkThemeProvider from "./provider/DarkThemeProvider";
import store from "./store/theme/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <DarkThemeProvider>
        <RouteStack />
      </DarkThemeProvider>
    </ReduxProvider>
  );
}
