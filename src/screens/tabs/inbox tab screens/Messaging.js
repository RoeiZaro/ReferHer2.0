import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import socket from "./Socket";
import MessageComponent from "./MessageComponents";
import { styles } from "./Styles";
import { UserContext } from "../../../context/userContext";

const Messaging = ({ route, navigation }) => {
  const { userData, chats } = useContext(UserContext);
  const { name, _id } = route.params;
  const [chatMessages, setChatMessages] = useState(
    chats.filter((chat) => chat._id == _id)[0].messages
  );
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const userId = userData.id;

  const handleClear = () => {
    setMessage("");
    inputRef.current.clear();
  };

  const handleNewMessage = () => {
    handleClear();
    const time = new Date();

    // socket.to(_id).emit("newMessage", {
    //   message,
    //   user,
    //   timestamp: time,
    // });

    setChatMessages((prev) => [
      ...prev,
      { text: message, creator: userId, time: time },
    ]);
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: "title" });
    // socket.emit("findRoom", id);
    // socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, []);

  //   useEffect(() => {
  //     socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  //   }, [socket]);

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} userId={userId} />
            )}
            keyExtractor={(item) => item.time}
          />
        ) : (
          ""
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
          ref={inputRef}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;
