import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import Main from "../containers/Main";
import TabNav from "../containers/TabNav";

const Stack = createNativeStackNavigator()
const RouteStack = () => {
  return (
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

  )
}



export default RouteStack;