import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Transaction } from '../../models/Transactions';
import { COLORS, Div, DivIcon, Text } from '../../styles/global';
import { formatToPrice } from '../../util/util';

// refactor transaccion type
const TransactionList = ({ transactions }: any) => {
  const formatUTCDate = (date: any) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );

  const renderTransactionsIfExist = () => {
    if (transactions && transactions.length !== 0) {
      return transactions?.map((category: Transaction, i: number) => (
        <Div
          key={i}
          style={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
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
                category.type === 'income' ? COLORS.GREEN : COLORS.RED
              }
              backgroundColor={selectedColorBg}
              borderRadius={50}
              align="center"
              paddingLeft={10}
              paddingRight={10}>
              <Ionicons name={category.icon} color={selectedColor} size={20} />
            </DivIcon>
            <Div marginLeft={20}>
              <Text>{category.title}</Text>
              <Text
                fontWeight="bold"
                color={category.type === 'income' ? COLORS.GREEN : COLORS.RED}>
                {formatToPrice(category.amount)}
              </Text>
              <Text color={COLORS.DARKGRAY}>
                {formatUTCDate(category.createdAt)}
              </Text>
            </Div>
          </Div>
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
