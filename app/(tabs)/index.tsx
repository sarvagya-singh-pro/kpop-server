import React,{useEffect,useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import Trending from '../../components/trending'
import Icon from "react-native-vector-icons/Ionicons";
import BannerSlider from '../../components/banner'
// Home Screen with Search Bar & Message
import HomeScreen from '../../components/home'
import ChatScreen from '../../components/chat'

// Reusable Component for Screens
const ScreenComponent = ({ title }) => (
  <View style={styles.screen}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home-outline";
            else if (route.name === "Trending") iconName = "trending-up-outline";
            else if (route.name === "Message from baby") iconName = "chatbubble-outline";
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#F46788",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: styles.tabBar,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Trending" component={Trending} />
        <Tab.Screen name="Message from baby" component={ChatScreen} />
      </Tab.Navigator>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09081f",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#09081f",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 80,
    backgroundColor: "#0a0817", // Glass effect
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)", // Slight border for depth
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowRadius: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Glass effect
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 50,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  footerText: {
    color: "#F46788",
    fontSize: 14,
    fontWeight: "600",
    paddingLeft:45,
    marginTop: 10, // Padding below the search bar
  },
});
