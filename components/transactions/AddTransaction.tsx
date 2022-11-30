import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Pressable, Switch, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoader } from '../../features/loader/loaderSlice';
import {
  createTransactions,
  saveTotalTransactionAmount,
} from '../../features/transactions/transactionsSlice';
import { Transaction } from '../../models/Transactions';
import {
  createAndGetTransactionsAmount,
  updateTransaction,
} from '../../services/transactions';
import {
  COLORS,
  Container,
  Div,
  PrimaryButton,
  Text,
  TextButton,
  WrappedBox,
} from '../../styles/global';
import { formatToPrice, upperCaseFirstLetter } from '../../util/util';
import CustomInput from '../form/CustomInput';
import ShadowButton from '../form/ShadowButton';
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'DEL'];

const AddTransaction = ({ navigation }: any) => {
  const { control, watch, setValue, reset } = useForm({
    defaultValues: {
      title: '',
    },
  });
  const [total, setTotal] = useState('0');
  const [isEnabled, setIsEnabled] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>(null);
  const route = useRoute();
  const dispatch = useDispatch();
  const categoryChange = route?.params?.category;
  const [category, setCategory] = useState(route?.params?.category);
  const transactionData = route?.params?.transaction ?? undefined;

  useEffect(() => {
    setCategory(categoryChange);
  }, [categoryChange]);

  useEffect(() => {
    if (transactionData) {
      setTransaction(transactionData);
      setTotal(transaction?.amount.toString());
      setIsEnabled(transaction?.type === 'income' ? false : true);
      setValue('title', transaction?.title);
      setCategory(transaction?.category);
    }
  }, [transaction, reset, setValue, transactionData]);

  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const selectedColor = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const user = useSelector((state: any) => state.user.user);

  const totalNumbers = (value: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const screenNumber = total;
    if (value === 'DEL') {
      setTotal(screenNumber.slice(0, -1));
    } else {
      if (screenNumber.length < 8) {
        setTotal(parseInt(screenNumber + value).toString());
      }
    }
  };

  const onAddTransaction = async () => {
    try {
      dispatch(toggleLoader());
      const transaction: Transaction = {
        amount: parseInt(total),
        category: {
          id: isEnabled ? category.id : 'uURJYMOPOd3nPrmtSmX8',
          icon: isEnabled ? category.icon : 'cash',
          title: isEnabled ? category.title : 'Ingreso',
        },
        title: watch('title'),
        type: isEnabled ? 'expense' : 'income',
        userId: user.uid,
        createdAt: new Date().toUTCString(),
        modifiedAt: new Date().toUTCString(),
      };
      const { totalAmount, transactionsData } =
        await createAndGetTransactionsAmount(transaction);
      dispatch(createTransactions(transactionsData));
      dispatch(saveTotalTransactionAmount(totalAmount));
      navigation.goBack();
      setTimeout(() => {
        dispatch(toggleLoader());
      }, 500);
    } catch (e) {
      dispatch(toggleLoader());
      console.log(e);
    }
  };

  const onUpdateTransaction = async () => {
    try {
      dispatch(toggleLoader());
      const newTransaction: Transaction = {
        id: transaction.id,
        amount: parseInt(total),
        category: {
          id: isEnabled ? category.id : 'uURJYMOPOd3nPrmtSmX8',
          icon: isEnabled ? category.icon : 'cash',
          title: isEnabled ? category.title : 'Ingreso',
          isDeleted: category.isDeleted ? category.isDeleted : false,
        },
        title: watch('title'),
        type: isEnabled ? 'expense' : 'income',
        userId: user.uid,
        modifiedAt: new Date().toUTCString(),
      };
      const { totalAmount, transactionsData } = await updateTransaction(
        newTransaction,
      );
      dispatch(createTransactions(transactionsData));
      dispatch(saveTotalTransactionAmount(totalAmount));
      setTimeout(() => {
        dispatch(toggleLoader());
      }, 500);
      navigation.goBack();
    } catch (e) {
      dispatch(toggleLoader());
      console.log(e);
    }
  };

  return (
    <Container>
      <WrappedBox height={'100%'}>
        <Div
          backgroundColor="transparent"
          justifyContent="flex-end"
          alignItems="center"
          flex={1}>
          <Div width="100%" borderRadius={20} alignItems="center">
            <View
              style={{
                display: 'flex',
                marginBottom: 40,
                alignItems: 'flex-end',
                width: '100%',
                paddingRight: 30,
              }}
            />
            <Div
              marginBottom={10}
              display="flex"
              flexDirection="row"
              width="100%"
              alignItems="center"
              justifyContent="space-between">
              <Text>{isEnabled ? 'Gasto' : 'Ingreso'} </Text>
              <Switch
                trackColor={{ false: COLORS.SUCCESS, true: COLORS.GRAY }}
                thumbColor={isEnabled ? COLORS.DANGER : COLORS.SUCCESS}
                ios_backgroundColor={COLORS.GRAY}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </Div>
            <Div
              marginBottom={10}
              width="100%"
              paddingLeft={10}
              paddingRight={10}>
              <CustomInput name="title" label="Descripcion" control={control} />
            </Div>
            <Div marginBottom={30}>
              <Text fontSize={60} fontWeight="bold">
                {total ? `${formatToPrice(parseInt(total))}` : '$0'}
              </Text>
            </Div>
            <Div flexDirection="row">
              <FlatList
                data={numbers}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      totalNumbers(item);
                    }}>
                    <View
                      style={{
                        marginLeft: 50,
                        marginRight: 50,
                        height: 90,
                        width: 50,
                      }}>
                      {item !== 'DEL' ? (
                        <Text fontSize={25} fontWeight="bold">
                          {item}
                        </Text>
                      ) : (
                        <MaterialIcons
                          name="keyboard-arrow-left"
                          size={30}
                          color={selectedColor}
                        />
                      )}
                    </View>
                  </Pressable>
                )}
                keyExtractor={item => `${item}`}
                showsHorizontalScrollIndicator={false}
                numColumns={numbers.length / 4}
              />
            </Div>
            <Div width="100%">
              {isEnabled ? (
                <ShadowButton
                  text={
                    category?.title
                      ? upperCaseFirstLetter(category?.title) +
                        ' - Cambiar categoria'
                      : 'Selecciona una categoria'
                  }
                  ArrowEnabled={false}
                  handleTouch={() => navigation.navigate('CategoryList')}
                />
              ) : null}
            </Div>
            {transaction ? (
              <PrimaryButton
                disabled={
                  total === '0' || (isEnabled && category?.title === undefined)
                }
                backgroundColor={isEnabled ? COLORS.DANGER : COLORS.SUCCESS}
                width="95%"
                borderRadius={5}
                marginBottom={50}
                onPress={() => onUpdateTransaction()}>
                <TextButton fontWeight="bold">
                  {'Editar'} {isEnabled ? 'Deuda' : 'Saldo'}
                </TextButton>
              </PrimaryButton>
            ) : (
              <PrimaryButton
                disabled={
                  total === '0' || (isEnabled && category?.title === undefined)
                }
                backgroundColor={isEnabled ? COLORS.DANGER : COLORS.SUCCESS}
                width="95%"
                borderRadius={5}
                marginBottom={50}
                onPress={() => onAddTransaction()}>
                <TextButton fontWeight="bold">
                  {'Agregar'} {isEnabled ? 'Deuda' : 'Saldo'}
                </TextButton>
              </PrimaryButton>
            )}
          </Div>
        </Div>
      </WrappedBox>
    </Container>
  );
};

export default AddTransaction;
