import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { darkTheme, lightTheme } from '../styles/theme';
import { useDarkMode } from "../hooks/useDarkMode"
import { useSelector, useDispatch } from "react-redux";
import { Dimensions } from 'react-native';
import { TOGGLE_DARKTHEME } from "../store/theme/actions";
import { Container, Text, TitleText, Header, ThemeButton, ThemeButtonText } from '../styles/global';
const windowWidth = Dimensions.get('window').width;

const Main = ({ navigation }: any) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Header>
        <TitleText fontSize='24px'>Blog</TitleText>
        <ThemeButton>
          <ThemeButtonText>asdas
          </ThemeButtonText>
        </ThemeButton>
      </Header>
      <Container>
        <TitleText>sadasd</TitleText>
        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, dolores, aut exercitationem magnam obcaecati impedit illum ipsam quos consequuntur, laborum blanditiis at ducimus sapiente ratione consequatur minus mollitia esse in.</Text>
        <Text fontWeight='600'>22/12/1194</Text>
      </Container>
      <StatusBar style='auto' />
    </Container>
  )
}

export default Main;