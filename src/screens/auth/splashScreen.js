import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";
import { Video } from "expo-av";
import React, { useEffect } from "react";

export default function SplashScreen() {
  const videoRef = React.useRef(null);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  useEffect(() => {
    playVid();
  }, [videoRef]);

  async function playVid() {
    await sleep(500);
    videoRef.current.playFromPositionAsync(0);
  }

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        useNativeControls={false}
        style={styles.video}
        source={require("../../../assets/big_buck_bunny.mp4")}
        isLooping={false}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  buttons: {
    margin: 16,
  },
});
