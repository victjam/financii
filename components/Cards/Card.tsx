import { StyleSheet, View } from 'react-native';
import { COLORS, Text } from '../../styles/global';
import { formatToPrice } from '../../util/util';
import BackgroundDiv from '../BackgroundDiv';

const Card = ({ width }: any) => {
  const checkTimeToSayGreetings = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      return 'Buenos dias';
    } else if (hour >= 12 && hour < 18) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  };

  return (
    <BackgroundDiv colors={['#05299E', '#F26CA7']} width={width} height={240}>
      <View style={[styles.divContainerText]}>
        <View>
          <Text color={COLORS.WHITE}>
            {checkTimeToSayGreetings()}, {'Victor'}.
          </Text>
          <Text paddingTop={5} color={COLORS.WHITE}>
            Tu balance
          </Text>
          <Text
            paddingTop={10}
            fontWeight="bold"
            fontSize={35}
            color={COLORS.WHITE}>
            {formatToPrice(20000)}
          </Text>
        </View>
        <Text fontSize={15} color={COLORS.WHITE}>
          Tarjeta personal
        </Text>
      </View>
    </BackgroundDiv>
  );
};

const styles = StyleSheet.create({
  addButton: {
    height: 80,
    zIndex: 99,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divContainerText: {
    zIndex: 99,
    height: 220,
    paddingTop: 30,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
});
export default Card;
