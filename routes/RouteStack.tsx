import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import CardList from '../components/Cards/CardList';
import AddCategory from '../components/categories/AddCategory';
import CategoriesByUser from '../components/categories/CategoriesByUser';
import CategoryList from '../components/categories/CategoryList';
import IconList from '../components/categories/IconList';
import AddTransaction from '../components/transactions/AddTransaction';
import TransactionDetail from '../components/transactions/TransactionDetail';
import Login from '../containers/Login';
import Main from '../containers/Main';
import Signup from '../containers/Signup';
import TabNav from '../containers/TabNav';
import UpdateUser from '../containers/UpdateUser';
import { COLORS } from '../styles/global';
import { darkTheme, lightTheme } from '../styles/theme';

const Stack = createNativeStackNavigator();
const RouteStack = () => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const user = useSelector((state: any) => state.user.user);
  const selectedColor = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK_TEXT;
  const backgroundColor = !isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;

  const options = (navigation: any) => {
    return (
      <Pressable onPressIn={() => navigation.goBack()}>
        <MaterialIcons name="close" size={30} color={selectedColor} />
      </Pressable>
    );
  };
  const themeMode = !isDarkThemeEnable ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name={user ? 'Home' : 'Main'}
            component={user ? TabNav : Main}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="UpdateUser" component={UpdateUser} />

          <Stack.Screen
            name="CardList"
            component={CardList}
            options={({ navigation }) => ({
              headerShown: true,
              presentation: 'modal',
              headerBackVisible: false,
              animationTypeForReplace: 'push',
              headerTitle: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: backgroundColor,
              },
              headerRight: () => {
                return options(navigation);
              },
            })}
          />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransaction}
            options={({ navigation }) => ({
              headerShown: true,
              headerBackVisible: false,
              animationTypeForReplace: 'push',
              headerTitle: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: backgroundColor,
              },
              headerRight: () => {
                return options(navigation);
              },
            })}
          />
          <Stack.Screen
            name="CategoryList"
            component={CategoryList}
            options={({ navigation }) => ({
              headerShown: true,
              headerBackVisible: false,
              animationTypeForReplace: 'push',
              headerTitle: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: backgroundColor,
              },
              headerRight: () => {
                return options(navigation);
              },
            })}
          />
          <Stack.Screen
            name="AddCategory"
            component={AddCategory}
            options={({ navigation }) => ({
              headerShown: true,
              headerBackVisible: false,
              animationTypeForReplace: 'push',
              headerTitle: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: backgroundColor,
              },
              headerRight: () => {
                return options(navigation);
              },
            })}
          />
          <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetail}
            options={({ navigation }) => ({
              headerShown: true,
              headerBackVisible: false,
              animationTypeForReplace: 'push',
              headerTitle: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: backgroundColor,
              },
              headerRight: () => {
                return options(navigation);
              },
            })}
          />
          <Stack.Screen
            name="CategoriesByUser"
            component={CategoriesByUser}
            options={({ navigation }) => ({
              headerShown: true,
              headerBackVisible: false,
              animationTypeForReplace: 'push',
              headerTitle: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: backgroundColor,
              },
              headerRight: () => {
                return options(navigation);
              },
            })}
          />
          <Stack.Screen
            name="IconList"
            component={IconList}
            options={({ navigation }) => ({
              headerShown: true,
              headerBackVisible: false,
              animationTypeForReplace: 'push',
              headerTitle: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: backgroundColor,
              },
              headerRight: () => {
                return options(navigation);
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default RouteStack;
