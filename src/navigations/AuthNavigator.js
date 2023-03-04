import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigation } from "@react-navigation/native";

import LandingPage from "../screens/auth/landingPage";
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import MyTabs from "./HomeTabs";

function AuthNavigator() {
  const Stack = createNativeStackNavigator();
  const { token } = useContext(UserContext);

  return (
    <>
      {!token ? (
        <Stack.Navigator screenOptions={{}} initialRouteName={"LandingPage"}>
          <Stack.Screen
            name={"LandingPage"}
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"Login"}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"Register"}
            component={Register}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <MyTabs />
      )}
    </>
  );
}
export default AuthNavigator;
