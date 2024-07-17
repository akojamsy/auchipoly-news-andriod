import { View, Text, Switch, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useColorScheme } from "nativewind";
import { MagnifyingGlassIcon, MoonIcon, SunIcon } from "react-native-heroicons/outline";

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-end items-center mx-4 mt-4">
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-8 h-8"
        />
      </TouchableOpacity> */}
      <View className="flex-row space-x-4 rounded-full justify-center items-center">
        
        <TouchableOpacity
          value={colorScheme == "dark"}
          className="bg-gray-200 darK:bg-[#4b4bea] rounded-full p-2"
          onPress={() => navigation.navigate("Search")}
        >
          <MagnifyingGlassIcon
            size={20}
            strokeWidth={2}
            color={colorScheme == "dark" ? "white" : "#4b4bea"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleColorScheme}>
          {colorScheme === "dark" && <SunIcon size={25} strokeWidth={2}/>}
          {colorScheme === "light" && <MoonIcon size={25} strokeWidth={2}/> }
        </TouchableOpacity>
      </View>
    </View>
  );
}
