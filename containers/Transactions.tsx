import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native'
import TransactionList from '../components/transactions/TransactionList';
import { Text, FONTS, Container, Div, WrappedBox, LGText, COLORS, XLGText } from '../styles/global';


const transactions = [
  {
    id: '0',
    title: 'Arriendo',
    price: '-$500',
    color: COLORS.DANGER,
    icon: 'wallet-outline',
    date: 'Sept 19, 2023'
  },
  {
    id: '1',
    title: 'Pago a Victor',
    price: '$100',
    color: COLORS.GREEN,
    icon: 'wallet-outline',
    date: 'Sept 19, 2023'
  },
  {
    id: '2',
    title: 'Pago a Carlos',
    price: '$50',
    color: COLORS.GREEN,
    icon: 'wallet-outline',
    date: 'Sept 19, 2023'
  },
  {
    id: '4',
    title: 'Colegio Emma',
    price: '-$50000',
    color: COLORS.DANGER,
    icon: 'wallet-outline',
    date: 'Sept 19, 2023'
  }
];

const Transactions = () => (
  <Container>
    <WrappedBox>
      <ScrollView>
        <Div>
          <Div marginBottom={40}>
        <LGText fontWeight='bold'>Saldo:</LGText>
        <LGText fontWeight='bold'>$300.000</LGText>
          </Div>
          <LGText fontWeight='bold'>Lista de transaciones</LGText>
          <Text>Todas tus transacciones en un solo lugar</Text>
        </Div>
        <Div>
          <TransactionList transactions={transactions} />
        </Div>
      </ScrollView>
    </WrappedBox>
  </Container>
)

const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 30,
  },
  name: {
    paddingTop: 5,
    fontSize: FONTS.xs,
  },
  title: {
    fontSize: FONTS.s,
    fontWeight: '600'
  }
});



export default Transactions;