import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HomeTab() {
    const { removeItem } = useContext(UserContext);
  
    return (
      <>
        <SafeAreaView className="bg-pink-600 justify-center">
          <StatusBar style="light" />
        </SafeAreaView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Your Notifications is empty!</Text>
        </View>
      </>
    );
  }