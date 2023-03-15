import { View, Text, Button, ScrollView,  ActivityIndicator, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert, Pressable, } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
 import {Card} from 'react-native-shadow-cards';
 import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
export default function Privacy() {
  
    return (
      <>
       <SafeAreaView className="bg-pink-600 justify-center">
          <StatusBar style="light" />
        </SafeAreaView>

      <ScrollView>
<View style={styles.container}>

<Card style={{padding: 10, margin: 10, backgroundColor:"#FFFFFF"}}>
        <Text style={styles.header}>Privacy Policy</Text>
        <Text style={styles.header}>Who we are</Text>
        <Text style={styles.text} className="p-2">Our website address is: https://referher.co.</Text>
        <Text style={styles.header}>Comments</Text>
        <Text style={styles.text} className="p-2">When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</Text>
        <Text style={styles.text} className="p-2">An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</Text>
        <Text style={styles.header}>Media</Text>
        <Text style={styles.text} className="p-2">If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</Text>
        <Text style={styles.header}>Cookies</Text>
        <Text style={styles.text} className="p-2">If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</Text>
        <Text style={styles.text} className="p-2">If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</Text>
        <Text style={styles.text} className="p-2">When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</Text>
        <Text style={styles.text} className="p-2">If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</Text>
        <Text style={styles.header}>Embedded content from other websites</Text>
        <Text style={styles.text} className="p-2">Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</Text>
        <Text style={styles.text} className="p-2">These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</Text>
        <Text style={styles.header}>Who we share your data with</Text>
        <Text style={styles.text} className="p-2">If you request a password reset, your IP address will be included in the reset email.</Text>
        <Text style={styles.header}>How long we retain your data</Text>
        <Text style={styles.text} className="p-2">If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</Text>
        <Text style={styles.text} className="p-2">For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</Text>
        <Text style={styles.header}>What rights you have over your data</Text>
        <Text style={styles.text} className="p-2">If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</Text>
        <Text style={styles.header}>Where your data is sent</Text>
        <Text style={styles.text} className="p-2">Visitor comments may be checked through an automated spam detection service.</Text>
        
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