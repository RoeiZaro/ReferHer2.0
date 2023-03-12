import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ImageUpload from '../components/ImageUpload';
import UserImage from '../components/FetchPic';

export default function Combo() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  return (
    <View style={styles.container}>
      <ImageUpload onImageUpload={handleImageUpload} />
      {imageUrl && <UserImage imageUrl={imageUrl} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
