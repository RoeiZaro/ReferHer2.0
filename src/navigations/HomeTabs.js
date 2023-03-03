import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Icons from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { Text, View, Button } from "react-native";

function Main() {
  const { removeItem } = useContext(UserContext);

  return (
    <>
      <SafeAreaView className="bg-pink-600 justify-center">
        <StatusBar style="light" />
      </SafeAreaView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your Notifications is empty!</Text>
        <Button title="lol" onPress={() => removeItem()} />
      </View>
    </>
  );
}

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
        component={Main}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icons.SparklesIcon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color, size }) => (
            <Icons.BellIcon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Main}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icons.UserIcon name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AboutUs"
        component={Main}
        options={{
          tabBarLabel: "About Us",
          tabBarIcon: ({ color, size }) => (
            <Icons.LightBulbIcon name="bulb" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
