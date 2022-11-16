import React, { useState } from 'react'
import { COLORS, Text, Div, PrimaryButton, TextButton} from '../styles/global';
import { FlatList, View, Pressable, ScrollView, Modal, Switch } from 'react-native'
import * as Haptics from 'expo-haptics';
import { useSelector } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons'; 


const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};


const numbers = [1,2,3,4,5,6,7,8,9, '', 0, 'DEL'];

const DebitKeyboard = ({modalVisible, handleModal}: any) => {
  const [total, setTotal] = useState("0");
  const [isEnabled, setIsEnabled] = useState(false);

const darkThemeEnabled = useSelector((state: any) => state.theme.preferences.darkThemeEnabled);
const selectedColor = darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK;

const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const formatStringToPrice = (string: string) => {
    const price = string.split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1,');
    return price.split('').reverse().join('').replace(/^[,]/, '');
  }
  const totalNumbers = (value: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    const screenNumber = total
    if (value === 'DEL') {
        setTotal(screenNumber.slice(0, -1))
    }else {
      if (screenNumber.length < 8) {
        setTotal(parseInt(screenNumber + value).toString());
      }
    }
    }

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // alert("close")
        }}
        onDismiss={() => {
          setTotal("0")
          setIsEnabled(false)
        }}
        onShow={() => {
          setTotal("0")
          setIsEnabled(false)
        }}
      >
        <Div backgroundColor="transparent" justifyContent="flex-end" alignItems="center" flex={1}>
          <Div  width="100%" borderRadius={20} alignItems="center" paddingTop={60}>
              <View style={{display: 'flex', marginBottom: 40, alignItems: 'flex-end', width: '100%', paddingRight: 30}}>
                <Pressable onPressIn={() => handleModal()}>
              <MaterialIcons name="close" size={30} color={selectedColor} />
                </Pressable>
              </View>
              <Div marginBottom={40}>
            <Switch
           style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        trackColor={{ false: COLORS.SUCCESS, true: COLORS.GRAY }}
        thumbColor={isEnabled ? COLORS.DANGER : COLORS.SUCCESS}
        ios_backgroundColor={COLORS.GRAY}
        onValueChange={toggleSwitch}
        value={isEnabled}
      /></Div>
            <Div marginBottom={40}>
            <Text  fontSize={70} fontWeight="bold">{total ? `$${formatStringToPrice(total)}` : "$0"}</Text>
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
                      <Pressable  onPressIn={
                        () => { totalNumbers(item) }
                       }>
                  <View style={{ marginLeft: 50, marginRight: 50, height: 70, width: 30 }}>
                      {
                        item !== 'DEL' ? 
                        <Text fontSize={25} fontWeight="bold">{item}</Text> :
                          <MaterialIcons name="keyboard-arrow-left" size={30} color={selectedColor} />
                      }
                   
                    </View>
                  </Pressable>
                )}
                keyExtractor={item => `${item}`}
                showsHorizontalScrollIndicator={false}
                numColumns={numbers.length / 4}
              />
            </ScrollView>
            <PrimaryButton backgroundColor={isEnabled ? COLORS.DANGER : COLORS.SUCCESS} width='80%' borderRadius={20} marginBottom={50} onPressIn={()=> handleModal()}>
            <TextButton fontWeight="bold">Agregar {isEnabled ? 'Deuda' : 'Platica'}</TextButton>
          </PrimaryButton>
          </Div>
        </Div>
        
      </Modal>
  )
}

export default DebitKeyboard