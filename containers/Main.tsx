import { Blur, Canvas, Circle, Fill } from '@shopify/react-native-skia';
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
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

const Main = ({ navigation }: any) => {
  const { width, height } = Dimensions.get('window');
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const selectedColorBg = isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE;
  const cx = width - 350;
  const cy = height - 750;
  const ax = width - 50;
  const ay = width - 10;
  return (
    <>
      <Canvas style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <Blur blur={50} />
        <Fill color={selectedColorBg} />
        <Circle cx={cx} cy={cy} r={150} color="#76E0DA" />
        <Circle cx={ax} cy={ay} r={150} color="#1F5587" />
      </Canvas>
      <Container backgroundColor="transparent">
        <WrappedBox backgroundColor="transparent">
          <View style={global.centerElement}>
            <Image
              style={global.imagePersonal}
              source={require('../assets/finance.png')}
            />
          </View>
          <SText fontWeight="bold">ALPHA VERSION</SText>
          <LGText fontWeight="bold">Bienvenidos a</LGText>
          <XLGText fontWeight="bold">Financii</XLGText>
          <Div backgroundColor="transparent" paddingTop={10}>
            <Text>
              Una app para gestionar tus gatos y metas de la forma mas segura y
              simple posible.
            </Text>
          </Div>
          <View />
          <Div backgroundColor="transparent" paddingTop={30}>
            <PrimaryButton onPress={() => navigation.navigate('Signup')}>
              <TextButton fontWeight="bold">Crear cuenta</TextButton>
            </PrimaryButton>
          </Div>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Login')}>
            <Text paddingTop={10}>
              Ya tienes una cuenta?, inicia
              <Text fontWeight="bold"> aqui.</Text>
            </Text>
          </TouchableWithoutFeedback>
        </WrappedBox>
      </Container>
    </>
  );
};

export default Main;
