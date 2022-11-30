import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { Transaction } from '../../models/Transactions';
import { COLORS, Div, DivIcon, Text } from '../../styles/global';
import { formatDate, formatToPrice } from '../../util/util';

// refactor transaccion type
const TransactionList = ({ transactions }: any) => {
  console.log(transactions);
  const navigation = useNavigation();

  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );

  const renderTransactionsIfExist = () => {
    if (transactions && transactions.length !== 0) {
      return transactions?.map((transaction: Transaction, i: number) => (
        <Div
          key={i}
          style={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() =>
              navigation.navigate('TransactionDetail', { id: transaction.id })
            }>
            <Div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <DivIcon
                elevation={8}
                shadowOpacity={0.5}
                shadowColor={
                  transaction.type === 'income' ? COLORS.GREEN : COLORS.RED
                }
                backgroundColor={selectedColorBg}
                borderRadius={50}
                align="center"
                paddingLeft={10}
                paddingRight={10}>
                <Ionicons
                  name={transaction?.category?.icon}
                  color={selectedColor}
                  size={20}
                />
              </DivIcon>
              <Div marginLeft={20}>
                <Text>{transaction.title}</Text>
                <Text
                  fontWeight="bold"
                  color={
                    transaction.type === 'income' ? COLORS.GREEN : COLORS.RED
                  }>
                  {formatToPrice(transaction.amount)}
                </Text>
                <Text color={COLORS.DARKGRAY}>
                  {formatDate(transaction.createdAt)}
                </Text>
              </Div>
            </Div>
          </Pressable>
        </Div>
      ));
    } else {
      return (
        <Div
          style={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text color={COLORS.DARKGRAY}>No tienes transacciones</Text>
        </Div>
      );
    }
  };

  const selectedColor = isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE;
  const selectedColorBg = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;
  return <Div>{renderTransactionsIfExist()}</Div>;
};

export default TransactionList;
