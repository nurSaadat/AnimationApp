import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useDominantColor } from "@/hooks/useDominantColor";
import { Image, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 250;

export default function GradientScreen() {
  const image = require("@/assets/images/GGIY.jpg");

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const { top } = useSafeAreaInsets();

  const { color } = useDominantColor({
    imageUrl: image,
  });

  const album = [
    { author: "nurSaadat", title: "Check box" },
    { author: "nurSaadat", title: "Background color" },
    { author: "nurSaadat", title: "Toggle switch" },
    { author: "nurSaadat", title: "Shadows" },
    { author: "nurSaadat", title: "Linear gradient" },
    { author: "nurSaadat", title: "Blur" },
    { author: "nurSaadat", title: "Image colors" },
    { author: "nurSaadat", title: "Border radius" },
    { author: "nurSaadat", title: "Text font" },
    { author: "nurSaadat", title: "Padding" },
    { author: "nurSaadat", title: "Alignment" },
    { author: "nurSaadat", title: "Width" },
  ];

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [0, 0, HEADER_HEIGHT * 0.5]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT / 2],
            [1, 1, 0.5]
          ),
        },
      ],
      opacity: interpolate(
        scrollOffset.value,
        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
        [1, 1, 0]
      ),
    };
  });

  return (
    <LinearGradient
      colors={
        color
          ? ["rgba(0,0,0,0.0)", "rgba(0,0,0,1)", "rgba(0,0,0,1)"]
          : ["#000", "#000"]
      }
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: color || "#000",
      }}
    >
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={1}
        scrollIndicatorInsets={{ bottom, top }}
        contentContainerStyle={{ paddingBottom: bottom }}
        bounces={false}
      >
        <LinearGradient
          colors={
            color
              ? [
                  "rgba(0,0,0,0.0)",
                  "rgba(0,0,0,0.2)",
                  "rgba(0,0,0,0.5)",
                  "rgba(0,0,0,1)",
                ]
              : ["#000", "#000"]
          }
          style={{
            width: "100%",
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Animated.View
            style={[
              {
                height: HEADER_HEIGHT + top,
                overflow: "hidden",
                alignItems: "center",
                paddingTop: top,
              },

              headerAnimatedStyle,
            ]}
          >
            <Image
              source={image}
              style={[
                {
                  width: 250,
                  height: 250,
                  borderRadius: 4,
                },
                {
                  shadowOffset: {
                    width: 0,
                    height: -4,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  shadowColor: "black",
                },
              ]}
            />
          </Animated.View>
        </LinearGradient>
        <View
          style={{ padding: 32, overflow: "hidden", backgroundColor: "#000" }}
        >
          {album.map((item, index) => (
            <View
              key={`item-${index}`}
              style={{
                height: 60,
                backgroundColor: "#000",
                width: "100%",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#1f1f1f",
                flexDirection: "row",
                gap: 16,
              }}
            >
              <Image
                source={image}
                style={[
                  {
                    width: 44,
                    height: 44,
                    borderRadius: 4,
                    shadowColor: "black",
                  },
                  {
                    shadowOffset: {
                      width: 0,
                      height: -4,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 3,
                  },
                ]}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: "#afafaf" }}>{item.author}</Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
}
