import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Switch, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  COLORS,
  Container,
  Div,
  PrimaryButton,
  Text,
  TextButton,
  WrappedBox,
} from '../../styles/global';
import ShadowButton from '../form/ShadowButton';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'DEL'];

const AddTransaction = ({ navigation }: any) => {
  const [total, setTotal] = useState('0');
  const [isEnabled, setIsEnabled] = useState(false);

  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const selectedColor = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const formatStringToPrice = (string: string) => {
    const price = string
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1,');
    return price.split('').reverse().join('').replace(/^[,]/, '');
  };
  const totalNumbers = (value: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const screenNumber = total;
    if (value === 'DEL') {
      setTotal(screenNumber.slice(0, -1));
    } else {
      if (screenNumber.length < 8) {
        setTotal(parseInt(screenNumber + value).toString());
      }
    }
  };

  return (
    <Container>
      <WrappedBox>
        <Div
          backgroundColor="transparent"
          justifyContent="flex-end"
          alignItems="center"
          flex={1}>
          <Div
            width="100%"
            borderRadius={20}
            alignItems="center"
            paddingTop={60}>
            <View
              style={{
                display: 'flex',
                marginBottom: 40,
                alignItems: 'flex-end',
                width: '100%',
                paddingRight: 30,
              }}
            />
            <Div marginBottom={40}>
              <Switch
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                trackColor={{ false: COLORS.SUCCESS, true: COLORS.GRAY }}
                thumbColor={isEnabled ? COLORS.DANGER : COLORS.SUCCESS}
                ios_backgroundColor={COLORS.GRAY}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </Div>
            <Div marginBottom={40}>
              <Text fontSize={70} fontWeight="bold">
                {total ? `$${formatStringToPrice(total)}` : '$0'}
              </Text>
            </Div>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
              }}>
              <FlatList
                data={numbers}
                renderItem={({ item }) => (
                  <Pressable
                    onPressIn={() => {
                      totalNumbers(item);
                    }}>
                    <View
                      style={{
                        marginLeft: 50,
                        marginRight: 50,
                        height: 90,
                        width: 30,
                      }}>
                      {item !== 'DEL' ? (
                        <Text fontSize={25} fontWeight="bold">
                          {item}
                        </Text>
                      ) : (
                        <MaterialIcons
                          name="keyboard-arrow-left"
                          size={30}
                          color={selectedColor}
                        />
                      )}
                    </View>
                  </Pressable>
                )}
                keyExtractor={item => `${item}`}
                showsHorizontalScrollIndicator={false}
                numColumns={numbers.length / 4}
              />
            </ScrollView>
            <Div width="100%">
              <ShadowButton
                text="Agregar categoria"
                ArrowEnabled={false}
                handleTouch={() => navigation.navigate('Categories')}
              />
            </Div>
            <PrimaryButton
              backgroundColor={isEnabled ? COLORS.DANGER : COLORS.SUCCESS}
              width="95%"
              borderRadius={5}
              marginBottom={50}
              onPressIn={() => alert('hola')}>
              <TextButton fontWeight="bold">
                Agregar {isEnabled ? 'Deuda' : 'Saldo'}
              </TextButton>
            </PrimaryButton>
          </Div>
        </Div>
      </WrappedBox>
    </Container>
  );
};

export default AddTransaction;
