import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Image } from "react-native";
import { Video } from "expo-av";
import { useEffect, useRef } from "react";

export default function SplashScreen() {
  // const videoRef = useRef(null);

  // const sleep = (ms) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };
  // useEffect(() => {
  //   playVid();
  // }, [videoRef]);

  async function playVid() {
    await sleep(500);
    // videoRef.current.playFromPositionAsync(0);
  }

  return (
    <View style={styles.container}>
      {/* <Video
        ref={videoRef}
        useNativeControls={false}
        style={styles.video}
        source={require("../../../assets/big_buck_bunny.mp4")}
        isLooping={false}
      /> */}
      <Image style={styles.logo} source={require("../../../assets/kolo.jpg")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF69B4",
  },
  logo: {
    flex: 1,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});
