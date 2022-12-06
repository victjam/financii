import {
  Box,
  BoxShadow,
  Canvas,
  Fill,
  LinearGradient,
  rect,
  rrect,
  useComputedValue,
  useLoop,
  vec,
} from '@shopify/react-native-skia';
import { Dimensions, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../styles/global';

const BackgroundDiv = ({ children, height }: any) => {
  const darkTheme = useSelector((state: any) => state.theme.darkThemeEnabled);
  const selectedColor = darkTheme ? COLORS.BLACK : COLORS.WHITE;

  const loop = useLoop({ duration: 2000 });
  const { width } = Dimensions.get('window');

  const colorNoise = useComputedValue(() => {
    return vec(500, loop.current * 700);
  }, [loop]);
  return (
    <View
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        padding: 10,
        paddingLeft: 20,
        paddingTop: 30,
      }}>
      {children}
      <Canvas style={{ width: width, height: height, position: 'absolute' }}>
        <Fill color={selectedColor} />
        <Box box={rrect(rect(10, 20, width - 20, 200), 10, 10)} color="#add8e6">
          <BoxShadow dx={0} dy={0} blur={6} color="#5E4AE3" inner />
          <LinearGradient
            start={vec(0, 0)}
            end={colorNoise}
            colors={['#05299E', '#F26CA7']}
          />
        </Box>
      </Canvas>
    </View>
  );
};

export default BackgroundDiv;
