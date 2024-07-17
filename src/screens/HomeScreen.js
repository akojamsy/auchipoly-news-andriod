// HomeScreen.js
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import BreakingNews from "../components/BreakingNews";
import Loading from "../components/Loading";
import MiniHeader from "../components/MiniHeader";
import NewsSection from "../components/NewsSection";
import { useGetNewsQuery } from "../redux/services/news/newApi";

export default function HomeScreen() {
  
  const { colorScheme } = useColorScheme();

  const {data, isLoading} = useGetNewsQuery()

  return (
    <SafeAreaView>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      {/* <Header /> */}
      <ScrollView contentContainerStyle={{ paddingBottom: hp(10), paddingTop: hp(5) }}>
        <View style={{ padding: wp(4) }}>
          <MiniHeader label="Breaking News" />
          {isLoading ? (
            <Loading />
          ) : (
            <BreakingNews data={data?.data}/>
          )}
        </View>
        {/* <Text className="text-black">{JSON.stringify(data.data[0])}</Text> */}
        <View>
          <MiniHeader label="Recommended News" />
          {isLoading ? (
            <Loading />
          ) : (
            <NewsSection newsProp={data?.data}/>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


