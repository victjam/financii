import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Category } from '../../models/Category';
import { Text } from '../../styles/global';
import { upperCaseFirstLetter } from '../../util/util';
const LIST_ITEM_HEIGHT = 100;

const CategoryRenderList = ({
  category,
  onDismiss,
  simultaneousHandlers,
  isFiltering,
}: any) => {
  const navigation = useNavigation();
  const translationX = useSharedValue(0);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translationX.value = event.translationX;
    },
    onEnd: event => {
      const shouldDelete = event.translationX < TRANSLATE_X_THRESHOLD;
      if (shouldDelete) {
        translationX.value = withTiming(-SCREEN_WIDTH, { duration: 300 });
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, { duration: 300 }, (isFinished: any) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(category);
          }
        });
      } else {
        translationX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationX.value }],
    };
  });

  const rIconContainer = useAnimatedStyle(() => {
    return {
      opacity: withTiming(translationX.value < TRANSLATE_X_THRESHOLD ? 1 : 0, {
        duration: 300,
      }),
    };
  });

  const rItemContainer = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const selectCategory = (category: Category) => {
    if (!isFiltering) {
      navigation.navigate('AddCategory', {
        category: category,
        updated: true,
      });
    } else {
      navigation.navigate('Transactions', {
        categoryId: category.id,
      });
    }
  };
  return (
    <Animated.View style={[rItemContainer, styles.container]}>
      <Animated.View style={[styles.iconContainer, rIconContainer]}>
        <Ionicons name="trash" size={50} color="red" />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        activeOffsetX={[-10, 10]}
        onGestureEvent={panGesture}>
        <Animated.View style={rStyle}>
          <Pressable onPress={() => selectCategory(category)}>
            <Animated.View
              style={[
                styles.itemContainer,
                rItemContainer,
                { backgroundColor: category?.color },
              ]}>
              <Text fontSize={22} fontWeight="bold" color="white">
                {upperCaseFirstLetter(category.title)}
              </Text>
              <Ionicons name={category.icon} size={30} color="white" />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 120,
  },
  iconContainer: {
    height: 50,
    width: 50,
    position: 'absolute',
    right: 0,
    top: '50%',
  },

  itemContainer: {
    height: LIST_ITEM_HEIGHT,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowWidth: 0,
    elevation: 6,
    shadowHeight: 4,
    shadowRadius: 4,
    shadowOpacity: 0.9,
    shadowColor: '#0D365F',
    paddingBottom: 10,
    backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});

export default CategoryRenderList;
