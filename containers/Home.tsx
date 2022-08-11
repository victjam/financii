
import { useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native'
import { global, FONTS, COLORS } from '../styles/global';



const Home = () => {

  return (<View style={[styles.middleBox]}>
    <Text style={styles.title}>Buenos dias,</Text>
    <Text style={styles.name}>Victor</Text>
    <View style={styles.middleBox}></View>
  </View>
  )
}



const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 30,
  },
  card: {
    marginTop: 35,
    height: 200,
    borderRadius: 20,
    width: "100%",
  },
  middleBox: {
    paddingTop: 80,
    height: "50%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.darkBlue
  },
  name: {
    paddingTop: 5,
    color: COLORS.white,
    fontSize: FONTS.xs,
  },
  title: {
    fontSize: FONTS.s,
    color: COLORS.white,
    fontWeight: '600'
  }
});



export default Home;