import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/theme';
import {
  Container,
  Text,
  TitleText,
  Header,
  ThemeButton,
  ThemeButtonText,
} from '../styles/global';

//fix typoos
const DarkThemeProvider = ({ children }: any) => {
  const darkThemeEnabled = useSelector(
    (state: any) => state.theme.preferences.darkThemeEnabled,
  );
  const themeMode = !darkThemeEnabled ? lightTheme : darkTheme;
  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

export default DarkThemeProvider;
