// import { Button, View, Text } from "react-native";
// import { API_URL } from "@env";

// function PostMongo() {
//   let postArr = [];
//   async function GetPostsFromAPI() {
//     try {
//       const response = await fetch(`${API_URL}/posts?_fields`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });
//       //   console.log(response);
//       const data = await response.json();
//       //   console.log("data ", data);
//       data?.map(async (post) => {
//         const image = await fetch(`${API_URL}/media/${post.featured_media}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         });
//         const imageresponse = await image.json();
//         // console.log(imageresponse.media_details?.sizes);
//         postArr.push({
//           post,
//           image: imageresponse?.media_details?.sizes,
//         });
//       });
//       console.log("ok");
//       try {
//         const tomongo = await fetch("http://172.20.10.5:8002/updateposts", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(postArr),
//         }).catch(function (err) {
//           console.log(err);
//         });
//         console.log(await tomongo.json());
//       } catch (error) {
//         console.log(error);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <View>
//       <Button onPress={() => GetPostsFromAPI()} title="Press Me">
//         Press Me
//       </Button>
//     </View>
//   );
// }

// export default PostMongo;
