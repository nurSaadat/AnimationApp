import { View } from "react-native";

export const CarouselIndicator = ({
  itemsCount,
  currentIndex,
}: {
  itemsCount: number;
  currentIndex: number;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Array.from({ length: itemsCount }).map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 8,
            backgroundColor: index === currentIndex ? "white" : "grey",
            marginHorizontal: 4,
          }}
        />
      ))}
    </View>
  );
};
