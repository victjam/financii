import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackgroundDiv from '../components/BackgroundDiv';
import TransactionList from '../components/transactions/TransactionList';
import { COLORS, Div, DivIcon, Text, WrappedBox } from '../styles/global';
import { formatToPrice } from '../util/util';

const Home = () => {
  const navigation = useNavigation();
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const user = useSelector((state: any) => state.user.user);
  const totalTransactions =
    useSelector((state: any = 0) => state.transactions.total) ?? 0;
  const transactions = useSelector(
    (state: any) => state.transactions.transactions,
  );
  const selectedColor = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;
  const selectedColorBg = isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE;

  const getFirst5Transactions = () => {
    if (transactions?.length > 5) {
      return transactions.slice(0, 5);
    }
    return transactions;
  };

  const checkTimeToSayGreetings = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      return 'Buenos dias';
    } else if (hour >= 12 && hour < 18) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  };

  const renderTransactionList = () => {
    return <TransactionList transactions={getFirst5Transactions()} />;
  };

  // const [value, setValue] = useState(0);
  // const valueData = useComputedValue(
  //   () => setValue(loop.current * 700),
  //   [loop],
  // );

  return (
    <ScrollView style={{ backgroundColor: selectedColorBg }}>
      <WrappedBox paddingLeft={0.1} paddingTop={0.1} paddingRight={0.1}>
        <Div
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}
          paddingTop={Constants.statusBarHeight + 20}
          paddingRight={10}>
          <DivIcon
            marginLeft={10}
            backgroundColor={selectedColorBg}
            style={{ borderRadius: 50 }}
            align="center"
            paddingLeft={10}
            paddingRight={10}>
            <Ionicons name="person-outline" color={selectedColor} size={26} />
          </DivIcon>
          <BackgroundDiv height={240}>
            <View
              style={{
                zIndex: 99,
                height: 240,
                paddingTop: 5,
              }}>
              <Text color={COLORS.WHITE}>
                {checkTimeToSayGreetings()}, {user?.name}.
              </Text>
              <Text paddingTop={5} color={COLORS.WHITE}>
                Tu balance
              </Text>
              <Text
                paddingTop={10}
                fontWeight="bold"
                fontSize={35}
                color={COLORS.WHITE}>
                {formatToPrice(totalTransactions)}
              </Text>
            </View>
          </BackgroundDiv>
        </Div>
        <Div paddingLeft={10} marginBottom={10}>
          <Div>
            <Text>Ultimas Transacciones</Text>
            {renderTransactionList()}
          </Div>
        </Div>
      </WrappedBox>
    </ScrollView>
  );
};

export default Home;
