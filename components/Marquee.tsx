import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import MarqueeItem from './MarqueeItem';

const itemWidth = Dimensions.get('window').width / 5;

const Marquee = ({ data }: any) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [activeInterval, setActiveInterval] = useState<any>(null);
  const [momentumScrolling, setMomentumScrolling] = useState(false);

  const renderItem = (item: any) => {
    return <MarqueeItem item={item} />;
  };

  useEffect(() => {
    startScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition]);

  const startScroll = () => {
    setActiveInterval(setInterval(scrolling, 32));
  };

  useEffect(() => {
    return () => {
      clearInterval(activeInterval);
    };
  }, [activeInterval]);

  const clearScrolling = () => {
    if (activeInterval) {
      clearInterval(activeInterval);
      setActiveInterval(null);
    }
  };

  const scrolling = () => {
    if (currentPosition < 0) {
      setCurrentPosition(0);
    }
    if (data.length > 3) {
      const position = currentPosition + 1.5;
      flatListRef?.current?.scrollToOffset({
        offset: position,
        animated: true,
      });
      const maxOffset = data.length * itemWidth;
      if (currentPosition > maxOffset) {
        const offset = currentPosition - maxOffset;
        flatListRef?.current?.scrollToOffset({
          offset,
          animated: false,
        });
        setCurrentPosition(offset);
      } else {
        setCurrentPosition(position);
      }
    }
  };

  const onMomentumScrollBegin = () => {
    setMomentumScrolling(true);
    clearScrolling();
  };

  const onMomentumScrollEnd = (event: any) => {
    if (momentumScrolling) {
      setMomentumScrolling(false);
      setCurrentPosition(event.nativeEvent.contentOffset.x);
      startScroll();
    }
  };

  const onScrollBegin = () => {
    setScrolled(true);
    clearScrolling();
  };

  const onScrollEnd = (event: any) => {
    setScrolled(true);
    setCurrentPosition(event.nativeEvent.contentOffset.x);
    startScroll();
  };

  const onTouchBegin = () => {
    clearScrolling();
  };

  const onTouchEnd = () => {
    if (!scrolled) {
      startScroll();
    }
  };

  const getWrappedData = () => {
    const overlappingNo = getOverlappingNo();
    return {
      dataWrapped: [...data, ...data.slice(0, overlappingNo)],
    };
  };

  const getOverlappingNo = () => {
    const { length } = data;
    let overlappingNo = 10;
    if (length < 10) {
      overlappingNo = length;
    }
    return overlappingNo;
  };

  const { dataWrapped } = getWrappedData();
  return (
    <FlatList
      ref={flatListRef}
      initialNumToRender={3}
      decelerationRate="fast"
      onTouchStart={onTouchBegin}
      onTouchEnd={onTouchEnd}
      onScrollBeginDrag={onScrollBegin}
      onScrollEndDrag={onScrollEnd}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      getItemLayout={(_, index) => ({
        length: dataWrapped.length,
        offset: itemWidth * index,
        index,
      })}
      showsHorizontalScrollIndicator={false}
      data={dataWrapped}
      renderItem={({ item }) => renderItem(item)}
      horizontal
      style={styles.wrapper}
      keyExtractor={(item, index) => item.title + index}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 100,
    flexGrow: 0,
  },
});
export default Marquee;
