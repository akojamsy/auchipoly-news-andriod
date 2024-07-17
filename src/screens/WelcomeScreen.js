import {
  View,
  Text,
  ImageBackground,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation()

  return (
    <ImageBackground
      source={require("../../assets/images/welcome.jpeg")}
      className="flex-1 justify-end items-center pb-6"
    >
      <LinearGradient
        colors={["transparent", "rgba(34,49,239,0.5)"]}
        style={{
          position: "absolute",
          bottom: 0,
          height: "100%",
          width: "100%",
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View className="w-4/5">
        <View className="w-[90%] mx-auto items-center">
          <Text
            className="text-white text-4xl font-semibold"
            style={{
              fontSize: wp(10),
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Stay Informed from Day One
          </Text>
          <Text
            className="my-3 text-white"
            style={{
              fontSize: wp(3.8),
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Discover the Latest News with our Seamless Onboarding Experience
          </Text>
        </View>
        <TouchableOpacity className="mt-4 text-white bg-blue-600 p-4 rounded-full items-center"
          onPress={() => navigation.navigate("HomeTabs")}
        >
          <Text className="text-white"
            style={{
              fontSize: wp(3.8),
              fontFamily: "SpaceGroteskBold",
            }}
          >Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
