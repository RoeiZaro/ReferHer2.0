import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ActivityIndicator, Button, StyleSheet, Text, View, Modal, Alert } from 'react-native';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_API } from '@env';

const ImagePick = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Modal ,setModal] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImg(result.assets[0]);
    }
  };

const handleUpload = (photo) => {
  const data = new FormData()
  data.append('file',photo)
  data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
  fetch(process.env.CLOUDINARY_API,{
    method:'POST',
    body:data,
    headers:{
      'accept': 'application/json',
      'content-type':'multipart/form-data'
    }
  }).then(res => res.json())
  .then(data =>{
    setSelectedImg(data.uri)
     setModal(false)
    console.log(data)
  }).catch(err => {
    Alert.alert("Error while uploading")
  })
}

  // useEffect(() => {
  //   const getSelectedImg = async () => {
  //     if (selectedImg) {
  //       const formData = new FormData();
  //       formData.append('file', {
  //         uri: selectedImg.uri,
  //         type: selectedImg.type,
  //         name: selectedImg.uri.split('/').pop(),
  //       });
  //       formData.append('upload_preset',  process.env.CLOUDINARY_UPLOAD_PRESET);

  //       setLoading(true);
  //       try {
  //         const response = await axios.post(
  //           process.env.CLOUDINARY_API,
  //           formData
  //         );
  //         setUploadedImg(response.data.secure_url);
  //       } catch (error) {
  //         console.error(error);
  //       }

  //       setLoading(false);
  //     }
  //   };

  //   getSelectedImg();
  // }, [selectedImg]);

  console.log(uploadedImg)
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Image Picker</Text>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      {loading && <ActivityIndicator />}
      {uploadedImg && <Image source={{ uri: uploadedImg }} style={styles.image} />}
      <Button title="upload" onPress={handleUpload(uploadedImg)}/>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    image: {
      width: 200,
      height: 200,
      marginVertical: 20,
    },
  });
export default ImagePick