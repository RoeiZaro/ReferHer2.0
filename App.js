import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigations/AuthNavigator";
import UserProvider from "./src/context/userContext";
import SplashScreen from "./src/screens/auth/splashScreen";

// import { useFonts } from 'expo-font';

export default function App() {
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  // // let [font] = useFonts({
  // oleo: require('./assets/fonts/OleoScript-Regular.ttf'),
  // });
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    endIntro();
  }, []);
  async function endIntro() {
    await sleep(2000);

    setIntro(false);
  }

  return (
    <NavigationContainer>
      {intro ? (
        <SplashScreen />
      ) : (
        <UserProvider>
          <AuthNavigator />
        </UserProvider>
      )}
    </NavigationContainer>
  );
}
