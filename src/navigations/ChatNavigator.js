import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useContext } from "react";
// import { UserContext } from "../context/userContext";

import chat from "../screens/tabs/inbox tab screens/Chat";
import Messaging from "../screens/tabs/inbox tab screens/Messaging";

function ChatNavigator() {
  const Stack = createNativeStackNavigator();
  //   const { token } = useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={"LandingPage"}>
      <Stack.Screen
        name={"Chat"}
        component={chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"messaging"}
        component={Messaging}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
export default ChatNavigator;
