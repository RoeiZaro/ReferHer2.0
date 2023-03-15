import { View, Text, Button, ScrollView,  ActivityIndicator, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert, Pressable, } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
 import {Card} from 'react-native-shadow-cards';
 import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
export default function Terms() {
  
    return (
      <>
       <SafeAreaView className="bg-pink-600 justify-center">
          <StatusBar style="light" />
        </SafeAreaView>

      <ScrollView>
<View style={styles.container}>

<Card style={{padding: 10, margin: 10, backgroundColor:"#FFFFFF"}}>
        <Text ></Text>
        
      </Card>

</View>
 </ScrollView>
      
      
      </>);
    }


    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d003e',
        justifyContent: 'center',
        alignItems: 'center',
      },
      header: {
        color:"#000000",
        fontSize:45,
              },
              text: {
        color:"#717171",
        fontSize:25,
        marginBottom:40,
              },
    });