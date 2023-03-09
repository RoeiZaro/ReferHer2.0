import { Image } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage !== null
      ? { uri: selectedImage }
      : placeholderImageSource;
  
    return <Image source={imageSource} />;
}