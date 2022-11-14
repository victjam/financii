import React from 'react'
import { Dimensions, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { global, COLORS, REGEX, Div, Container, LGText, WrappedBox, PrimaryButton, PrimaryButtonWithIcon, Text, TextButton } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CustomInput from '../components/form/CustomInput';


export const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 100
  },
  marginBottom: {
    marginBottom: 20,
  },
  marginTop: {
    marginTop: 20,
  },
  highlightForgot: {
    color: COLORS.BLACK
  },
  buttonWidth: {
    alignItems: 'stretch'
  },
  marginRight: {
    marginRight: 20
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
    backgroundColor: COLORS.GRAY
  },
  right: {
    height: 1,
    width: 150,
    backgroundColor: COLORS.GRAY
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  lineText: {
    color: COLORS.DARKGRAY
  }
})

const Login = ({ navigation }: any) => {
  const darkThemeEnabled = useSelector((state: any) => state.theme.preferences.darkThemeEnabled);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const signing = (data: any) => {
    navigation.navigate('Home')
  }
  const forgotPassword = () => {
    navigation.navigate('Home')
  }
  const goBack = () => {
    navigation.navigate('Main')
  }

  return (
    <Container>
      <WrappedBox>
        <LGText paddingTop={20} fontWeight="bold">Inicia sesion</LGText>
        <CustomInput
          name="email"
          label="Email"
          control={control}
          rules={{
            required: 'El email es requerido',
            pattern: { value: REGEX.email, message: 'Email invalido' }
          }}
        />
        <CustomInput
          name="password"
          label="Contraseña"
          secureTextEntry
          control={control}
          rules={{
            required: 'La contraseña es requerida',
            minLength: { value: 3, message: 'La contraseña tiene que ser mayor a 3 caracteres', }
          }}
        />
        <View style={styles.marginTop}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
            <Text> Olvidaste la contraseña?</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Signup')}>
            <Text style={[global.hyperlinkText]}>No tienes una cuenta?, registrate
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
          <View style={styles.left}></View>
          <Text style={[styles.marginHorizontal, styles.lineText]}>OR</Text>
          <View style={styles.right}></View>
        </View>
        <Div paddingTop={30}>
          <PrimaryButtonWithIcon style={{ height: 50 }} onPress={() => navigation.navigate('Home')}>
            <AntDesign style={{ marginRight: 10 }} name="apple1" size={24} color={!darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK} />
            <TextButton fontWeight="bold">Continua con Apple</TextButton>
          </PrimaryButtonWithIcon>
        </Div>
        <Div paddingTop={30}>
          <PrimaryButtonWithIcon style={{ height: 50 }} onPress={() => navigation.navigate('Home')}>
            <AntDesign style={{ marginRight: 10 }} name="google" size={24} color={!darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK} />
            <TextButton fontWeight="bold">Continua con Google</TextButton>
          </PrimaryButtonWithIcon>
        </Div>
      </WrappedBox>
    </Container>
  )
}

export default Login