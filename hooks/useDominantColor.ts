import React from "react";
import { Platform } from "react-native";
import { getColors } from "react-native-image-colors";
import {
  AndroidImageColors,
  IOSImageColors,
} from "react-native-image-colors/build/types";

export const useDominantColor = ({ imageUrl }: { imageUrl: string }) => {
  const [color, setColor] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchColor = async () => {
      try {
        const colors = await getColors(imageUrl, {
          fallback: "#31014B", // any fallback color
          cache: true,
          key: imageUrl,
        });

        const extractedColor =
          Platform.OS === "ios"
            ? (colors as IOSImageColors).background
            : (colors as AndroidImageColors).dominant;

        setColor(extractedColor);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    if (imageUrl) {
      fetchColor();
    }
  }, [imageUrl]);

  return { color };
};
