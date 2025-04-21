import { Image, ImageSourcePropType, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";

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
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, 0.0)",
          "rgba(0, 0, 0, 0.8)",
          "rgba(0, 0, 0, 1)",
        ]}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: -1,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </Animated.View>
  );
};
