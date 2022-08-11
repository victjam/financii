import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '../styles/global';
import Home from './Home';
import Profile from './Profile';
import Transactions from './Transactions';
import * as Animatable from 'react-native-animatable';
import { useEffect, useRef } from 'react';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

//type this
const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef: any = useRef(null)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={1}
    >
      <Animatable.View ref={viewRef} style={styles.container} animation="zoomIn" duration={200}>
        <Ionicons name={focused ? item.activeIcon : item.inactiveIcon} color={COLORS.black} size={24} />
      </Animatable.View>
    </TouchableOpacity>
  )
}
const TabArr = [
  {
    route: 'Home', label: 'Inicio', activeIcon: 'home', inactiveIcon: 'home-outline', component: Home
  },
  {
    route: 'Transactions', label: 'Transacciones', activeIcon: 'card', inactiveIcon: 'card-outline', component: Transactions
  },
  {
    route: 'Profile', label: 'Perfil', activeIcon: 'person-circle', inactiveIcon: 'person-circle-outline', component: Profile
  }
]

const Tab = createBottomTabNavigator()
const TabNav = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
      }
    }}
  >
    {TabArr.map((item: any, index: number) => {
      return (
        <Tab.Screen key={index} name={item.route} component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarLabel: item.label,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? item.activeIcon : item.inactiveIcon} color={color} size={24} />
            ),
            tabBarButton: (props) => <TabButton {...props} item={item} />
          }} />
      )
    })}
  </Tab.Navigator>
)

export default TabNav