import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { COLORS } from '../styles/global';
import { darkTheme, lightTheme } from '../styles/theme';

//fix typoos
const DarkThemeProvider = ({ children }: any) => {
  const activeLoader = () => {
    if (isLoaderEnabled) {
      if (isDarkThemeEnable) {
        return (
          <View
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE,
            }}>
            <LottieView
              source={require('../assets/loader_volumen_white.json')}
              style={{
                height: 100,
                width: 100,
              }}
              autoPlay
            />
          </View>
        );
      }
      return (
        <View
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE,
          }}>
          <LottieView
            source={require('../assets/loader_volumen_black.json')}
            style={{
              height: 100,
              width: 100,
            }}
            autoPlay
          />
        </View>
      );
    } else {
      const themeMode = !isDarkThemeEnable ? lightTheme : darkTheme;
      return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
    }
  };
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const isLoaderEnabled = useSelector(
    (state: any) => state.loader.isLoaderEnabled,
  );
  return activeLoader();
};

export default DarkThemeProvider;
