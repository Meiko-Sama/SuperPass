import React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { getMovies } from '../../data/api';
getMovies
import Genres from './Genre';
import Rating from './Rating';
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

// ----------------- Loading -----------------
const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

// ----------------- Backdrop Item -----------------
const BackdropItem = ({ item, index, scrollX }) => {
  if (!item.backdrop) return null;

  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return { opacity, position: 'absolute', width, height: BACKDROP_HEIGHT };
  });

  return (
    <Animated.View style={style}>
      <Image
        source={item.backdrop}
        style={{ width, height: BACKDROP_HEIGHT, position: 'absolute' }}
      />
    </Animated.View>
  );
};


// ----------------- Backdrop -----------------
const Backdrop = ({ movies, scrollX }) => (
  <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
    {movies
      .slice()
      .map((item, index) => (
        <BackdropItem
          key={item.key + '-backdrop'}
          item={item}
          index={index}
          scrollX={scrollX}
        />
      ))}
    <LinearGradient
      colors={['rgba(0,0,0,0)', 'white']}
      style={{ height: BACKDROP_HEIGHT, width, position: 'absolute', bottom: 0 }}
    />
  </View>
);

// ----------------- Movie Card -----------------
const MovieCard = ({ item, index, scrollX }) => {
  if (!item.poster) return <View style={{ width: EMPTY_ITEM_SIZE }} />;

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollX.value,
      [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE],
      [100, 50, 100],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateY }] };
  });

  return (
    <View style={{ width: ITEM_SIZE }}>
      <Animated.View
        style={[
          {
            marginHorizontal: SPACING,
            padding: SPACING * 2,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 34,
          },
          animatedStyle,
        ]}
      >
        <Image source={item.poster} style={styles.posterImage} />
        <Text style={{ fontSize: 24 }} numberOfLines={1}>
          {item.title}
        </Text>
        <Rating rating={item.rating} />
        <Genres genres={item.genres} />
        <Text style={{ fontSize: 12 }} numberOfLines={3}>
          {item.description}
        </Text>
      </Animated.View>
    </View>
  );
};

// ----------------- App -----------------
export default function Carousel() {
  const [movies, setMovies] = React.useState([]);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const moviesData = await getMovies();
      setMovies([{ key: 'empty-left' }, ...moviesData, { key: 'empty-right' }]);
    };
    fetchData();
  }, []);

  if (movies.length === 0) return <Loading />;

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <MovieCard item={item} index={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    marginBottom: 10,
  },
});
