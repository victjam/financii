import { Ionicons } from '@expo/vector-icons';
import { Blur, Canvas, Circle, Fill } from '@shopify/react-native-skia';
import Constants from 'expo-constants';
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import TransactionList from '../components/transactions/TransactionList';
import {
  COLORS,
  Div,
  DivIcon,
  GradientDiv,
  PrimaryButton,
  Text,
  TextButton,
  WrappedBox,
} from '../styles/global';
import { formatToPrice } from '../util/util';

const Home = ({ navigation }: any) => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const user = useSelector((state: any) => state.user.user);
  const totalTransactions =
    useSelector((state: any = 0) => state.transactions.total) ?? 0;
  const transactions = useSelector(
    (state: any) => state.transactions.transactions,
  );
  const selectedColor = !isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;
  const selectedColorBg = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;

  const getFirst5Transactions = () => {
    if (transactions?.length > 5) {
      return transactions.slice(0, 5);
    }
    return transactions;
  };

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

  const renderTransactionList = () => {
    return <TransactionList transactions={getFirst5Transactions()} />;
  };
  const SPACE = 5;
  const { width, height } = Dimensions.get('window');
  const cx = width - 350;
  const cy = height - 750;
  const ax = width - 50;
  const ay = height - 90;

  return (
    <>
      <Canvas style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <Blur blur={50} />
        <Fill color={selectedColor} />
        <Circle cx={cx} cy={cy} r={150} color="#76E0DA" />
        <Circle cx={ax} cy={ay} r={150} color="#1F5587" />
      </Canvas>
      <ScrollView>
        <WrappedBox
          backgroundColor="transparent"
          paddingLeft={0.1}
          paddingTop={0.1}
          paddingRight={0.1}>
          <Div
            backgroundColor="transparent"
            borderBottomLeftRadius={20}
            borderBottomRightRadius={20}
            paddingTop={Constants.statusBarHeight + 20}
            paddingLeft={10}
            paddingRight={10}>
            <DivIcon
              marginBottom={20}
              backgroundColor={selectedColor}
              style={{ borderRadius: 50 }}
              align="center"
              paddingLeft={10}
              paddingRight={10}>
              <Ionicons
                name="person-outline"
                color={selectedColorBg}
                size={26}
              />
            </DivIcon>
            <Text
              fontSize={25}
              align="left"
              fontWeight="bold"
              color={selectedColorBg}>
              Buenos dias, {user?.name}
            </Text>

            <Text
              fontWeight="bold"
              fontSize={20}
              paddingTop={10}
              color={totalTransactions > 0 ? COLORS.GREEN : COLORS.RED}>
              {formatToPrice(totalTransactions)}
            </Text>

            <Text paddingTop={10} color={selectedColorBg}>
              Tu Balance es{' '}
              <Text color={COLORS.GREEN} fontWeight="bold">
                +0.8
              </Text>{' '}
              que es el mes pasado.
            </Text>
            <FlatList
              horizontal={true}
              data={icons}
              keyExtractor={item => item.id}
              renderItem={({ item }: any) => {
                return (
                  <View
                    style={{
                      marginHorizontal: SPACE,
                      paddingHorizontal: SPACE,
                    }}>
                    <Pressable
                      onPressIn={() => navigation.navigate('AddTransaction')}>
                      <DivIcon
                        marginTop={30}
                        marginBottom={20}
                        backgroundColor={selectedColor}
                        style={{ borderRadius: 50 }}
                        align="center"
                        paddingLeft={10}
                        paddingRight={10}>
                        <Ionicons
                          name={item.icon}
                          color={selectedColorBg}
                          size={26}
                        />
                      </DivIcon>
                    </Pressable>
                  </View>
                );
              }}
            />
          </Div>

          <WrappedBox backgroundColor="transparent" paddingTop={20}>
            <Text fontWeight="bold">Actividad Reciente Compartida</Text>
            {/* refactor this */}
            <View
              style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '45%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Div
                  height="140px"
                  elevation={8}
                  shadowOpacity={0.7}
                  shadowColor={COLORS.DANGER}
                  borderRadius={5}
                  backgroundColor={selectedColorBg}
                  marginBottom={20}
                  width="100%">
                  <GradientDiv
                    color={COLORS.GRADIENT_DANGER}
                    startDirection={{ x: 0, y: 0 }}
                    endDirection={{ x: 1, y: 0 }}
                    paddingLeft={5}
                    paddingRight={5}
                    borderRadius={5}
                    paddingBottom={10}
                    height="140px">
                    <Text color={COLORS.WHITE} align="center" paddingBottom={5}>
                      Tranferencia a Sabrina
                    </Text>
                    <Text
                      color={COLORS.RED}
                      align="center"
                      fontWeight="bold"
                      paddingBottom={10}>
                      $-4,500
                    </Text>
                    <PrimaryButton
                      backgroundColor={selectedColor}
                      style={{ borderRadius: 50 }}
                      height="35px"
                      width="100%"
                      onPress={() => alert('detal')}>
                      <TextButton color={selectedColorBg} fontWeight="bold">
                        Ver detalle
                      </TextButton>
                    </PrimaryButton>
                  </GradientDiv>
                </Div>
                <Div
                  height="140px"
                  elevation={8}
                  shadowOpacity={0.7}
                  shadowColor={COLORS.SUCCESS}
                  borderRadius={5}
                  backgroundColor={selectedColorBg}
                  marginBottom={20}
                  width="100%">
                  <GradientDiv
                    color={COLORS.GRADIENT_SUCCESS}
                    startDirection={{ x: 0, y: 0 }}
                    endDirection={{ x: 1, y: 0 }}
                    paddingLeft={5}
                    paddingRight={5}
                    borderRadius={5}
                    paddingBottom={10}
                    height="140px">
                    <Text color={COLORS.WHITE} align="center" paddingBottom={5}>
                      Ingreso pago a Sabrina
                    </Text>
                    <Text
                      color={COLORS.GREEN}
                      align="center"
                      fontWeight="bold"
                      paddingBottom={10}>
                      $+2,500
                    </Text>
                    <PrimaryButton
                      backgroundColor={selectedColor}
                      style={{ borderRadius: 50 }}
                      height="35px"
                      width="100%"
                      onPress={() => alert('detal')}>
                      <TextButton color={selectedColorBg} fontWeight="bold">
                        Ver detalle
                      </TextButton>
                    </PrimaryButton>
                  </GradientDiv>
                </Div>
              </View>
              <Div
                backgroundColor={selectedColorBg}
                borderRadius={5}
                width="50%"
                paddingLeft={10}
                paddingTop={10}
                paddingBottom={10}
                paddingRight={10}>
                <Text color={selectedColor}>Ultima Factura divida con:</Text>
              </Div>
            </View>
            <Div marginTop={40}>
              <Text fontWeight="bold">Ultimas Transacciones</Text>
              {renderTransactionList()}
            </Div>
          </WrappedBox>
        </WrappedBox>
      </ScrollView>
    </>
  );
};

export default Home;
