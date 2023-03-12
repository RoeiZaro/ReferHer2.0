const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageUrl = cloudinary.url('<public_id>', {
  width: 400,
  height: 300,
  crop: 'fill'
});

console.log(imageUrl);

//ToDo npm install cloudinary --save in backend

//render the image
//const [imageUrl, setImageUrl] = useState(null);
// {imageUrl && (
//     <Image source={{ uri: imageUrl }} style={{ width: 400, height: 300 }} />
//   )}
  
// const handleImageUpload = async () => {
//     const formData = new FormData();
//     formData.append('image', {
//       uri: image.uri,
//       name: 'image.jpg',
//       type: 'image/jpeg'
//     });
  
//     try {
//       const response = await fetch('http://your-backend-url.com/upload', {
//         method: 'POST',
//         body: formData
//       });
  
//       const data = await response.json();
//       setImageUrl(data.secure_url);
//     } catch (error) {
//       console.error(error);
//     }
//   };

{/* <TouchableOpacity onPress={handleImageUpload}>
  <Text>Upload Image</Text>
</TouchableOpacity> */}



  
