import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import ShadowButton from '../components/form/ShadowButton';
import TransactionList from '../components/transactions/TransactionList';
import { Transaction } from '../models/Transactions';
import { COLORS, Container, Div, LGText, Text } from '../styles/global';
import { formatToPrice } from '../util/util';

const Transactions = ({ navigation }: any) => {
  const route = useRoute();
  const [allTransactions, setAllTransactions] = useState<any>([]);
  const categoryId = route.params?.categoryId ?? null;
  const [category, setCategory] = useState<any>(categoryId);
  const totalAmount =
    useSelector((state: any) => state.transactions.total) ?? 0;
  const transactions = useSelector(
    (state: any) => state.transactions.transactions,
  );

  const totalAmountByCat = (transactions: Transaction[]) =>
    transactions.reduce(
      (acc, doc) =>
        doc.type === 'income' ? acc + doc.amount : acc - doc.amount,
      0,
    );

  const resetFilters = () => {
    setCategory(null);
    setAllTransactions(transactions);
  };

  useEffect(() => {
    if (categoryId) {
      setCategory(categoryId);
      const cat = transactions.filter(
        (transaction: any) => transaction.category.id === categoryId,
      );
      setAllTransactions(cat);
    } else {
      setAllTransactions(transactions);
      setCategory(null);
    }
  }, [transactions, categoryId]);

  return (
    <Container>
      <ScrollView>
        <Div>
          <Div
            marginTop={60}
            paddingLeft={10}
            paddingRight={10}
            marginBottom={40}>
            <LGText fontWeight="bold">Balance:</LGText>
            <LGText
              color={totalAmount > 0 ? COLORS.GREEN : COLORS.RED}
              fontWeight="bold">
              {formatToPrice(totalAmount)}
            </LGText>
            {category && (
              <Div>
                <Text paddingTop={20}>Gastos por categoria:</Text>
                <Text
                  fontWeight="bold"
                  color={
                    totalAmountByCat(allTransactions) > 0
                      ? COLORS.GREEN
                      : COLORS.RED
                  }>
                  {formatToPrice(totalAmountByCat(allTransactions))}
                </Text>
              </Div>
            )}
          </Div>
          <Div paddingLeft={10} paddingRight={10}>
            <LGText fontWeight="bold">Lista de transaciones</LGText>
            <Text>Todas tus transacciones en un solo lugar</Text>
          </Div>
        </Div>
        {transactions.lenght > 0 && (
          <Div marginTop={10} marginBottom={5}>
            <Text paddingLeft={10} paddingRight={10}>
              Filtra por categoria
            </Text>
            <ShadowButton
              text="Seleccionar categoria"
              handleTouch={() =>
                navigation.navigate('CategoriesByUser', { filterBy: true })
              }
            />
            {category && (
              <Div>
                <ShadowButton
                  text="Resetear filtro"
                  handleTouch={() => resetFilters()}
                />
              </Div>
            )}
          </Div>
        )}
        <Div paddingLeft={10} paddingRight={10}>
          <TransactionList transactions={allTransactions} />
        </Div>
      </ScrollView>
    </Container>
  );
};

export default Transactions;
