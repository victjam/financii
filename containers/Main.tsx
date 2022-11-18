import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { auth, getUserDocument } from '../firebase';
import {
  COLORS,
  Container,
  Div,
  global,
  LGText,
  PrimaryButton,
  SText,
  Text,
  TextButton,
  WrappedBox,
  XLGText,
} from '../styles/global';

import { useSelector } from 'react-redux';
const Main = ({ navigation }: any) => {
  const darkThemeEnabled = useSelector(
    (state: any) => state.theme.preferences.darkThemeEnabled,
  );
  const [loading, setLoading] = useState(false);
  const activeLoader = () => {
    if (loading) {
      if (darkThemeEnabled) {
        return (
          <View
            style={{
              height: '110%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 99,
              backgroundColor: darkThemeEnabled ? COLORS.BLACK : COLORS.WHITE,
            }}>
            <LottieView
              source={require('../assets/loader_volumen_white.json')}
              style={{ height: 100, width: 100 }}
              autoPlay
            />
          </View>
        );
      }
      return (
        <LottieView
          source={require('../assets/loader_volumen_black.json')}
          style={{ height: 100, width: 100 }}
          autoPlay
        />
      );
    }
  };

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, user => {
      if (user) {
        const saveUserInformation = async () => {
          setLoading(true);
          const userFinancii = await getUserDocument(user.uid);
          await AsyncStorage.setItem('user', JSON.stringify(userFinancii));
          navigation.navigate('Home');
          setLoading(false);
        };
        saveUserInformation();
      } else {
        const removeUserInformation = async () => {
          setLoading(true);
          await AsyncStorage.removeItem('user');
          setLoading(false);
        };
        removeUserInformation();
        navigation.navigate('Main');
      }
    });
    return unSubscribeAuth;
  }, [navigation]);
  return (
    <Container>
      {activeLoader()}
      <WrappedBox>
        <View style={global.centerElement}>
          <Image
            style={global.imagePersonal}
            source={require('../assets/finance.png')}
          />
        </View>
        <SText fontWeight="bold">ALPHA VERSION</SText>
        <LGText fontWeight="bold">Bienvenidos a</LGText>
        <XLGText fontWeight="bold">Financii</XLGText>
        <Div paddingTop={10}>
          <Text>
            Una app para gestionar tus gatos y metas de la forma mas segura y
            simple posible.
          </Text>
        </Div>
        <View />
        <Div paddingTop={30}>
          <PrimaryButton onPress={() => navigation.navigate('Signup')}>
            <TextButton fontWeight="bold">Crear cuenta</TextButton>
          </PrimaryButton>
        </Div>
        {/* onPress={() => dispatch({ type: TOGGLE_DARKTHEME })}*/}
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <Text paddingTop={10}>
            Ya tienes una cuenta?, inicia
            <Text fontWeight="bold"> aqui.</Text>
          </Text>
        </TouchableWithoutFeedback>
      </WrappedBox>
    </Container>
  );
};

export default Main;
