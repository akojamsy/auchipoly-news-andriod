import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { widthPercentageToDP as wp} from "react-native-responsive-screen";

export default function SplashScreens() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskMedium: require("../fonts/SpaceGrotesk-Medium.ttf"),
    SpaceGroteskSemiBold: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
    SpaceGroteskBold: require("../fonts/SpaceGrotesk-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    setTimeout(() => {
      navigation.navigate("Welcome")
    }, 3000);
  });

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../../assets/images/auchi_polytechnic_cover.jpeg")}
      className="flex-1 justify-center items-center"
    >
      <LinearGradient
        colors={["rgba(34,49,239,0.95)", "rgba(0,85,0,0.95)"]}
        style={{
          position: "absolute",
          bottom: 0,
          height: "100%",
          width: "100%",
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View onLayout={onLayoutRootView}
        className="items-center"
      >
        <Image
          source={require("../../assets/images/logo.png")}
        />
        <Text className="mt-3 text-white uppercase"
          style={{
            fontSize: wp(10),
            fontFamily: "SpaceGroteskBold" 
          }}
        >AuchiPoly News</Text>
      </View>
    </ImageBackground>
  );
}
