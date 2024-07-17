import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  ChevronLeftIcon,
  ShareIcon
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDate } from "../../utils/functions";
import SingleComment from "../components/SIngleComment";

export default function NewsDetailsScreen() {
  const navigation = useNavigation();
  const toggleBookerAndShare = () => {};

  const route = useRoute();
  const news = route.params;

  return (
    <SafeAreaView>
      <View className="w-full flex-row justify-between items-center p-4 bg-white">
        <View className="bg-gray-100 p-2 rounded-full items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="25" color={"gray"} strokeWidth={3} />
          </TouchableOpacity>
        </View>
        <View className="space-x-3 rounded-full item-center justify-center flex-row">
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <ShareIcon size="25" color="gray" strokewidth={3} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View className="pb-20">
          <Image
            source={{ uri: news?.image?.url|| `https://images.pexels.com/photos/9222122/pexels-photo-9222122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2` }}
            style={{ width: "100%", height: 300 }}
            className="rounded-b-3xl"
          />
          <View className="px-5">
            <Text className="mt-5 mb-2 text-lg text-gray-800 font-bold">
              {news?.title}
            </Text>
            <View className="flex-row gap-x-3 mb-3">
              <Text className="text-xs text-gray-500">
                {formatDate(news?.createdAt)}
              </Text>
              <Text className="text-xs text-auchPrimary font-bold">
                {news?.author?.length > 20
                  ? news?.author?.slice(0, 20) + "..."
                  : news?.author}
              </Text>
            </View>
            <Text className="text-gray-600">{news?.content}</Text>
            <View className="mt-4">
              <Text className="text-orange-600">2 comments</Text>
              <SingleComment
                date={formatDate(news?.publishedAt)}
                comment=" The politcal parties rulling our country since 2004 has no
                    concern for the citizen"
              />
              <View className="mt-3">
                <TextInput
                  className="border border-gray-300 rounded-md h-28 w-full p-3"
                  onChangeText={(text) => null}
                  placeholder="type something ..."
                  textAlignVertical={Platform.OS === 'android' ? 'top' : 'auto'}
                  // ref={InputRef}
                />
                <TouchableOpacity className="w-1/3 ml-auto bg-auchPrimary mt-4 p-3 rounded-md items-center">
                  <Text className="text-white mr-3">Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
