import React, { useState, } from 'react';
import { useDispatch } from "react-redux";
import { Dimensions, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { TOGGLE_DARKTHEME } from "../store/theme/actions";
import { Container, Text, Div, PrimaryButton, WrappedBox, SText, LGText, XLGText, TextButton, global } from '../styles/global';

const Main = ({ navigation }: any) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <WrappedBox>
        <View style={global.centerElement}>
          <Image
            style={global.imagePersonal}
            source={require('../assets/finance.png')}
          />
        </View>
        <SText fontWeight="bold">ALPHA VERSION</SText>
        <LGText fontWeight="bold">Bienvenidos a</LGText>
        <XLGText fontWeight="bold">Financii</XLGText>
        <Div paddingTop="10">
          <Text>Una app para gestionar tus gatos y metas de la forma mas segura y simple posible.</Text>
        </Div>
        <View>
        </View>
        <Div paddingTop="30">
          <PrimaryButton onPress={() => navigation.navigate('Signup')} >
            <TextButton fontWeight="bold">Crear cuenta</TextButton>
          </PrimaryButton>
        </Div>
        //
        {/* onPress={() => dispatch({ type: TOGGLE_DARKTHEME })}*/}
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <Text paddingTop='10' >Ya tienes una cuenta?, inicia
            <Text fontWeight='bold'> aqui.</Text>
          </Text>
        </TouchableWithoutFeedback>
      </WrappedBox>
    </Container>
  )
}

export default Main;