import { AntDesign } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/form/CustomInput';
import { toggleLoader } from '../features/loader/loaderSlice';
import {
  createTransactions,
  saveTotalTransactionAmount,
} from '../features/transactions/transactionsSlice';
import { createUser } from '../features/user/userSlice';
import { auth } from '../firebase';
import { getTransactionsByUserId } from '../services/transactions';
import { getUserDocument } from '../services/user';
import {
  COLORS,
  Container,
  Div,
  global,
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
  marginHorizontal: {
    marginHorizontal: 10,
  },
  lineText: {
    color: COLORS.DARKGRAY,
  },
});

const Login = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const {
    control,
    handleSubmit,
    watch,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signing = async () => {
    try {
      dispatch(toggleLoader());
      const user = await signInWithEmailAndPassword(
        auth,
        watch('email'),
        watch('password'),
      );
      const userDoc = await getUserDocument(user.user.uid);
      const { totalAmount, transactionsData } = await getTransactionsByUserId(
        user.user.uid,
      );
      dispatch(createTransactions(transactionsData));
      dispatch(saveTotalTransactionAmount(totalAmount));
      dispatch(createUser(userDoc));
      navigation.navigate('Home');
      setTimeout(() => {
        dispatch(toggleLoader());
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch(toggleLoader());
    }
  };

  return (
    <Container>
      <WrappedBox>
        <LGText paddingTop={20} fontWeight="bold">
          Inicia sesion
        </LGText>
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
        <View style={styles.marginTop}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Login')}>
            <Text> Olvidaste la contraseña?</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Signup')}>
            <Text style={[global.hyperlinkText]}>
              No tienes una cuenta?, registrate
              <Text style={global.highlight}> aqui.</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <Div paddingTop={30}>
          <PrimaryButton onPress={handleSubmit(signing)}>
            <TextButton fontWeight="bold">Iniciar sesion</TextButton>
          </PrimaryButton>
        </Div>
        <View style={styles.box}>
          <View style={styles.left} />
          <Text style={[styles.marginHorizontal, styles.lineText]}>OR</Text>
          <View style={styles.right} />
        </View>
        <Div paddingTop={30}>
          <PrimaryButtonWithIcon
            style={{ height: 50 }}
            onPress={() => navigation.navigate('Home')}>
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
          <PrimaryButtonWithIcon
            style={{ height: 50 }}
            onPress={() => navigation.navigate('Home')}>
            <AntDesign
              style={{ marginRight: 10 }}
              name="google"
              size={24}
              color={!isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK}
            />
            <TextButton fontWeight="bold">Continua con Google</TextButton>
          </PrimaryButtonWithIcon>
        </Div>
      </WrappedBox>
    </Container>
  );
};

export default Login;
