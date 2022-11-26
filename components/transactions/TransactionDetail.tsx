import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Div, Text, WrappedBox } from '../../styles/global';

const TransactionDetail = () => {
  const route = useRoute();
  const transactionId = route?.params?.id;
  const [transaction, setTransaction] = useState({});
  const getTransactions = useSelector(
    (state: any) => state.transactions.transactions,
  );

  useEffect(() => {
    const transaction = getTransactions.find(
      (transaction: any) => transaction.id === transactionId,
    );
    setTransaction(transaction);
  }, [transaction, getTransactions, transactionId]);
  return (
    <Container>
      <WrappedBox>
        <Div>
          <Text>Transaction Detail</Text>
          <Text>{transaction?.title}</Text>
        </Div>
      </WrappedBox>
    </Container>
  );
};

export default TransactionDetail;
