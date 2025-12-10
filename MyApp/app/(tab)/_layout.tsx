import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }} />  
      <Tabs.Screen name="shop" options={{ title: "Shop", tabBarIcon: ({ color }) => <AntDesign size={28} name="shop" color={color} /> }} />
      <Tabs.Screen name="Blog" options={{ title: "Blog", tabBarIcon: ({ color }) => <AntDesign size={28} name="file-text" color={color} /> }} />
      <Tabs.Screen name="about" options={{ title: "About", tabBarIcon: ({ color }) => <AntDesign size={28} name="contacts" color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color }) => <AntDesign size={28} name="profile" color={color} /> }} />
    </Tabs>
  );
};

export default TabLayout;