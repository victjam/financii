import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, Div, Text } from '../../styles/global';
const ShadowButton = ({ icon, text, handleTouch }: any) => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const selectedColorBg = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;
  return (
    <Pressable onPressIn={() => handleTouch()}>
      <Div
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        marginBottom={20}
        height="50px"
        paddingLeft={10}
        paddingRight={10}
        elevation={8}
        shadowOpacity={0.7}
        shadowColor={isDarkThemeEnable ? 'black' : selectedColorBg}
        marginLeft={10}
        marginRight={10}
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        borderRadius={5}>
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
        <MaterialIcons
          name="keyboard-arrow-right"
          size={30}
          color={selectedColorBg}
        />
      </Div>
    </Pressable>
  );
};

export default ShadowButton;
