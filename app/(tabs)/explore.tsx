import { useImageColors } from "@/hooks/useImageColors";
import { Image, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function GradientScreen() {
  const image = require("@/assets/images/GGIY.jpg");

  const { color } = useImageColors({
    imageUrl: image,
  });

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color || "#FFFFFF",
      }}
    >
      <Image source={image} style={{ width: 250, height: 250 }} />
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
    </View>
  );
}
