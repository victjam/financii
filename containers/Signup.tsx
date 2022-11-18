import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import CustomInput from '../components/form/CustomInput';
import { auth, createUserDocument } from '../firebase';
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

const Login = ({ navigation }: any) => {
  const darkThemeEnabled = useSelector(
    (state: any) => state.theme.preferences.darkThemeEnabled,
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
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userDoc));
      navigation.navigate('Home');
    } catch (error) {
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
                  color={!darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK}
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
                  color={!darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK}
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

export default Login;
