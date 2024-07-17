import { View, Text } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function MiniHeader({ label }) {
  return (
    <View className="px-2 my-4 justify-between flex-row items-center">
      <Text
        className="text-xl text-[#4b4bea] dark:text-white"
        style={{
          fontFamily: "SpaceGroteskBold",
        }}
      >
        {label}
      </Text>
      <Text className="text-base text-gray-600 dark:text-neutral-300"
        style={{
            fontFamily: "SpaceGroteskBold",
          }}
      >View All</Text>
    </View>
  );
}
