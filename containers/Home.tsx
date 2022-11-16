
import { FlatList, View, Pressable, ScrollView, TouchableOpacity, Platform, Alert, Modal, Animated, Vibration } from 'react-native'
import { useState } from 'react'
import { COLORS, Text, Div, WrappedBox, PrimaryButton, DivIcon, TextButton, GradientDiv } from '../styles/global';
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import Marquee from "../components/Marquee";
import Constants from 'expo-constants';
import TransactionList from '../components/transactions/TransactionList';
import DebitKeyboard from '../components/DebitKeyboard';

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
      title: 'Arriendo',
      price: '-$500',
      color: COLORS.DANGER,
      icon: 'wallet-outline',
      date: 'Sept 19, 2023'
    },
    {
      id: '1',
      title: 'Pago a Victor',
      price: '$100',
      color: COLORS.GREEN,
      icon: 'wallet-outline',
      date: 'Sept 19, 2023'
    },
    {
      id: '2',
      title: 'Pago a Carlos',
      price: '$50',
      color: COLORS.GREEN,
      icon: 'wallet-outline',
      date: 'Sept 19, 2023'
    },
    {
      id: '4',
      title: 'Colegio Emma',
      price: '-$50000',
      color: COLORS.DANGER,
      icon: 'wallet-outline',
      date: 'Sept 19, 2023'
    }
  ];




  const renderTransactionList = (OS: string) => {
    if (OS === 'ios') {
      return (<Marquee data={transactions} />)
    } else {
      return (<TransactionList transactions={transactions} />)
    }
  }
  const darkThemeEnabled = useSelector((state: any) => state.theme.preferences.darkThemeEnabled);
  const selectedColor = !darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK;
  const selectedColorBg = darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK;

  const SPACE = 5;
  const [modalVisible, setModalVisible] = useState(false);





  return (
    <ScrollView>
      <WrappedBox paddingLeft={0.1} paddingTop={0.1} paddingRight={0.1}>
        <GradientDiv color={COLORS.GRADIENT_BLUE} borderBottomLeftRadius={20} borderBottomRightRadius={20} paddingTop={Constants.statusBarHeight + 20} paddingLeft={10} paddingRight={10}>
          <DivIcon marginBottom={20} backgroundColor={selectedColor} style={{ borderRadius: 50 }} align='center' paddingLeft={10} paddingRight={10}>
            <Ionicons name='person-outline' color={selectedColorBg} size={26} />
          </DivIcon>
          <Text fontSize={25} align="left" fontWeight="bold" color={COLORS.WHITE} >Buenos dias, Victor</Text>
          <Text fontSize={20} paddingTop={10} color={COLORS.WHITE}>$65.988.00</Text>
          <Text paddingTop={10} color={COLORS.WHITE}>Tu Balance es <Text color={COLORS.GREEN} fontWeight='bold'>+0.8</Text> que es el mes pasado.</Text>
          <FlatList

            horizontal={true}
            data={icons}
            keyExtractor={item => item.id}
            renderItem={({ item }: any) => {
              return (
                <View style={{ marginHorizontal: SPACE, paddingHorizontal: SPACE }}>
                  <Pressable onPressIn={()=> setModalVisible(true)}>
                    <DivIcon marginTop={30} marginBottom={20} backgroundColor={selectedColor} style={{ borderRadius: 50 }} align='center' paddingLeft={10} paddingRight={10}>
                      <Ionicons name={item.icon} color={selectedColorBg} size={26} />
                    </DivIcon>
                  </Pressable>
                </View>
              )
            }}
          />

        </GradientDiv>



        <WrappedBox paddingTop={20}>
          <Text fontWeight='bold'>Actividad Reciente Compartida</Text>
          {/* refactor this */}
          <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Div height="140px" elevation={8} shadowOpacity={0.7} shadowColor={COLORS.DANGER} borderRadius={5} backgroundColor={selectedColorBg} marginBottom={20} width='100%'>
                <GradientDiv color={COLORS.GRADIENT_DANGER} startDirection={{ x: 0, y: 0 }} endDirection={{ x: 1, y: 0 }} paddingLeft={5} paddingRight={5} borderRadius={5} paddingBottom={10} height="140px">
                  <Text color={COLORS.WHITE}
                    align='center'
                    paddingBottom={5}>Tranferencia a Sabrina</Text>
                  <Text color={COLORS.RED} align='center' fontWeight='bold' paddingBottom={10}>$-4,500</Text>
                  <PrimaryButton backgroundColor={selectedColor} style={{ borderRadius: 50 }} height="35px" width='100%' onPress={() =>alert('detal')}>
                    <TextButton color={selectedColorBg} fontWeight="bold">Ver detalle</TextButton>
                  </PrimaryButton>
                </GradientDiv>
              </Div>
              <Div height="140px" elevation={8} shadowOpacity={0.7} shadowColor={COLORS.SUCCESS} borderRadius={5} backgroundColor={selectedColorBg} marginBottom={20} width='100%'>
                <GradientDiv color={COLORS.GRADIENT_SUCCESS} startDirection={{ x: 0, y: 0 }} endDirection={{ x: 1, y: 0 }} paddingLeft={5} paddingRight={5} borderRadius={5} paddingBottom={10} height="140px">
                  <Text color={COLORS.WHITE}
                    align='center'
                    paddingBottom={5}>Ingreso pago a Sabrina</Text>
                  <Text color={COLORS.GREEN} align='center' fontWeight='bold' paddingBottom={10}>$+2,500</Text>
                  <PrimaryButton backgroundColor={selectedColor} style={{ borderRadius: 50 }} height="35px" width='100%' onPress={() => alert('detal')}>
                    <TextButton color={selectedColorBg} fontWeight="bold">Ver detalle</TextButton>
                  </PrimaryButton>
                </GradientDiv>
              </Div>
            </View>
            <Div backgroundColor={selectedColorBg} borderRadius={5} width='50%' paddingLeft={10} paddingTop={10} paddingBottom={10} paddingRight={10}>
              <Text color={selectedColor}>Ultima Factura divida con:</Text>
            </Div>
          </View>
          <Div marginTop={40}>
            <Text fontWeight='bold'>Ultimas Transacciones</Text>
            {renderTransactionList(Platform.OS)}
          </Div>
        </WrappedBox>
      </WrappedBox >
      <DebitKeyboard modalVisible={modalVisible} handleModal={() => setModalVisible(false)}/>
      
    </ScrollView >
    
  )
}


export default Home;