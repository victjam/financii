import * as Haptics from 'expo-haptics';
import gaussian from 'gaussian';
import { ScrollView } from 'react-native';

import { LineGraph } from 'react-native-graph';
import { useSelector } from 'react-redux';
import TransactionList from '../components/transactions/TransactionList';
import { Container, Div, LGText, Text, WrappedBox } from '../styles/global';
const Transactions = () => {
  const transactions = useSelector(
    (state: any) => state.transactions.transactions,
  );
  const weightedRandom = (mean: number, variance: number) => {
    var distribution = gaussian(mean, variance);
    // Take a random sample using inverse transform sampling method.
    return distribution.ppf(Math.random());
  };

  const generateRandomGraphData = (length: number) => {
    return Array<number>(length)
      .fill(0)
      .map((_, index) => ({
        date: new Date(index),
        value: weightedRandom(10, Math.pow(index + 1, 2)),
      }));
  };

  const onPointSelected = p => {
    console.log(p.value);
  };
  // const onPointSelected = useCallback(
  //   (p: any) => {
  //     console.log(p);

  //     const selectedPrice = p.value;

  //     title.value = selectedPrice;
  //     // subtitle.value = timestamp.toFormat('d MMM yyyy HH:mm');
  //   },
  //   [title],
  // );

  return (
    <Container>
      <WrappedBox>
        <ScrollView>
          <Div>
            <LGText fontWeight="bold">Lista de transaciones</LGText>
            <Text>{''}</Text>
          </Div>
          <Div>
            <Div height="170px" style={{ paddingTop: 20 }}>
              <LineGraph
                style={{
                  height: '100%',
                  padding: 0,
                  width: '100%',
                  borderColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                verticalPadding={10}
                points={generateRandomGraphData(10)}
                gradientFillColors={['#7476df5D', '#7476df4D', '#7476df00']}
                color="#4484B2"
                onPointSelected={p => onPointSelected(p)}
                enablePanGesture={true}
                onGestureStart={() =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }
                animated={true}
              />
            </Div>
            <TransactionList transactions={transactions} />
          </Div>
        </ScrollView>
      </WrappedBox>
    </Container>
  );
};

export default Transactions;
