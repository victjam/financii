import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import TransactionList from '../components/transactions/TransactionList';
import { getTransactionsByUserId } from '../services/transactions';
import {
  COLORS,
  Container,
  Div,
  LGText,
  Text,
  WrappedBox,
} from '../styles/global';
import { formatStringToPrice } from '../util/util';

const Transactions = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const user = useSelector((state: any) => state.user.user);
  useFocusEffect(
    React.useCallback(() => {
      const getTransactionsData = async () => {
        const transactionsData: any = await getTransactionsByUserId(user.uid);
        if (transactionsData) {
          setTransactionsList(transactionsData);
        }
      };
      getTransactionsData();
    }, [user]),
  );

  const total = () => {
    const totalAmount = transactionsList.reduce(
      (acc: number, transaction: any) => {
        if (transaction.type === 'income') {
          return acc + transaction.amount;
        } else {
          return acc - transaction.amount;
        }
      },
      0,
    );
    return {
      totalAmount: totalAmount,
      totalAmountString: formatStringToPrice(totalAmount.toString()),
    };
  };

  return (
    <Container>
      <WrappedBox>
        <ScrollView>
          <Div>
            <Div marginBottom={40}>
              <LGText fontWeight="bold">Saldo:</LGText>
              <LGText
                color={total().totalAmount > 0 ? COLORS.GREEN : COLORS.RED}
                fontWeight="bold">
                {total().totalAmountString}
              </LGText>
            </Div>
            <LGText fontWeight="bold">Lista de transaciones</LGText>
            <Text>Todas tus transacciones en un solo lugar</Text>
          </Div>
          <Div>
            <TransactionList transactions={transactionsList} />
          </Div>
        </ScrollView>
      </WrappedBox>
    </Container>
  );
};

export default Transactions;
