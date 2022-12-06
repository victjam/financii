import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../styles/global';
import Home from './Home';
import Profile from './Profile';
import Transactions from './Transactions';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//type this
const TabButton = (props: any) => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );

  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={1}>
      <Ionicons
        name={focused ? item.activeIcon : item.inactiveIcon}
        color={isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK}
        size={24}
      />
    </TouchableOpacity>
  );
};
const TabArr = [
  {
    route: 'HomeSpace',
    label: 'Inicio',
    activeIcon: 'home',
    inactiveIcon: 'home-outline',
    component: Home,
  },
  {
    route: 'Transactions',
    label: 'Transacciones',
    activeIcon: 'card',
    inactiveIcon: 'card-outline',
    component: Transactions,
  },
  {
    route: 'Profile',
    label: 'Perfil',
    activeIcon: 'person-circle',
    inactiveIcon: 'person-circle-outline',
    component: Profile,
  },
];

const Tab = createBottomTabNavigator();
const TabNav = () => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE,
          borderTopWidth: 0,
        },
      }}>
      {TabArr.map((item: any, index: number) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarLabel: item.label,
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? item.activeIcon : item.inactiveIcon}
                  color={!isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK}
                  size={24}
                />
              ),
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNav;
