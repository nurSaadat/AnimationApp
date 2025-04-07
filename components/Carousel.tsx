import { ImageSourcePropType, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { CarouselTile } from "./CarouselTile";

export default function Carousel() {
  const image1: ImageSourcePropType = require("@/assets/images/GGIY.jpg");
  const image2: ImageSourcePropType = require("@/assets/images/GGIR.jpg");
  const image3: ImageSourcePropType = require("@/assets/images/GGIB.jpg");
  const image4: ImageSourcePropType = require("@/assets/images/GGIG.jpg");

  const images = [image1, image2, image3, image4];

  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        overflow: "visible",
        justifyContent: "center",
      }}
    >
      <Animated.FlatList
        data={images}
        renderItem={({ item, index }) => (
          <CarouselTile item={item} index={index} scrollX={scrollX} />
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        pagingEnabled
        scrollEventThrottle={16}
        onEndReachedThreshold={0.5}
        windowSize={3}
        snapToInterval={width}
        decelerationRate={"fast"}
        snapToAlignment="center"
      />
    </View>
  );
}
