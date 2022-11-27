import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoader } from '../../features/loader/loaderSlice';
import {
  createTransactions,
  saveTotalTransactionAmount,
} from '../../features/transactions/transactionsSlice';
import { Transaction } from '../../models/Transactions';
import { deleteTransaction } from '../../services/transactions';
import {
  COLORS,
  Container,
  Div,
  GradientDiv,
  Text,
  WrappedBox,
} from '../../styles/global';
import {
  formatDate,
  formatToPrice,
  upperCaseFirstLetter,
} from '../../util/util';

const TransactionDetail = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const transactionId = route?.params?.id;
  const [transaction, setTransaction] = useState<Transaction>({});
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const selectedColor = !isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE;
  const getTransactions = useSelector(
    (state: any) => state.transactions.transactions,
  );

  useEffect(() => {
    const transaction = getTransactions.find(
      (transaction: any) => transaction.id === transactionId,
    );
    setTransaction(transaction);
  }, [transaction, getTransactions, transactionId]);

  const onDeleteTransaction = async () => {
    try {
      dispatch(toggleLoader());
      const { totalAmount, transactionsData } = await deleteTransaction(
        transaction.id,
        transaction.userId,
      );
      dispatch(createTransactions(transactionsData));
      dispatch(saveTotalTransactionAmount(totalAmount));
      dispatch(toggleLoader());
      navigation.goBack();
    } catch (error) {
      console.log(error);
      dispatch(toggleLoader());
    }
  };
  return (
    <Container>
      <Div>
        <Div display="flex" justifyContent="flex-end" flexDirection="row">
          <Pressable
            style={{ width: '20%', alignItems: 'center', height: 80 }}
            onPress={() =>
              navigation.navigate('AddTransaction', { transaction })
            }>
            <Ionicons color={selectedColor} name="brush-outline" size={30} />
          </Pressable>
        </Div>
      </Div>
      <WrappedBox paddingTop={0}>
        <Div
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="90%">
          <Div>
            <Div>
              <Text fontSize={25}>{transaction?.title}</Text>
            </Div>

            <Text paddingTop={20} fontWeight="bold">
              {formatDate(transaction?.createdAt)}
            </Text>
            <Text paddingTop={20} fontWeight="bold">
              Categoria
            </Text>
            <GradientDiv
              color={
                transaction.type === 'income'
                  ? COLORS.GRADIENT_SUCCESS
                  : COLORS.GRADIENT_DANGER
              }
              startDirection={{ x: 0, y: 0 }}
              endDirection={{ x: 1, y: 0 }}
              paddingLeft={5}
              marginTop={10}
              paddingRight={5}
              borderRadius={5}
              height="100px">
              <Text
                fontSize={25}
                fontWeight="bold"
                color={COLORS.WHITE}
                paddingBottom={5}>
                {upperCaseFirstLetter(transaction?.category?.title || '')}
              </Text>
            </GradientDiv>
            <Text paddingTop={20} fontWeight="bold">
              Valor
            </Text>
            <Text
              paddingTop={5}
              fontSize={30}
              color={transaction.type === 'income' ? COLORS.GREEN : COLORS.RED}
              fontWeight="bold">
              {transaction.type !== 'income' ? '-' : null}
              {formatToPrice(transaction?.amount || 0)}
            </Text>
            <Div>
              <Text paddingTop={20} fontWeight="bold">
                Transaccion compartida con:
              </Text>
            </Div>
            <Text paddingTop={10}>
              Esta transaccion no esta siendo compartida.
            </Text>
          </Div>
          <Pressable onPress={() => onDeleteTransaction()}>
            <GradientDiv
              color={COLORS.GRADIENT_BLUE}
              startDirection={{ x: 0, y: 0 }}
              endDirection={{ x: 1, y: 0 }}
              paddingLeft={5}
              paddingRight={5}
              borderRadius={5}
              height="50px">
              <Text
                fontSize={20}
                fontWeight="bold"
                color={COLORS.WHITE}
                paddingBottom={5}>
                Eliminar Transaccion
              </Text>
            </GradientDiv>
          </Pressable>
        </Div>
      </WrappedBox>
    </Container>
  );
};

export default TransactionDetail;
