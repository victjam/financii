import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import Main from "../containers/Main";

const Stack = createNativeStackNavigator()
const RouteStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default RouteStack;