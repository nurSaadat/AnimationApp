import {
  ImageSourcePropType,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { CarouselTile } from "./CarouselTile";
import { CarouselIndicator } from "./CarouselIndicator";
import { useRef, useState } from "react";

const createViewableItemsChangedHandler = (
  containerLength: number,
  setPaginationIndex: (index: number) => void
) => {
  return ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const index = viewableItems[0]?.index;
    if (index !== undefined && index !== null) {
      const newIndex = index % containerLength;
      setPaginationIndex(newIndex);
    }
  };
};

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

  const [paginationIndex, setPaginationIndex] = useState(0);

  const onViewableItemsChanged = createViewableItemsChangedHandler(
    images.length,
    setPaginationIndex
  );

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: onViewableItemsChanged,
    },
  ]);

  return (
    <View
      style={{
        width: "100%",
        overflow: "visible",
        justifyContent: "center",
        alignItems: "center",
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
        windowSize={3}
        snapToInterval={width}
        decelerationRate={"fast"}
        snapToAlignment="center"
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <CarouselIndicator
        itemsCount={images.length}
        currentIndex={paginationIndex}
      />
    </View>
  );
}
