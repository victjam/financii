import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../styles/global';
const Loader = () => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const isLoading = useSelector((state: any) => state.loader.isLoaderEnabled);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(isLoading);
    console.log('loader', loader);
  }, [isLoading, loader]);

  const activeLoader = () => {
    if (isDarkThemeEnable) {
      return (
        <Modal animationType="slide" transparent visible={loader}>
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
        </Modal>
      );
    }
    return (
      <Modal animationType="slide" transparent visible={loader}>
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
            source={require('../assets/loader_volumen_black.json')}
            style={{ height: 100, width: 100 }}
            autoPlay
          />
        </View>
      </Modal>
    );
  };
  return activeLoader();
};

export default Loader;
