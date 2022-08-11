
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

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