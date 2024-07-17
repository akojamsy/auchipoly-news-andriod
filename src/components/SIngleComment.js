import { View, Text } from "react-native";
import React from "react";
import { UserCircleIcon } from "react-native-heroicons/outline";

export default function SingleComment({date, comment}) {
  return (
    <View className="my-2 border border-gray-300 p-3">
      <View className="flex-row gap-1">
        <UserCircleIcon />
        <View>
          <Text className="text-gray-600">Anonynous</Text>
          <Text className="text-xs text-gray-500">
            {date}
          </Text>
        </View>
      </View>
      <Text className="mt-1 text-gray-500">
        {comment}
      </Text>
    </View>
  );
}
