// import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="Discover" component={DiscoverScreen} /> */}
      {/* <Drawer.Screen name="Search" component={SearchScreen} /> */}
    </Drawer.Navigator>
  );
}
