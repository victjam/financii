
import { Dimensions, FlatList, View, Pressable, ScrollView } from 'react-native'
import { COLORS, Text, Div, WrappedBox, PrimaryButton, DivIcon, TextButton } from '../styles/global';
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import AutoScroll from "@homielab/react-native-auto-scroll";


const cards = [
  { title: "Mastercard" },
  { title: "Visa" },
  { title: "Amex" },
  { title: "Ahorros" }
]

const width = Dimensions.get("window").width
const CONTAINER = width * (cards.length > 1 ? 0.92 : 1)
const onPressFunction = (id: string) => {
  alert(id)
}
const Home = () => {
  const icons = [
    {
      id: '0',
      icon: 'wallet-outline',
    },
    {
      id: '1',
      icon: 'send-outline',
    },
  ];
  const transactions = [
    {
      id: '0',
      title: 'Pago a lizbe',
      price: '$500',
      icon: 'wallet-outline',
      date: 'Sept 19, 2023'
    },
    {
      id: '1',
      title: 'Pago a Victor',
      price: '$100',
      icon: 'wallet-outline',
      date: 'Sept 19, 2023'
    },
    {
      id: '2',
      title: 'Pago a Carlos',
      price: '$50',
      icon: 'wallet-outline',
      date: 'Sept 19, 2023'
    },
    {
      id: '3',
      title: 'Pago a Emma',
      price: '$50000',
      icon: 'wallet-outline',
      date: 'Sept 19, 2023'
    },
  ];
  const darkThemeEnabled = useSelector((state: any) => state.theme.preferences.darkThemeEnabled);
  const selectedColor = !darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK;
  const selectedColorBg = darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK;

  const SPACE = 5;
  return (
    <ScrollView>

      <WrappedBox paddingLeft='0' paddingTop='0' paddingRight='0'>
        <Div backgroundColor={selectedColorBg} paddingTop='90' paddingLeft='10' paddingRight='10'>
          <DivIcon marginBottom='20' backgroundColor={selectedColor} borderRadius='50' align='center' paddingLeft='10' paddingRight='10'>
            <Ionicons name='person-outline' color={selectedColorBg} size={26} />
          </DivIcon>
          <Text fontSize='25' align="left" fontWeight="bold" color={selectedColor} >Buenos dias, Victor</Text>
          <Text fontSize='20' paddingTop='10' color={selectedColor}>$65.988.00</Text>
          <Text paddingTop='10' color={selectedColor}>Tu Balance es +0.8% que es el mes pasado.</Text>
          <FlatList

            horizontal={true}
            data={icons}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{ marginHorizontal: SPACE, paddingHorizontal: SPACE }}>
                  <Pressable onPress={() => onPressFunction('Login')}>
                    <DivIcon marginTop='30' marginBottom='20' backgroundColor={selectedColor} borderRadius='50' align='center' paddingLeft='10' paddingRight='10'>
                      <Ionicons name={item.icon} color={selectedColorBg} size={26} />
                    </DivIcon>
                  </Pressable>
                </View>
              )
            }}
          />

        </Div>
        <WrappedBox paddingTop='20'>
          <Text fontWeight='500'>Actividad Reciente</Text>
          {/* refactor this */}
          <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Div backgroundColor={selectedColorBg} borderRadius='5' marginBottom='20' width='100%' paddingLeft='10' paddingTop='10' paddingBottom='10' paddingRight='10' >
                <Text color={selectedColor}
                  align='center'
                  paddingBottom='5'>Tranferencia a Sabrina</Text>
                <Text color={selectedColor} align='center' fontSize='16' paddingBottom='10'>$4,500</Text>
                <PrimaryButton backgroundColor={selectedColor} borderRadius='50' height='35px' width='100%' onPress={() => onPressFunction('Login')}>
                  <TextButton color={selectedColorBg} fontWeight="bold">Ver detalle</TextButton>
                </PrimaryButton>
              </Div>
              <Div backgroundColor={selectedColorBg} borderRadius='5' marginBottom='20' width='100%' paddingLeft='10' paddingTop='10' paddingBottom='10' paddingRight='10' >
                <Text color={selectedColor}
                  align='center'
                  paddingBottom='5'>Tranferencia a Sabrina</Text>
                <Text color={selectedColor} align='center' fontSize='16' paddingBottom='10'>$4,500</Text>
                <PrimaryButton backgroundColor={selectedColor} borderRadius='50' height='35px' width='100%' onPress={() => onPressFunction('Login')}>
                  <TextButton color={selectedColorBg} fontWeight="bold">Ver detalle</TextButton>
                </PrimaryButton>
              </Div>
            </View>
            <Div backgroundColor={selectedColorBg} borderRadius='5' width='50%' paddingLeft='10' paddingTop='10' paddingBottom='10' paddingRight='10'>
              <Text color={selectedColor}>Ultima Factura divida con:</Text>
            </Div>
          </View>
          <Div marginTop='40'>
            <ScrollView horizontal={true}>
              <AutoScroll style={{ width: '100%' }}>
                <Div style={{ display: 'flex', flexDirection: 'row' }}>
                  {transactions.map((item) => (
                    <Pressable onPress={() => onPressFunction(item.id)}>
                      <Div style={{ marginLeft: 20, marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <DivIcon backgroundColor={selectedColorBg} borderRadius='50' align='center' paddingLeft='10' paddingRight='10'>
                            <Ionicons name={item.icon} color={selectedColor} size={20} />
                          </DivIcon>
                          <Div marginLeft='20'>
                            <Text>{item.title}</Text>
                            <Text color={COLORS.DARKGRAY}>{item.date}</Text>
                          </Div>
                        </Div>

                        <Div>
                          <Text fontWeight='500'>-{item.price}</Text>
                        </Div>
                      </Div>
                    </Pressable>
                  ))}
                </Div>
              </AutoScroll>
            </ScrollView>
            <Text fontWeight='500'>Ultimas Transacciones</Text>
            {/* refactor this */}

          </Div>
        </WrappedBox>
      </WrappedBox >
    </ScrollView >
  )
}



export default Home;