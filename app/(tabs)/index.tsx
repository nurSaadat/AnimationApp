import Carousel from "@/components/Carousel";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ height: "100%", justifyContent: "center" }}>
      <Carousel />
    </SafeAreaView>
  );
}
