import { Image, ImageSourcePropType, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const CarouselTile = ({
  item,
  index,
  scrollX,
}: {
  item: ImageSourcePropType;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const { width } = useWindowDimensions();
  const rnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollX.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [-width * 0.4, 0, width * 0.4],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          scrollX.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [0.8, 1, 0.8],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          width: width,
        },
        rnAnimatedStyle,
      ]}
    >
      <Image source={item} style={{ width: 250, height: 250 }} />
    </Animated.View>
  );
};
