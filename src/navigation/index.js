import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, Platform, Text, TouchableOpacity, View } from "react-native";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import AddNews from "../screens/AddNews";
import DiscoverScreen from "../screens/DiscoverScreen";
import HomeScreen from "../screens/HomeScreen";
import NewsDetailsScreen from "../screens/NewsDetailsScreen";
import SearchScreen from "../screens/SearchScreen";
import SplashScreens from "../screens/SplashScreens";
import WelcomeScreen from "../screens/WelcomeScreen";
import { CATEGORIES } from "./data";
import Signin from "../screens/Signin";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../redux/features/authSlice";
import { useGetUserDetailsQuery } from "../redux/services/auth/authApi";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  

  const ProfileScreenWithDrawer = () => {
    const {token} = useSelector(state => state.auth)

    const {data, isLoading} =  useGetUserDetailsQuery() 
    
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(()=>{
      if(token && data){
        dispatch(setUser(data))
      }
    },[data])
    
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomeTabs"
        drawerContent={() => (
          <SafeAreaView>
            <View className="h-20 bg-blue-700 absolute w-full"></View>
            
            <View className="flex-row items-center gap-3 bg-blue-700 p-4 h-40 rounded-b-3xl">
              <Image
                source={require("../../assets/images/avatar.png")}
                className="w-20 h-20"
              />
              <View>
                <Text className="text-[16px] text-white">{data?.name}</Text>
                <TouchableOpacity className="mt-2 border border-blue-400 p-1 rounded-m items-center text-white">
                  <Text className="text-[12px] text-white">Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="px-4 mt-4">
              <Text className="font-semibold">Categories</Text>
              <View className="pl-5 pb-6 border-b border-b-gray-100">
                {CATEGORIES.map(({ id, title, iconName }) => (
                  <TouchableOpacity key={id} className="mt-4 flex-row gap-x-3" onPress={()=>{}}>
                    <FontAwesome5 name={iconName} size={15} color="gray" />
                    <Text className="text-[14px] text-gray-500">{title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="px-4 mt-6">
                <TouchableOpacity className="mb-7 flex-row items-center gap-2">
                  <AntDesign name="setting" size={15} color="black" />
                  <Text>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mb-7 flex-row items-center gap-2">
                  <Ionicons
                    name="information-circle-outline"
                    size={18}
                    color="black"
                  />
                  <Text>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mb-7 flex-row items-center gap-2">
                  <AntDesign name="contacts" size={15} color="black" />
                  <Text>Contact Us</Text>
                </TouchableOpacity>
                {!token ?<TouchableOpacity className="mb-7 flex-row items-center gap-2" onPress={()=>navigation.navigate('Signin')}>
                  <AntDesign name="login" size={15} color="blue" />
                  <Text className="text-blue-600 font-medium">Sign In</Text>
                </TouchableOpacity>:<TouchableOpacity className="mb-7 flex-row items-center gap-2" onPress={()=>{dispatch(clearToken()); navigation.navigate('Signin')}}>
                  <AntDesign name="logout" size={15} color="blue" />
                  <Text className="text-blue-600 font-medium">Logout</Text>
                </TouchableOpacity>}
              </View>
              
            </View>
          </SafeAreaView>
        )}
      >
        <Drawer.Screen name="Profile" component={TabNavigator} />
      </Drawer.Navigator>
    );
  };

  const TabNavigator = () => {
    const navigation = useNavigation();

    const { colorScheme, toggleColorScheme } = useColorScheme();

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Discover") {
              iconName = "compass-outline";
            } else if (route.name === "Add News") {
              iconName = "plus";
            } else if (route.name === "Search") {
              iconName = "search-outline";
            }

            const customizeSize = 25;
            if (iconName !== "plus") {
              return (
                <Ionicons
                  name={iconName}
                  size={customizeSize}
                  color={focused ? "#4b4bea" : "gray"}
                />
              );
            } else {
              return (
                <Feather
                  name="plus"
                  size={customizeSize}
                  color={focused ? "#4b4bea" : "gray"}
                />
              );
            }
          },
          tabBarActiveTintColor: "#4b4bea",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "SpaceGroteskMedium",
          },
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            title: "Home",
            headerTitle: "",
            headerTransparent: true,
            headerBackgroundContainerStyle: {
              backgroundColor: "white",
            },
            headerLeft: () => {
              return (
                <TouchableOpacity
                  className="ml-4 mt-2"
                  onPress={() => navigation.openDrawer()}
                >
                  <Bars3Icon
                    name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                    size={30}
                    color="black"
                    className="ml-4"
                  />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                <View className="mr-4 flex-row space-x-4 rounded-full justify-center items-center">
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
                    {colorScheme === "dark" && (
                      <SunIcon size={25} strokeWidth={2} />
                    )}
                    {colorScheme === "light" && (
                      <MoonIcon size={25} strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Add News" component={AddNews} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreens" component={SplashScreens} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Post" component={AddNews} />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetailsScreen}
          options={{ animation: "slide_from_bottom" }}
        />
        {/* <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{ animation: "slide_from_right" }}
        /> */}
        <Stack.Screen
          name="HomeTabs"
          component={ProfileScreenWithDrawer}
          screenOptions={{
            headerShown: false,
          }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          screenOptions={{
            headerShown: false,
          }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
