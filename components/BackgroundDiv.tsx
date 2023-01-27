import {
  Box,
  BoxShadow,
  Canvas,
  Circle,
  Fill,
  Group,
  LinearGradient,
  Path,
  rect,
  rrect,
  useComputedValue,
  useLoop,
  vec,
} from '@shopify/react-native-skia';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../styles/global';

const BackgroundDiv = ({
  children,
  height,
  width,
  colors,
  enableShadow = false,
  shadowColor,
}: any) => {
  const darkTheme = useSelector((state: any) => state.theme.darkThemeEnabled);
  const selectedColor = darkTheme ? COLORS.BLACK : COLORS.WHITE;

  const loop = useLoop({ duration: 2000 });
  const rectInfo = rrect(rect(10, 15, width - 20, height - 30), 5, 5);
  const colorNoise = useComputedValue(() => {
    return vec(500, loop.current * 700);
  }, [loop]);
  return (
    <View
      style={{
        position: 'relative',
        width: width,
        height: height,
      }}>
      {children}
      <Canvas style={{ width: width, height: height, position: 'absolute' }}>
        <Group clip={rectInfo}>
          <Fill color={selectedColor} />
          <Box box={rectInfo} color="#add8e6">
            {enableShadow && (
              <BoxShadow dx={0} dy={0} blur={5} color={shadowColor} />
            )}
            <LinearGradient
              start={vec(0, 0)}
              end={colorNoise}
              colors={colors}
            />
          </Box>
          <Path
            path="M0,96L24,112C48,128,96,160,144,165.3C192,171,240,149,288,122.7C336,96,384,64,432,48C480,32,528,32,576,48C624,64,672,96,720,122.7C768,149,816,171,864,197.3C912,224,960,256,1008,250.7C1056,245,1104,203,1152,160C1200,117,1248,75,1296,58.7C1344,43,1392,53,1416,58.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            color="white"
            opacity={0.1}
          />
          <Circle cx={90} cy={0} r={90} opacity={0.1} color="white" />
          <Circle cx={390} cy={-40} r={90} opacity={0.1} color="white" />
        </Group>
      </Canvas>
    </View>
  );
};

export default BackgroundDiv;
