import { Button, View, Text, Image } from "react-native";
import { API_URL } from "@env";
import { useState } from "react";
import axios from "axios";

function PostMongo() {
  let postArr = [];
  const [image, setImage] = useState("");
  const [post, setPost] = useState([]);

  async function getPosts() {
    try {
      const { data: person } = await axios.get(
        `${API_URL}/posts?_fields=id,title,author,featured_media`
      );
      // setPost(person);
      console.log(person);
      try {
        const peopleWithImages = await Promise.all(
          person.map(async (post) => {
            const { data: image } = await axios.get(
              `${API_URL}/media/${post.featured_media}`
              // `${API_URL}/media?parent=${post.id}`
            );
            return {
              id: post.id,
              title: post.title,
              author: post.author,
              image: image.media_details.sizes.full.source_url,
            };
          })
        );
        console.log(peopleWithImages);
        // console.log(images);
      } catch (err) {
        console.log("MapError", err);
      }
    } catch (err) {
      console.log("MainError", err);
    }
  }

  // async function GetPostsFromAPI() {
  //   try {
  //     const response = await fetch(
  //       `${API_URL}/posts?_fields=id,title,author,featured_media`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();

  //     data?.map(async (post) => {
  //       const image = await fetch(`${API_URL}/media/${post.featured_media}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       });
  //       image.json().then((imgUrl) => {
  //         imgUrl && setTestPost([...postArr, { post, image: imgUrl }]);
  //       });
  //       console.log(image, "2");
  //       // postArr.push({
  //       //   post,
  //       //   image: imageresponse.media_details?.sizes.full.source_url,
  //       // });
  //     });
  //     // console.log("data: ", data);
  //     try {
  //       const tomongo = await fetch("http://172.20.10.5:8002/updateposts", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(postArr),
  //       }).catch(function (err) {
  //         console.log(err);
  //       });
  //       console.log(await tomongo.json());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // console.log(JSON.parse(testPost.post));
  // console.log(testPost, "1");
  return (
    <View>
      <Button onPress={() => getPosts()} title="Press Me">
        Press Me
      </Button>
      {/* <Text> 
       {peopleWithImages?.map((data) => {
          return ( 
            <View key={data.id}>
              <View className>
                <Text>{data.title}</Text>
                <Text>{data.title}</Text>
                <Image
                  className="w-14 h-14 rounded-full border-2 ml-auto border-blue-300"
                  source={{ uri: data.image }}
                />
              </View>
            </View>
          );
        })}
      </Text> */}
    </View>
  );
}

export default PostMongo;
