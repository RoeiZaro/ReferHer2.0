import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import MessageComponent from "./MessageComponents";
import { styles } from "./Styles";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import { CHAT_API } from "@env";
import moment from "moment";

const Messaging = ({ route, navigation }) => {
  const { userData, chats, socket } = useContext(UserContext);
  const { name, _id } = route.params;
  const currentChat = chats.filter((chat) => chat._id == _id)[0];
  const [chatMessages, setChatMessages] = useState(currentChat.messages);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const flatlistRef = useRef(null);
  const userId = userData.id;
  const destanitionId =
    userData.id == currentChat.subscriber.id
      ? currentChat.author.id
      : currentChat.subscriber.id;

  useEffect(() => {
    socket.current.on("get-message", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });

    return () => {
      // socket.current.off("get-message");
    };
  }, []);

  const handleClear = () => {
    setMessage("");
    inputRef.current.clear();
    flatlistRef.current?.scrollToEnd();
  };

  const handleNewMessage = async () => {
    handleClear();
    const time = new Date();
    const msgData = {
      destanition: destanitionId,
      msg: { text: message, creator: userId, time: time, seen: "false" },
    };

    socket.current.emit("send-message", msgData);

    setChatMessages((prev) => [
      ...prev,
      { text: message, creator: userId, time: time, seen: "false" },
    ]);

    try {
      const res = await axios.post(`${CHAT_API}:4000/addMessage`, {
        chatId: _id,
        message: { text: message, creator: userId, time: time, seen: "false" },
      });
      if (res.data.message == "Message added");
    } catch (err) {
      console.error("error while send msg to db", err);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useEffect(() => {}, [message]);

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
            ref={flatlistRef}
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} userId={userId} />
            )}
            keyExtractor={(item) => `${item.time}${Math.random(10000)}`}
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
