import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Props } from '../models/styleProps';
export const windowWidth = Dimensions.get('window').width;

export const REGEX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
};
export const COLORS = {
  WHITE: '#fff',
  BLACK: '#121318',
  DANGER: '#EF473A',
  BLACK_TEXT: '#222222',
  SUCCESS: '#136A8A',
  GRAY: '#DCDCDD',
  GRAY_BUTTON_SHADOW: '#DCDCDD',
  BLACK_BUTTON_SHADOW: '#000000',
  DARKGRAY: '#a3a3a3',
  GREEN: '#00BF8F',
  RED: '#C70039',
  DARKBLUE: '#070f24',
  GRADIENT_DANGER: ['#CB2D3E', '#EF473A'],
  GRADIENT_SUCCESS: ['#136A8A', '#267871'],
  GRADIENT_BLUE: ['#000428', '#004E92'],
};

export const FONTS = {
  xxxs: 10,
  xxs: 15,
  xs: 20,
  s: 30,
  m: 40,
  l: 50,
};
export const global = StyleSheet.create({
  imagePersonal: {
    width: windowWidth,
    height: 300,
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    alignItems: 'center',
    marginBottom: 20,
  },

  centerElement: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
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
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 30,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 25,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 10,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    textAlign: 'left',
  },
  marginBottom: {
    marginBottom: 6,
  },
  image: {
    height: 300,
    width: 300,
  },
  buttonPrimaryText: {
    fontSize: 15,
    color: COLORS.WHITE,
  },
  buttonPrimary: {
    position: 'relative',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 3,
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.BLACK,
    padding: 10,
  },
  buttonContainer: {
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  hyperlinkText: {
    marginBottom: 30,
    marginTop: 10,
    marginLeft: 5,
  },
  highlight: {
    fontWeight: 'bold',
  },
});

/// Components styles
export const Container = styled.SafeAreaView<Props>`
  background-color: ${props =>
    props.backgroundColor || props.theme.PRIMARY_COLOR};
  flex: 1;
  transition: all 0.3s ease;
`;

