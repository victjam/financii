import {
  Canvas,
  Group,
  LinearGradient,
  rect,
  RoundedRect,
  rrect,
  Text,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import { View } from 'react-native';
const ButtonWithBorder = ({
  width,
  height,
  backgroundColor,
  text,
  fontSize,
  colors,
}: any) => {
  const font = useFont(
    require('../assets/fonts/SF-Pro-Rounded-Medium.otf'),
    fontSize,
  );
  if (font === null) {
    return null;
  }

  const textWidth = font?.getTextWidth(text);
  return (
    <View
      style={{
        position: 'relative',
        width: width,
        height: height,
      }}>
      <Canvas
        style={{
          width: width,
          height: height,
          position: 'absolute',
        }}>
        <Group clip={rrect(rect(10, 15, width - 20, height - 30), 5, 5)}>
          <RoundedRect
            rect={rrect(rect(10, 15, width - 20, height - 30), 5, 5)}
          />
          <LinearGradient start={vec(0, 0)} end={vec(150, 0)} colors={colors} />
          <RoundedRect
            rect={rrect(rect(13, 18, width - 26, height - 36), 5, 5)}
            color={backgroundColor}
          />
          <Text
            x={(width - textWidth) / 2}
            y={height / 2 + 5}
            text={text}
            font={font}
          />
        </Group>
      </Canvas>
    </View>
  );
};

export default ButtonWithBorder;
