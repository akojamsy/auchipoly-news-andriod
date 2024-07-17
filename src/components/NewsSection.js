// NewsSection.js
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { formatDate } from '../../utils/functions';

export default function NewsSection({ newsProp , data}) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('NewsDetails', item);
  };

//   const formatDate =(isoDate) =>{
//     const options = {
//         weekday:"short",
//         day: "2-digit",
//         month: "short",
//         year: "numeric"
//     }

//     const date = new Date(isoDate)
//     return date.toLocaleDateString(undefined, options)
//   }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity className="mx-4 mb-4 space-y-1" onPress={() => handleClick(item)}>
        <View className="flex-row justify-start w-[100%] shadow-sm">
          <Image
            source={{ uri: item?.image?.url || `https://images.pexels.com/photos/9222122/pexels-photo-9222122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}}
            style={{
              width: hp(9),
              height: hp(10),
            }}
          />
        {/* content */}
            <View className="w-[70%] pl-4 justify-center space-y-1">
                <Text>
                    {item?.author?.length >20 ? item?.author?.slice(0,20) + '...': item?.author}
                </Text>

                <Text 
                className="text-xs font-bold text-gray-900 dark:text-neutral-300" 
                style={{fontSize:hp(1.7)}}
                > 
                    {
                        item?.title?.length > 50 ? item?.title?.slice(0,50) + '...': item?.title
                    }
                </Text>
                <Text className="text-xs text-gray-700 dark:text-neutral-300">{formatDate(item?.createdAt)}</Text>
            </View>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <View className="space-y-2 bg-white dark:bg-neutral-900">
      <FlatList
        data={newsProp}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEnabled={false}
      />
    </View>
  );
}