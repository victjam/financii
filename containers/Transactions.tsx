import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import TransactionList from '../components/transactions/TransactionList';
import { Container, Div, LGText, Text, WrappedBox } from '../styles/global';

const Transactions = () => {
  const transactions = useSelector(
    (state: any) => state.transactions.transactions,
  );

  return (
    <Container>
      <WrappedBox>
        <ScrollView>
          <Div>
            <LGText fontWeight="bold">Lista de transaciones</LGText>
            <Text>Todas tus transacciones en un solo lugar</Text>
          </Div>
          <Div>
            <TransactionList transactions={transactions} />
          </Div>
        </ScrollView>
      </WrappedBox>
    </Container>
  );
};

export default Transactions;
