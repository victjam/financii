import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { COLORS, Div, DivIcon, Text } from '../../styles/global';

// refactor transaccion type
const TransactionList = ({ transactions }: any) => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const selectedColor = isDarkThemeEnable ? COLORS.BLACK : COLORS.WHITE;
  const selectedColorBg = isDarkThemeEnable ? COLORS.WHITE : COLORS.BLACK;
  return transactions?.map((item: any, i: number) => (
    <Div
      key={i}
      style={{
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
          <Text color={COLORS.DARKGRAY}>{item.date}</Text>
        </Div>
      </Div>

      <Div>
        <Text fontWeight="bold" color={item.color}>
          {item.price}
        </Text>
      </Div>
    </Div>
  ));
};

export default TransactionList;
