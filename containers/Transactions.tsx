import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import TransactionList from '../components/transactions/TransactionList';
import {
  COLORS,
  Container,
  Div,
  LGText,
  Text,
  WrappedBox,
} from '../styles/global';
import { formatToPrice } from '../util/util';

const Transactions = () => {
  const totalAmount =
    useSelector((state: any) => state.transactions.total) ?? 0;
  const transactions = useSelector(
    (state: any) => state.transactions.transactions,
  );

  return (
    <Container>
      <WrappedBox>
        <ScrollView>
          <Div>
            <Div marginBottom={40}>
              <LGText fontWeight="bold">Saldo:</LGText>
              <LGText
                color={totalAmount > 0 ? COLORS.GREEN : COLORS.RED}
                fontWeight="bold">
                {formatToPrice(totalAmount)}
              </LGText>
            </Div>
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
