import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

export default function DiscoverScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <SafeAreaView className="pt-8 flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View>
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-3xl text-[#4b4bea] dark:text-white"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Discover
          </Text>
          <Text
            className="text-base text-gray-600 dark:text-neutral-300"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            News from all over the world
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
