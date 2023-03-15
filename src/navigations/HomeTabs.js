import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Icons from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { Text, View, Button } from "react-native";

import HomeTab from "../screens/tabs/HomeTab";
import ProfileTab from "../screens/tabs/ProfileTab";
import ChatNavigator from "./ChatNavigator";
import ImageUpload from "../screens/components/ImageUpload";
import PostsTab from "../screens/tabs/PostsTab";
import JobSeeker from "../screens/tabs/JobSeeker";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const { user } = useContext(UserContext);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#FF69B4",
        tabBarInactiveTintColor: "#8A2BE2",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeTab}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icons.HomeIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostsTab}
        options={{
          tabBarLabel: "Posts",
          tabBarIcon: ({ color, size }) => (
            <Icons.RectangleGroupIcon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={JobSeeker}
        options={{
          tabBarLabel: "Templates",
          tabBarIcon: ({ color, size }) => (
            <Icons.DocumentDuplicateIcon
              name="bell"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={ChatNavigator}
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <Icons.ChatBubbleBottomCenterTextIcon
              name="chat"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icons.UserIcon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
