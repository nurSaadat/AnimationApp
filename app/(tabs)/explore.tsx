import { useImageColors } from "@/hooks/useGetColors";
import { Image, View } from "react-native";

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
    </View>
  );
}
