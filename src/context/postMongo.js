import { Button, View, Text, Image } from "react-native";
import { API_URL } from "@env";
import { useState } from "react";

function PostMongo() {
  let postArr = [];
  const [testPost, setTestPost] = useState([]);
  async function GetPostsFromAPI() {
    try {
      const response = await fetch(`${API_URL}/posts?_fields`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      //   console.log(response);
      const data = await response.json();
      //   console.log("data ", data);
      data?.map(async (post) => {
        const image = await fetch(`${API_URL}/media/${post.featured_media}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        image.json().then((imgUrl) => {
          imgUrl && setTestPost([...postArr, { post, image: imgUrl }]);
        });
        // postArr.push({
        //   post,
        //   image: imageresponse.media_details?.sizes.full.source_url,
        // });
      });
      // console.log(postArr, "1");
      // console.log("data: ", data);
      try {
        const tomongo = await fetch("http://192.168.50.51:8002/updateposts", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postArr),
        }).catch(function (err) {
          console.log(err);
        });
        console.log(await tomongo.json());
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(JSON.parse(testPost.post));
  console.log(postArr);
  return (
    <View>
      <Button onPress={() => GetPostsFromAPI()} title="Press Me">
        Press Me
      </Button>
      {/* <Text>
        {testPost?.map((post) => {
          // alert(post.id);
          return (
            <View key={post.id}>
              <View className>
               
              </View>
            </View>
          );
        })}
      </Text> */}
    </View>
  );
}

export default PostMongo;
