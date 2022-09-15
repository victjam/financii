import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../containers/Home";
import Login from "../containers/Login";
import { ThemeProvider } from 'styled-components/native';
import Signup from "../containers/Signup";
import Main from "../containers/Main";
import TabNav from "../containers/TabNav";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from '../styles/theme';

const Stack = createNativeStackNavigator()
const RouteStack = () => {
  const darkThemeEnabled = useSelector((state: any) => state.theme.preferences.darkThemeEnabled);
  const themeMode = !darkThemeEnabled ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Home" component={TabNav} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator >
      </NavigationContainer>
    </ThemeProvider>

  )
}



export default RouteStack;