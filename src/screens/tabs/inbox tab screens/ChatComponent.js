import { View, Text, Pressable } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import * as Icons from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./Styles";
import { UserContext } from "../../../context/userContext";

const ChatComponent = ({ chat }) => {
  const { userData } = useContext(UserContext);
  const navigation = useNavigation();
  const [lastMessages, setLastMessages] = useState({});

  useLayoutEffect(() => {
    setLastMessages(chat.messages[chat.messages.length - 1]);
  }, []);

  const handleNavigation = () => {
    navigation.navigate("messaging", {
      _id: chat._id,
      name:
        chat.subscriber.id == userData.id
          ? chat.author.name
          : chat.subscriber.name,
    });
  };

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <Icons.UserCircleIcon
        name="person-circle-outline"
        size={45}
        color="black"
        style={styles.cavatar}
      />

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>
            {chat.subscriber.id == userData.id
              ? chat.author.name
              : chat.subscriber.name}
          </Text>

          <Text style={styles.cmessage}>
            {lastMessages?.text ? lastMessages.text : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {lastMessages?.time ? lastMessages.time : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
