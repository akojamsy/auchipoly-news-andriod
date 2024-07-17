import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import MiniHeader from "../components/MiniHeader";
import NewsSection from "../components/NewsSection";
import { useGetRecommendedNewsQuery } from "../redux/services/news/newApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


export default function SearchScreen() {
  const navigation = useNavigation();
  // const { isLoading: isRecommendedNewsLoading, data: recommendedNews } = useGetRecommendedNewsQuery({});

  return (
    <SafeAreaView>
      <View className="mx-2 p-3 rounded-lg bg-auchPrimary/5 flex-row justify-between">
        <TextInput className="" placeholder="Search for your news..." />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size={25} strokeWidth={3} color="text-auchiPrimary" />
        </TouchableOpacity>
      </View>
      <View className="mx-4 my-4">
        <Text className="text-xl font-semibold dark:text-white"
          style={{
            fontFamily: "spaceGroteskBold"
          }}
        >
          News for
        </Text>
      </View>
      <ScrollView 
        contentContainerStyle={{
          paddingBottom: hp(5)
        }}
      >
        <NewsSection newsProp={{}} label="Search Results"/>
      </ScrollView>
    </SafeAreaView>
  );
}
