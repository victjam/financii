import { AntDesign } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/form/CustomInput';
import { createCards } from '../features/card/cardSlice';
import { toggleLoader } from '../features/loader/loaderSlice';
import {
  createTransactions,
  saveTotalTransactionAmount,
} from '../features/transactions/transactionsSlice';
import { createUser } from '../features/user/userSlice';
import { auth } from '../firebase';
import { addCard } from '../services/cards';
import { getTransactionsByUserId } from '../services/transactions';
import { createUserDocument } from '../services/user';
import {
  COLORS,
  Container,
  Div,
  LGText,
  PrimaryButton,
  PrimaryButtonWithIcon,
  REGEX,
  Text,
  TextButton,
  WrappedBox,
} from '../styles/global';

export const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 100,
  },
  marginBottom: {
    marginBottom: 20,
  },
  marginTop: {
    marginTop: 20,
  },
  highlightForgot: {
    color: COLORS.BLACK,
  },
  buttonWidth: {
    alignItems: 'stretch',
  },
  marginRight: {
    marginRight: 20,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  left: {
    height: 1,
    width: 150,
    backgroundColor: COLORS.GRAY,
  },
  right: {
    height: 1,
    width: 150,
    backgroundColor: COLORS.GRAY,
  },
  iconWidth: {
    position: 'absolute',
    left: 10,
    top: 7,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  lineText: {
    color: COLORS.DARKGRAY,
  },
});

const Signup = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: '',
      name: '',
      lastName: '',
      confirmPassword: '',
      password: '',
    },
  });

  const pwd = watch('password');

  const signup = () => {
    handleCreateAccount();
  };

  const handleCreateAccount = async () => {
    dispatch(toggleLoader());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        watch('email'),
        watch('password'),
      );
      const user = userCredential.user;
      const userDoc = await createUserDocument(user, {
        name: watch('name'),
        lastName: watch('lastName'),
      });
      const { totalAmount, transactionsData } = await getTransactionsByUserId(
        user.uid,
      );
      const cardData = {
        userId: user.uid,
        title: 'Cuenta personal',
      };
      const card = await addCard(cardData);
      dispatch(createCards(card));
      dispatch(createTransactions(transactionsData));
      dispatch(createTransactions(transactionsData));
      dispatch(saveTotalTransactionAmount(totalAmount));
      dispatch(createUser(userDoc));
      navigation.navigate('Home');
      setTimeout(() => {
        dispatch(toggleLoader());
      }, 500);
    } catch (error) {
      dispatch(toggleLoader());
      console.log(error);
    }
  };
  // const forgotPassword = () => {
  //   navigation.navigate('Home');
  // };
  // const goBack = () => {
  //   navigation.navigate('Main');
  // };

  return (
    <Container>
      <WrappedBox paddingBottom={20}>
        <ScrollView>
          <Div>
            <LGText paddingTop={20} fontWeight="bold">
              Registrate
            </LGText>
            <CustomInput
              name="name"
              label="Nombres"
              control={control}
              rules={{
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre tiene que ser mayor a 3 caracteres',
                },
              }}
            />
            <CustomInput
              name="lastName"
              label="Apellidos"
              control={control}
              rules={{
                required: 'El apellido es requerido',
                minLength: {
                  value: 3,
                  message: 'El apellido tiene que ser mayor a 3 caracteres',
                },
              }}
            />
            <CustomInput
              name="email"
              label="Email"
              control={control}
              rules={{
                required: 'El email es requerido',
                pattern: { value: REGEX.email, message: 'Email invalido' },
              }}
            />
            <CustomInput
              name="password"
              label="Contraseña"
              secureTextEntry
              control={control}
              rules={{
                required: 'La contraseña es requerida',
                minLength: {
                  value: 3,
                  message: 'La contraseña tiene que ser mayor a 3 caracteres',
                },
              }}
            />
            <CustomInput
              name="confirmPassword"
              label="Confirma contraseña"
              secureTextEntry
              control={control}
              rules={{
                required: 'La contraseña es requerida',
                minLength: {
                  value: 3,
                  message: 'La contraseña tiene que ser mayor a 3 caracteres',
                },
                validate: (value: any) =>
                  value === pwd || 'La contraseña no es la misma.',
              }}
            />
            <Div paddingTop={20}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Login')}>
                <Text>
                  Ya tienes una cuenta?, inicia sesion
                  <Text fontWeight="bold"> aqui.</Text>
                </Text>
              </TouchableWithoutFeedback>
            </Div>
            <Div paddingTop={10}>
              <PrimaryButton onPress={handleSubmit(signup)}>
                <TextButton fontWeight="bold">Crear cuenta</TextButton>
              </PrimaryButton>
            </Div>
            <Div style={styles.box}>
              <View style={styles.left} />
              <Text style={[styles.marginHorizontal, styles.lineText]}>OR</Text>
              <View style={styles.right} />
            </Div>
            <Div paddingTop={30}>
              <PrimaryButtonWithIcon onPress={handleSubmit(signup)}>
                <AntDesign
                  style={{ marginRight: 10 }}
                  name="apple1"
                  size={24}
                  color={!isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK}
                />
                <TextButton fontWeight="bold">Continua con Apple</TextButton>
              </PrimaryButtonWithIcon>
            </Div>
            <Div paddingTop={30}>
              <PrimaryButtonWithIcon onPress={handleSubmit(signup)}>
                <AntDesign
                  style={{ marginRight: 10 }}
                  name="google"
                  size={24}
                  color={!isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK}
                />
                <TextButton fontWeight="bold">Continua con Google</TextButton>
              </PrimaryButtonWithIcon>
            </Div>
          </Div>
        </ScrollView>
      </WrappedBox>
    </Container>
  );
};

export default Signup;
