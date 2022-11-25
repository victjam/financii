import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../styles/global';

const Loader = ({ children }: any) => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const isLoading = useSelector((state: any) => state.loader.isLoaderEnabled);
  const activeLoader = () => {
    if (isLoading) {
      if (isDarkThemeEnable) {
        return (
          <View
            style={{
              height: '110%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 99,
              backgroundColor: isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE,
            }}>
            <LottieView
              source={require('../assets/loader_volumen_white.json')}
              style={{ height: 100, width: 100 }}
              autoPlay
            />
          </View>
        );
      }
      return (
        <LottieView
          source={require('../assets/loader_volumen_black.json')}
          style={{ height: 100, width: 100 }}
          autoPlay
        />
      );
    }
    return children;
  };
  return activeLoader();
};

export default Loader;
