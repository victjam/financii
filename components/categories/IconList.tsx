import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, Container, Div, WrappedBox } from '../../styles/global';

const IconList = ({ navigation }: any) => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const selectedColor = !isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE;
  const getArrayOfKeys = (obj: any) => {
    return Object.keys(obj);
  };

  const getFirst100RandomIcons = () => {
    const arrayOfKeys = getArrayOfKeys(Ionicons.glyphMap);
    const randomIcons = [];
    for (let i = 0; i < 100; i++) {
      const randomIndex = Math.floor(Math.random() * arrayOfKeys.length);
      randomIcons.push(arrayOfKeys[randomIndex]);
    }
    return randomIcons;
  };

  const renderListOfIconsWithFlatList = () => {
    return (
      <FlatList
        style={{ width: '100%' }}
        data={getFirst100RandomIcons()}
        renderItem={({ item }) => (
          <Pressable
            style={{ width: '20%', alignItems: 'center', height: 80 }}
            onPress={() => navigation.navigate('AddCategory', { icon: item })}>
            <Div>
              <Ionicons color={selectedColor} name={item} size={30} />
            </Div>
          </Pressable>
        )}
        keyExtractor={item => item}
        numColumns={5}
      />
    );
  };

  return (
    <Container>
      <WrappedBox>{renderListOfIconsWithFlatList()}</WrappedBox>
    </Container>
  );
};

export default IconList;
