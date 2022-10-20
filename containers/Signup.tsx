import React from 'react'
import { Dimensions, View, ScrollView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { global, COLORS, REGEX, Container, Text, LGText, Div, PrimaryButton, TextButton, PrimaryButtonWithIcon } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
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
  iconWidth: {
    position: 'absolute',
    left: 10,
    top: 7,
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
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: '',
      name: '',
      lastname: '',
      passwordRepeat: '',
      password: ''
    }
  });


  const pwd = watch('password')

  const signup = (data: any) => {
    console.log(data)
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
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <Div>
            <LGText paddingTop='20' fontWeight="bold">Registrate</LGText>
            <CustomInput
              name="name"
              label="Nombres"
              control={control}
              rules={{
                required: 'El nombre es requerido',
                minLength: { value: 3, message: 'El nombre tiene que ser mayor a 3 caracteres', }
              }}
            />
            <CustomInput
              name="lastname"
              label="Apellidos"
              control={control}
              rules={{
                required: 'El apellido es requerido',
                minLength: { value: 3, message: 'El apellido tiene que ser mayor a 3 caracteres', }
              }}
            />
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
            <CustomInput
              name="passwordRepeat"
              label="Confirma contraseña"
              secureTextEntry
              control={control}
              rules={{
                required: 'La contraseña es requerida',
                minLength: { value: 3, message: 'La contraseña tiene que ser mayor a 3 caracteres', },
                validate: (value: any) => value === pwd || 'La contraseña no es la misma.'
              }}
            />
            <Div paddingTop='20'>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                <Text>Ya tienes una cuenta?, inicia sesion
                  <Text fontWeight='bold'> aqui.</Text>
                </Text>
              </TouchableWithoutFeedback>
            </Div>
            <Div paddingTop='10'>
              <PrimaryButton onPress={handleSubmit(signup)}>
                <TextButton fontWeight="bold">Crear cuenta</TextButton>
              </PrimaryButton>
            </Div>
            <Div style={styles.box}>
              <View style={styles.left}></View>
              <Text style={[styles.marginHorizontal, styles.lineText]}>OR</Text>
              <View style={styles.right}></View>
            </Div>
            <Div paddingTop="30">
              <PrimaryButtonWithIcon onPress={handleSubmit(signup)}>
                <AntDesign style={{ marginRight: 10 }} name="apple1" size={24} color={!darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK} />
                <TextButton fontWeight="bold">Continua con Apple</TextButton>
              </PrimaryButtonWithIcon>
            </Div>
            <Div paddingTop="30">
              <PrimaryButtonWithIcon onPress={handleSubmit(signup)}>
                <AntDesign style={{ marginRight: 10 }} name="google" size={24} color={!darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK} />
                <TextButton fontWeight="bold">Continua con Google</TextButton>
              </PrimaryButtonWithIcon>
            </Div>
          </Div>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}

export default Login