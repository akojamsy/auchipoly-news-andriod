import { View, Text, Dimensions } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import Carousel from 'react-native-snap-carousel'
import BreakingNewsCard from './BreakingNewsCard'

const {width} = Dimensions.get('window')

export default function BreakingNews({label, data}) {
    const navigation = useNavigation()

    const handleClick = (item) => {
        navigation.navigate("NewsDetails", item)
    }
    const breakingNews = data?.filter(item => item.category?.name === "Breaking News")
  
  return (
    <View>
     <Carousel data={breakingNews}
        renderItem={({item}) => (
            <BreakingNewsCard item={item} handleClick={handleClick}/>
        )}
        firstItem={1}
        inactiveSlideScale={0.86}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{
            display:'flex',
            alignItems:"center"
        }}
     />
    </View>
  )
}