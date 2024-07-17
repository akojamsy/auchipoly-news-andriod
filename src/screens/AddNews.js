import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useAddNewsMutation, useGetNewsCategoriesQuery } from '../redux/services/news/newApi';
// import { useAddNewsMutation } from '../redux/services/news/newsApi';

export default function AddNews() {
  const navigation = useNavigation();
  const [newsTitle, setNewsTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [addNews, { isLoading }] = useAddNewsMutation();

  const {data} = useGetNewsCategoriesQuery()

  useFocusEffect(
    React.useCallback(() => {
      // Clear fields when the screen is focused
      setNewsTitle('');
      setDescription('');
      setImage(null);
      setCategory('');
    }, [])
  );

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', newsTitle);
    formData.append('content', description);
    formData.append('category', category);

    if (image) {
      const fileName = image.split('/').pop();
      const fileType = image.split('.').pop();
      formData.append('media_asset', {
        uri: image,
        name: fileName,
        type: `image/${fileType}`, 
      });
    }

    try {
      const res = await addNews(formData).unwrap();
      console.log(res)
      navigation.navigate("Home");

    } catch (error) {
      console.error('Failed to add news:', error);
    }
  };

  return (
    <SafeAreaView>
        <View className="w-full flex-row justify-between items-center p-4 bg-white">
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-gray-100 p-2 rounded-full items-center">
            <ChevronLeftIcon size="25" color={"gray"} strokeWidth={3} />
            </TouchableOpacity>
            <Text className="text-xl font-semibold mt-2 mb-5">Add News</Text>
            <View className="w-10"></View> 
        </View>
        <ScrollView className="h-full">
            <View className="bg-white px-5 pb-20">
                <View className="mb-5">
                    <TextInput
                        placeholder='News Title'
                        value={newsTitle}
                        onChangeText={setNewsTitle}
                        className="border p-3 rounded-md mb-3"
                    />
                    <TextInput
                        placeholder='Description'
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={10}
                        textAlignVertical='top'
                        style={styles.textArea}
                    />
                    <Text className="text-right text-orange-600 mb-2">Atleast 2O characters!</Text>
                    <TouchableOpacity onPress={handleImagePick} className="bg-gray-100 p-3 rounded-md">
                        <Text className="text-xl">Select Image</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}
                </View>

                {/* <View style={styles.pickerContainer}> */}
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Category" value="" />
                        {data?.data?.map((item) => (
                          <Picker.Item key={item._id} label={item.name} value={item._id} /> 
                        ))} 
                    </Picker>
                {/* </View> */}

                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={isLoading}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textArea: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 150, // Adjust the height as needed
    marginBottom: 15,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 1,
  },
  
  submitButton: {
    backgroundColor: '#4b4bea',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
