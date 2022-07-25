import React from 'react'
import { Dimensions, View, Text, SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { global, COLORS, REGEX } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';
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
    color: COLORS.black
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
    backgroundColor: COLORS.gray
  },
  right: {
    height: 1,
    width: 150,
    backgroundColor: COLORS.gray
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
    color: COLORS.darkGray
  }
})

const Login = ({ navigation }: any) => {
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
    <SafeAreaView style={global.safeView}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={[global.initialPadding, styles.paddingTop]}>
            <Text style={[global.h2, styles.marginBottom]}>Registrate</Text>
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
            <View style={styles.marginTop}>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                <Text style={[global.hyperlinkText]}>Ya tienes una cuenta?, inicia sesion
                  <Text style={global.highlight}> aqui.</Text>
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={[styles.marginTop, global.centerElement]}>
              <TouchableOpacity onPress={handleSubmit(signup)} style={global.buttonPrimary}>
                <Text style={global.buttonPrimaryText}>Crear cuenta</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <View style={styles.left}></View>
              <Text style={[styles.marginHorizontal, styles.lineText]}>OR</Text>
              <View style={styles.right}></View>
            </View>
            <View style={[styles.marginTop, global.centerElement]}>
              <TouchableOpacity style={[global.buttonPrimary, global.centerElement, styles.marginBottom]}>
                <AntDesign style={styles.iconWidth} name="apple1" size={24} color="white" />
                <Text style={global.buttonPrimaryText}>Continua con Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[global.buttonPrimary, global.centerElement, styles.marginBottom]}>
                <AntDesign style={styles.iconWidth} name="google" size={24} color="white" />
                <Text style={global.buttonPrimaryText}>Continua con Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login