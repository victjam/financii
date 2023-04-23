import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import BackgroundDiv from '../components/BackgroundDiv';
import Card from '../components/Cards/Card';
import TransactionList from '../components/transactions/TransactionList';
import { COLORS, Div, DivIcon, Text, WrappedBox } from '../styles/global';

const Home = () => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const user = useSelector((state: any) => state.user.user);
  const transactions = useSelector(
    (state: any) => state.transactions.transactions,
  );

  const selectedColor = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;
  const selectedColorBg = isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE;
  const firstFiveTransactions =
    transactions?.length > 5 ? transactions.slice(0, 5) : transactions;

  const navigateTo = (route: string) => {
    navigation.navigate(route as never);
  };

  const renderTransactionList = () => {
    return <TransactionList transactions={firstFiveTransactions} />;
  };

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
          <View>
            <Pressable onPress={() => navigateTo('CardList')}>
              <Card width={width} name={user?.name} />
            </Pressable>
            <View style={styles.flex}>
              <BackgroundDiv
                colors={['#1F5587', '#76E0DA']}
                width={width}
                height={80}>
                <Pressable
                  style={[styles.addButton]}
                  onPress={() => navigateTo('AddTransaction')}>
                  <Text
                    marginTop={0}
                    paddingTop={0}
                    color={COLORS.WHITE}
                    fontSize={17}>
                    Agregar Transaccion
                  </Text>
                </Pressable>
              </BackgroundDiv>
            </View>
          </View>
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

const styles = StyleSheet.create({
  addButton: {
    height: '100%',
    zIndex: 99,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divContainerText: {
    zIndex: 99,
    height: 220,
    paddingTop: 30,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Home;