export const GradientDiv = styled(LinearGradient).attrs((props: Props) => ({
  colors: props.color || ['#6083FE', '#5964FE', '#8825E6'],
  start: props.startDirection || { x: 0, y: 0 },
  end: props.endDirection || { x: 1, y: 1 },
}))<Props>`
  height: ${props => props.height || '350px'};
  border-bottom-left-radius: ${props => props.borderBottomLeftRadius || 5}px;
  border-bottom-right-radius: ${props => props.borderBottomRightRadius || 5}px;
  border-radius: ${props => props.borderRadius || 0}px;
  padding-top: ${props => props.paddingTop || 0}px;
  padding-right: ${props => props.paddingRight || 0}px;
  padding-left: ${props => props.paddingLeft || 0}px;
  padding-bottom: ${props => props.paddingBottom || 0}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrappedBox = styled.View<Props>`
  padding-top: ${props => props.paddingTop || Constants.statusBarHeight}px;
  background-color: ${props =>
    props.backgroundColor || props.theme.PRIMARY_COLOR};
  width: 100%;
  height: 100%;
  padding-left: ${props => props.paddingLeft || 10}px;
  padding-bottom: ${props => props.paddingBottom || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  padding-right: ${props => props.paddingRight || 10}px;
  transition: all 0.3s ease;
`;
export const Div = styled.View.attrs((props: Props) => ({
  shadowColor: props.shadowColor || '#333',
  shadowOffset: {
    width: props.shadowWidth || 0,
    height: props.shadowHeight || 0,
  },
  shadowOpacity: props.shadowOpacity || 0,
  shadowRadius: props.shadowRadius || 4,

  elevation: props.elevation || 0,
}))<Props>`
  justify-content: ${props => props.justifyContent || 'space-between'};
  align-items: ${props => props.alignItems || 'stretch'};
  flex: ${props => props.flex || 'none'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  padding-top: ${props => props.paddingTop || 0}px;
  border-radius: ${props => props.borderRadius || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  margin-right: ${props => props.marginRight || 0}px;
  margin-left: ${props => props.marginLeft || 0}px;
  margin-top: ${props => props.marginTop || 0}px;
  background-color: ${props =>
    props.backgroundColor || props.theme.PRIMARY_COLOR};
  padding-left: ${props => props.paddingLeft || 0}px;
  padding-bottom: ${props => props.paddingBottom || 0}px;
  padding-top: ${props => props.paddingTop || 0}px;
  padding-right: ${props => props.paddingRight || 0}px;
`;
export const DivIcon = styled.View.attrs((props: Props) => ({
  shadowColor: props.shadowColor || '#333',
  shadowOffset: {
    width: props.shadowWidth || 0,
    height: props.shadowHeight || 0,
  },
  shadowOpacity: props.shadowOpacity || 0,
  shadowRadius: props.shadowRadius || 4,

  elevation: props.elevation || 0,
}))<Props>`
  margin-top: ${props => props.marginTop || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  padding-top: ${props => props.paddingTop || 0}px;
  align-items: ${props => props.align || 'left'};
  background-color: ${props =>
    props.backgroundColor || props.theme.PRIMARY_COLOR};
  padding-left: ${props => props.paddingLeft || 0}px;
  padding-top: ${props => props.paddingTop || 0}px;
  padding-right: ${props => props.paddingRight || 0}px;
  display: flex;
  height: 55px
  width: 55px
  align-items: center;
  justify-content: center;
`;

export const Image = styled.View<Props>`
  background: ${props => `url(${props.source}) no-repeat top center`};
  background-position: center;
  height: 340px;
  background-repeat: no-repeat;
`;

export const SText = styled.Text<Props>`
  font-size: 10px;
  font-family: ${props =>
    `SF-pro-${props.fontWeight ? props.fontWeight : 'medium'}` ||
    'SF-pro-medium'};
  text-align: ${props => props.align || 'left'};
  padding-top: ${props => props.paddingTop || 0}px;
  color: ${props => (props.color ? props.color : props.theme.TITLE_COLOR)};
`;
export const DivAnimated = styled(Animated.View).attrs((props: Props) => ({
  shadowColor: props.shadowColor || '#333',
  shadowOffset: {
    width: props.shadowWidth || 0,
    height: props.shadowHeight || 0,
  },
  shadowOpacity: props.shadowOpacity || 0,
  shadowRadius: props.shadowRadius || 4,

  elevation: props.elevation || 0,
}))<Props>`
  justify-content: ${props => props.justifyContent || 'space-between'};
  align-items: ${props => props.alignItems || 'stretch'};
  flex: ${props => props.flex || 'none'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  padding-top: ${props => props.paddingTop || 0}px;
  border-radius: ${props => props.borderRadius || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  margin-right: ${props => props.marginRight || 0}px;
  margin-left: ${props => props.marginLeft || 0}px;
  margin-top: ${props => props.marginTop || 0}px;
  background-color: ${props =>
    props.backgroundColor || props.theme.PRIMARY_COLOR};
  padding-left: ${props => props.paddingLeft || 0}px;
  padding-bottom: ${props => props.paddingBottom || 0}px;
  padding-top: ${props => props.paddingTop || 0}px;
  padding-right: ${props => props.paddingRight || 0}px;
`;

export const Text = styled(Animated.Text)<Props>`
  font-family: ${props =>
    `SF-pro-${props.fontWeight ? props.fontWeight : 'medium'}` ||
    'SF-pro-medium'};
  font-size: ${props => props.fontSize || '18'}px;
  padding-top: ${props => props.paddingTop || 0}px;
  padding-left: ${props => props.paddingLeft || 0}px;
  padding-right: ${props => props.paddingRight || 0}px;
  padding-bottom: ${props => props.paddingBottom || 0}px;
  text-align: ${props => props.align || 'left'};
  font-weight: ${props => props.fontWeight || 'normal'};
  color: ${props => (props.color ? props.color : props.theme.TITLE_COLOR)};
`;
export const TextButton = styled.Text<Props>`
  font-family: ${props =>
    `SF-pro-${props.fontWeight ? props.fontWeight : 'medium'}` ||
    'SF-pro-medium'};
  font-size: ${props => props.fontSize || '14'}px;
  padding-top: ${props => props.paddingTop || 0}px;
  text-align: ${props => props.align || 'left'};
  color: ${props =>
    props.color ? props.color : props.theme.BUTTON_TITLE_COLOR};
`;
export const LGText = styled.Text<Props>`
  font-size: 30px;
  font-family: ${props =>
    `SF-pro-${props.fontWeight ? props.fontWeight : 'medium'}` ||
    'SF-pro-medium'};
  padding-top: ${props => props.paddingTop || 0}px;
  text-align: ${props => props.align || 'left'};
  color: ${props => (props.color ? props.color : props.theme.TITLE_COLOR)};
`;
export const XLGText = styled.Text<Props>`
  font-size: 50px;
  font-family: ${props =>
    `SF-pro-${props.fontWeight ? props.fontWeight : 'medium'}` ||
    'SF-pro-bold'};
  font-weight: ${props => props.fontWeight || 'normal'};
  padding-top: ${props => props.paddingTop || 0}px;
  text-align: ${props => props.align || 'left'};
  color: ${props => (props.color ? props.color : props.theme.TITLE_COLOR)};
`;

export const InputField = styled.TextInput<Props>`
  color: ${props => (props.color ? props.color : props.theme.TITLE_COLOR)};
  border-width: 1px;
  border-radius: 5px;
  height: 40px;
  font-size: 14px;
  padding: 10px;
  border-color: ${props =>
    props.color ? props.color : props.theme.TITLE_COLOR};
`;

export const PrimaryButton = styled.Pressable.attrs((props: Props) => ({
  disabled: props.disabled || false,
}))<Props>`
  background: ${props => props.backgroundColor || props.theme.BUTTON_COLOR}
  height: ${props => props.height || '50px'};
  width: ${props => props.width || 'auto'};
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  text-align: center;
  display: flex;
  align-items: center;
`;

export const PrimaryButtonWithIcon = styled.Pressable<Props>`
  background: ${props => props.theme.BUTTON_COLOR}
  height: ${props => props.height || '50px'};
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  display: flex;
  align-items: center;
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
  border: 1px solid ${props => props.theme.BUTTON_COLOR};
  transition: all 0.3s ease;
`;
export const ThemeButtonText = styled.Text<Props>`
  font-size: 16px;
  color: ${props => props.theme.BUTTON_COLOR};
  transition: all 0.3s ease;
`;
export const TitleText = styled.Text<Props>`
  font-weight: 600;
  font-size: ${props => props.fontSize || '18px'};
  color: ${props => (props.color ? props.color : props.theme.TITLE_COLOR)};
  transition: all 0.3s ease;
`;
export const PostContainer = styled.View`
  padding: 10px 20px;
  width: 100%;
`;
