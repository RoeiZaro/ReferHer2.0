import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import * as Icons from "react-native-heroicons/solid";
// import Modal from "./Modal";
import ChatComponent from "./ChatComponent";
import socket from "./Socket";
import { styles } from "./Styles";
import { UserContext } from "../../../context/userContext";

const Chat = () => {
  const { chats } = useContext(UserContext);
  const [modelvisible, setModelVisible] = useState(false);

  const handleCreateGroup = () => console.log(chats);

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Inobx</Text>
          <Pressable onPress={handleCreateGroup}>
            <Icons.PencilSquareIcon name="edit" size={24} color="pink" />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {chats?.length > 0 ? (
          <FlatList
            data={chats}
            renderItem={({ item }) => <ChatComponent chat={item} />}
            keyExtractor={(chat) => chat._id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No chats created!</Text>
            <Text>Try connecting with poster and chating with them!</Text>
          </View>
        )}
      </View>
      {/* {modelvisible ? <Modal setModelVisible={setModelVisible} /> : ""} */}
    </SafeAreaView>
  );
};

export default Chat;
