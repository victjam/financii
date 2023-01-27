import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoader } from '../../features/loader/loaderSlice';
import {
  createTransactions,
  saveTotalTransactionAmount,
} from '../../features/transactions/transactionsSlice';
import { Transaction } from '../../models/Transactions';
import { getCategory } from '../../services/categories';
import { deleteTransaction } from '../../services/transactions';
import { COLORS, Container, Div, GradientDiv, Text } from '../../styles/global';
import {
  formatDate,
  formatToPrice,
  upperCaseFirstLetter,
} from '../../util/util';
import ButtonWithBorder from '../ButtonWithBorder';

const TransactionDetail = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const transactionId = route?.params?.id;
  const [transaction, setTransaction] = useState<Transaction>({});
  const [category, setCategory] = useState({});
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

    const getCategoryById = async (id: string) => {
      const currentCategory = await getCategory(id);
      if (currentCategory) {
        setCategory(currentCategory);
      }
    };
    getCategoryById(transaction?.category.id);
    setTransaction(transaction);
  }, [transaction, getTransactions, transactionId, setCategory]);

  const onDeleteTransaction = async () => {
    try {
      dispatch(toggleLoader());
      const { totalAmount, transactionsData } = await deleteTransaction(
        transaction.id,
        transaction.userId,
      );
      dispatch(createTransactions(transactionsData));
      dispatch(saveTotalTransactionAmount(totalAmount));
      setTimeout(() => {
        dispatch(toggleLoader());
      }, 500);
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
      <Div
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="90%">
        <Div paddingLeft={10} paddingRight={10}>
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
          <Text marginBottom={20} color={COLORS.RED} fontWeight="bold">
            {category?.isDeleted ? '(Categoria excluída)' : ''}
          </Text>
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
          <ButtonWithBorder
            colors={['#F26CA7', '#5E4AE3']}
            text="Eliminar Transaccion"
            fontSize={17}
            width={width}
            height={80}
            backgroundColor={isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE}
          />
          {/* <GradientDiv
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
            </GradientDiv> */}
        </Pressable>
      </Div>
    </Container>
  );
};

export default TransactionDetail;
