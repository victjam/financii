import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Pressable, ScrollView, Switch, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoader } from '../../features/loader/loaderSlice';
import {
  createTransactions,
  saveTotalTransactionAmount,
} from '../../features/transactions/transactionsSlice';
import { Transaction } from '../../models/Transactions';
import { createAndGetTransactionsAmount } from '../../services/transactions';
import {
  COLORS,
  Container,
  Div,
  PrimaryButton,
  Text,
  TextButton,
  WrappedBox,
} from '../../styles/global';
import { formatToPrice } from '../../util/util';
import CustomInput from '../form/CustomInput';
import ShadowButton from '../form/ShadowButton';
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'DEL'];

const AddTransaction = ({ navigation }: any) => {
  const { control, watch } = useForm({
    defaultValues: {
      search: '',
    },
  });
  const [total, setTotal] = useState('0');
  const [isEnabled, setIsEnabled] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const categoryId = route?.params?.id ?? undefined;
  const categoryTitle = route?.params?.title ?? undefined;
  const categoryIcon = route?.params?.icon ?? undefined;

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
        categoryId: isEnabled ? categoryId : 'uURJYMOPOd3nPrmtSmX8',
        icon: isEnabled ? categoryIcon : 'cash',
        title: watch('title'),
        type: isEnabled ? 'expense' : 'income',
        userId: user.uid,
        createdAt: new Date().toUTCString(),
      };
      const { totalAmount, transactionsData } =
        await createAndGetTransactionsAmount(transaction);
      dispatch(createTransactions(transactionsData));
      dispatch(saveTotalTransactionAmount(totalAmount));
      navigation.navigate('Home');

      dispatch(toggleLoader());
    } catch (e) {
      dispatch(toggleLoader());
      console.log(e);
    }
  };

  return (
    <Container>
      <WrappedBox>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <Div marginBottom={40}>
                <Switch
                  style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  trackColor={{ false: COLORS.SUCCESS, true: COLORS.GRAY }}
                  thumbColor={isEnabled ? COLORS.DANGER : COLORS.SUCCESS}
                  ios_backgroundColor={COLORS.GRAY}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </Div>
              <Div
                marginBottom={20}
                width="100%"
                paddingLeft={10}
                paddingRight={10}>
                <CustomInput
                  name="title"
                  label="Descripcion"
                  control={control}
                />
              </Div>
              <Div marginBottom={30}>
                <Text fontSize={60} fontWeight="bold">
                  {total ? `${formatToPrice(total)}` : '$0'}
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
                      categoryTitle
                        ? categoryTitle + ' - Cambiar categoria'
                        : 'Selecciona una categoria'
                    }
                    ArrowEnabled={false}
                    handleTouch={() => navigation.navigate('CategoryList')}
                  />
                ) : null}
              </Div>
              <PrimaryButton
                disabled={
                  total === '0' || (isEnabled && categoryTitle === undefined)
                }
                backgroundColor={isEnabled ? COLORS.DANGER : COLORS.SUCCESS}
                width="95%"
                borderRadius={5}
                marginBottom={50}
                onPress={() => onAddTransaction()}>
                <TextButton fontWeight="bold">
                  Agregar {isEnabled ? 'Deuda' : 'Saldo'}
                </TextButton>
              </PrimaryButton>
            </Div>
          </Div>
        </ScrollView>
      </WrappedBox>
    </Container>
  );
};

export default AddTransaction;
