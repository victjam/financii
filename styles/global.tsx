
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';
import { Props } from '../models/styleProps'
export const windowWidth = Dimensions.get('window').width;

export const REGEX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g
}
export const COLORS = {
  white: '#fff',
  black: '#333',
  gray: '#DCDCDD',
  darkGray: '#a3a3a3',
  green: '#315917',
  danger: '#C70039',
  darkBlue: '#070f24'
}

export const FONTS = {
  xxxs: 10,
  xxs: 15,
  xs: 20,
  s: 30,
  m: 40,
  l: 50,
}
export const global = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  initialPadding: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  initialMargin: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  h1: {
    fontSize: 50,
    color: COLORS.black,
    fontWeight: 'bold'
  },
  h2: {
    fontSize: 30,
    color: COLORS.black,
    fontWeight: 'bold'
  },
  h3: {
    fontSize: 25,
    color: COLORS.black,
    fontWeight: 'bold'
  },
  h5: {
    fontSize: 10,
    color: COLORS.black,
    fontWeight: 'bold'
  },
  center: {
    textAlign: 'center'
  },
  centerElement: {
    display: 'flex',
    alignSelf: 'stretch',
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    textAlign: 'left'
  },
  marginBottom: {
    marginBottom: 6,
  },
  image: {
    height: 300,
    width: 300
  },
  buttonPrimaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
  buttonPrimary: {
    position: 'relative',
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 3,
    borderColor: COLORS.black,
    borderRadius: 5,
    fontWeight: 'bold',
    backgroundColor: COLORS.black,
    padding: 10
  },
  buttonContainer: {
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  hyperlinkText: {
    marginBottom: 30,
    marginTop: 10,
    marginLeft: 5
  },
  highlight: {
    fontWeight: 'bold'
  },
});

/// styled 
import styled from 'styled-components/native';
import Constants from 'expo-constants';
export const Container = styled.SafeAreaView<Props>`
    background-color: ${(props) => props.theme.PRIMARY_COLOR};
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
    padding-top: ${Constants.statusBarHeight + 'px'};
    transition: all .3s ease;
`;
export const Header = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;
export const ThemeButton = styled.Pressable<Props>`
    padding: 10px;
    border: 1px solid ${(props) => props.theme.BUTTON_COLOR};
    transition: all .3s ease;
`;
export const ThemeButtonText = styled.Text<Props>`
    font-size: 16px;
    color: ${(props) => props.theme.BUTTON_COLOR};
    transition: all .3s ease;
`;
export const TitleText = styled.Text<Props>`
    font-weight: 600;
    font-size: ${(props) => props.fontSize || '18px'};
    color: ${(props) => props.theme.TITLE_COLOR};
    transition: all .3s ease;
`;
export const PostContainer = styled.View`
    padding: 10px 20px;
    width: 100%;
`;
export const Text = styled.Text<Props>`
    color: ${(props) => props.theme.SECONDARY_COLOR};
    transition: all .3s ease;
    font-size: 16px;
    padding: 10px 0 0;
    font-weight: ${(props) => props.fontWeight || '400'};
`;