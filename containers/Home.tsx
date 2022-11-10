
import { useEffect } from 'react';
import { StyleSheet, View, Image, SafeAreaView, FlatList, Dimensions } from 'react-native'
import { global, FONTS, COLORS, Container, Text } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';


const cards = [
  { title: "Mastercard" },
  { title: "Visa" },
  { title: "Amex" },
  { title: "Ahorros" }
]

const width = Dimensions.get("window").width
const CONTAINER = width * (cards.length > 1 ? 0.92 : 1)
const Home = () => {

  const SPACE = 5;
  return (<Container>
    <View>
      <Text style={[styles.title, global.initialPadding]}>Buenos dias, Victor</Text>
      <FlatList
        data={cards}
        horizontal
        decelerationRate={0}
        snapToInterval={CONTAINER}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          //CREATE COMPONENT
          return (
            <View style={{ width: CONTAINER }}>
              <View style={{ marginHorizontal: SPACE, paddingHorizontal: SPACE }}>
                <View style={[styles.shawdowBox]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#6083FE', '#5964FE', '#8825E6']}
                    style={[styles.cardBox]}>
                    <View style={styles.cardBoxContainer}>
                      <Text style={styles.cardMainText}>Personal</Text>
                      <View style={styles.cardTitle} >
                        <Image
                          style={styles.icon}
                          source={require("../assets/mastercard.png")}
                        />
                        <Text style={styles.cardMainText}>{item.title}</Text>
                      </View>
                      <Text style={styles.cardMainText}>$3.000.000</Text>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </View>
          )
        }} />

    </View>
  </Container>
  )
}



const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 30,
  },
  icon: {
    height: 30,
    width: 36,

  },
  shawdowBox: {
    height: 200,
    width: "100%",
    marginTop: 30,
    borderRadius: 20,
    shadowColor: "#5964FE",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.5,
    elevation: 5,
  },
  card: {
    marginTop: 35,
    height: 200,
    borderRadius: 20,
    width: "100%",
  },
  cardBox: {
    height: 200,
    borderRadius: 20,
  },
  cardTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardBoxContainer: {
    padding: 10,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between'
  },
  cardMainText: {
    fontSize: FONTS.xs,
    fontWeight: 'bold',
    color: COLORS.WHITE
  },
  name: {
    marginTop: 10,
    fontSize: FONTS.xxs,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  title: {
    fontSize: FONTS.s,
    fontWeight: '600'
  }
});



export default Home;