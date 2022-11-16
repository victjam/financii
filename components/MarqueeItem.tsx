import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { COLORS, Div, DivIcon, Text } from '../styles/global';

const MarqueeItem = ({ item }: any) => {
  const darkThemeEnabled = useSelector(
    (state: any) => state.theme.preferences.darkThemeEnabled,
  );
  const selectedColor = !darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK;
  const selectedColorBg = darkThemeEnabled ? COLORS.WHITE : COLORS.BLACK;
  return (
    <Div
      style={{
        marginLeft: 15,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <DivIcon
          elevation={8}
          shadowOpacity={0.5}
          shadowColor={item.color}
          backgroundColor={selectedColorBg}
          borderRadius={50}
          align="center"
          paddingLeft={10}
          paddingRight={10}>
          <Ionicons name={item.icon} color={selectedColor} size={20} />
        </DivIcon>
        <Div marginLeft={20}>
          <Text>{item.title}</Text>
          <Text fontWeight="bold" color={item.color}>
            {item.price}
          </Text>
          <Text color={COLORS.DARKGRAY}>{item.date}</Text>
        </Div>
      </Div>
    </Div>
  );
};

export default MarqueeItem;
