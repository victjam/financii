import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Animated, Dimensions, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  Box,
  BoxShadow,
  Canvas,
  Fill,
  rect,
  rrect,
} from '@shopify/react-native-skia';
import { useSelector } from 'react-redux';
import { COLORS, Div, Text } from '../../styles/global';
const ShadowButton = ({
  icon,
  text,
  handleTouch,
  ArrowEnabled = true,
}: any) => {
  const { width } = Dimensions.get('window');
  const HEIGHT_BUTTON = 50;
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const selectedColorBg = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;
  const selectedColor = !isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;

  const scale = useSharedValue(1);

  const scaleHandler = Gesture.Tap()
    .onBegin(() => {
      ('worklet');
      scale.value = withSpring(0.95);
    })
    .onFinalize(() => {
      'worklet';
      scale.value = withSpring(1);
    });

  const rScale = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable onPress={() => handleTouch()}>
      <GestureDetector gesture={scaleHandler}>
        <Animated.View
          style={[
            rScale,
            { height: 50, marginBottom: 20, position: 'relative' },
          ]}>
          <Div
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'absolute',
              display: 'flex',
              width: width - 35,
              backgroundColor: 'transparent',
              zIndex: 99,
              top: 20,
              left: 20,
            }}>
            <Div
              flexDirection="row"
              alignItems="center"
              backgroundColor="transparent">
              <Ionicons name={icon} color={selectedColorBg} size={26} />
              <Text
                fontSize={15}
                fontWeight="bold"
                paddingLeft={10}
                color={selectedColorBg}>
                {text}
              </Text>
            </Div>
            {ArrowEnabled && (
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color={selectedColorBg}
              />
            )}
          </Div>
          <Canvas
            style={{
              width: width,
              height: HEIGHT_BUTTON + 30,
              position: 'absolute',
            }}>
            <Fill color={selectedColor} />
            <Box
              box={rrect(rect(10, 10, width - 20, HEIGHT_BUTTON), 5, 5)}
              color={selectedColor}>
              <BoxShadow
                dx={0}
                dy={0}
                blur={5}
                color={
                  isDarkThemeEnable
                    ? COLORS.BLACK_BUTTON_SHADOW
                    : COLORS.GRAY_BUTTON_SHADOW
                }
              />
            </Box>
          </Canvas>
        </Animated.View>
      </GestureDetector>
    </Pressable>
  );
};

export default ShadowButton;
