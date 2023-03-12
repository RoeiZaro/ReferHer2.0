import { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_API } from "@env";
import { UserContext } from "../../context/userContext";

const ImageUpload = ({ children }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);
  const { updateAvatar } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((rotation) => (rotation + 3.3) % 360);
    }, 16);

    return () => clearInterval(intervalId);
  }, []);

  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!data.canceled) {
      let newFile = {
        uri: data.assets[0].uri,
        type: `ReferHer/${data.assets[0].uri.split(".")[1]}`,
        name: `ReferHer/${data.assets[0].uri.split(".")[1]}`,
      };
      const newData = new FormData();
      newData.append("file", newFile);
      newData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      setLoading(true);
      await fetch(process.env.CLOUDINARY_API, {
        method: "patch",
        body: newData,
      })
        .then((res) => res.json())
        .then((newData) => {
          setImage(newData.url);
          updateAvatar(newData.url);
        })
        .finally(() => setLoading(false))
        .catch((err) => {
          Alert.alert("Error While Uploading");
        });
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onLongPress={pickImage}>
        {loading ? (
          <ActivityIndicator
            style={{ transform: [{ rotate: `${rotation}deg` }] }}
            size={moderateScale(70)}
            color="#e600e6"
          />
        ) : (
          children
        )}
        {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#e600e6",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});
export default ImageUpload;
