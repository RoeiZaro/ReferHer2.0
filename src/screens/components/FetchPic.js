import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import cloudinary from 'cloudinary-core';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_API } from '@env';

const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: process.env.CLOUDINARY_CLOUD_NAMEE });

function UserImage({ userId }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchUserImage() {
      // fetch the public_id of the user's uploaded image from your database
      const publicId = await fetchUserImageFromDatabase(userId);
      
      // generate the Cloudinary URL for the user's uploaded image
      const url = cloudinaryCore.url(publicId, {
        width: 400,
        height: 300,
        crop: 'fill'
      });

      setImageUrl(url);
    }

    fetchUserImage();
  }, [userId]);

  if (!imageUrl) {
    return <View />;
  }

  return (
    <View>
      <Image source={{ uri: imageUrl }} style={{ width: 400, height: 300 }} />
    </View>
  );
}

export default UserImage;
