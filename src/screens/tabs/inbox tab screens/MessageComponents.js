import { View, Text } from "react-native";
import React from "react";
import * as Icons from "react-native-heroicons/solid";
import { styles } from "./Styles";
import moment from "moment";

export default function MessageComponent({ item, userId }) {
  const status = item.creator !== userId;

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {status && (
            <Icons.UserCircleIcon
              name="person-circle-outline"
              size={30}
              color="black"
              style={styles.cavatar}
            />
          )}
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
            }
          >
            <Text>{item.text}</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 40 }}>
          {moment(item.time).format("HH:mm")}
        </Text>
      </View>
    </View>
  );
}
