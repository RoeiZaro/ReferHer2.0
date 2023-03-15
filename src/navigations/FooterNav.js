import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Privacy from "../screens/tabs/inbox/Privacy";
import Priv from "../screens/tabs/priv";
// import Terms from "../screens/tabs/inbox/Terms";
import HomeTab from "../navigations/HomeTabs";

function FooterNav() {
  const Stack = createNativeStackNavigator();
  //   const { token } = useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={"LandingPage"}>
      <Stack.Screen
        name={"Home"}
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Privacy Policy"}
        component={Priv}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name={"Terms of Service"}
        component={Terms}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
export default FooterNav;
