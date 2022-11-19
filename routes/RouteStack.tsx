import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import Login from '../containers/Login';
import Main from '../containers/Main';
import Signup from '../containers/Signup';
import TabNav from '../containers/TabNav';
import { darkTheme, lightTheme } from '../styles/theme';

const Stack = createNativeStackNavigator();
const RouteStack = () => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );

  const themeMode = !isDarkThemeEnable ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Home" component={TabNav} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default RouteStack;
