import { View, Text, Button, Image, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { PostProvider } from "../../context/postContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "@env";
import axios from "axios";
import { createContext, useState } from "react";
function PostsTab() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorNumber, setAuthorNumber] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const { data: person } = await axios.get(
          `${API_URL}/posts?_fields=id,title,author,featured_media`
        );
        try {
          const peopleWithImages = await Promise.all(
            person.map(async (post) => {
              const { data: logo } = await axios.get(
                `${API_URL}/media?parent=${post.id}`
              );
              const { data: image } = await axios.get(
                `${API_URL}/media/${post.featured_media}`
              );

              return {
                id: post.id,
                title: post.title.rendered,
                author: post.author,
                image: image.media_details.sizes.full.source_url,
                // logo: logo[1].media_details.sizes.full.source_url,
              };
            })
          );

          setLoading(false);
          setPost(peopleWithImages);
        } catch (err) {
          console.log("MapError", err);
        }
      } catch (err) {
        console.log("MainError", err);
      }
    }
    getPosts();
  }, []);

  return (
    <>
      <ScrollView
      // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
        // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        // className="p-2 m-2 bg-pink-600 justify-center"
        >
          <Text>Find Your Next Internal Referral!</Text>
          <Text>
            Explore all of the different referrers and find the ones at the
            companies you want to apply to! Tap on their image or the “Contact
            Me” button to send them a message on LinkedIn! Check out the “Job
            Seeker Templates” page to find message templates to send referrers.
          </Text>
          <Text>
            Be sure to include the name of the role/position you are looking to
            apply to when reaching out to referrers
          </Text>
          <View>
            <Text>
              {loading ? (
                <Text>LOADING.. </Text>
              ) : (
                post.map((data) => {
                  return (
                    <View key={data.id}>
                      <View className>
                        <View>
                          {/* <Button value={() => setAuthorNumber(data.author)}>
                            chat with me
                          </Button> */}
                        </View>
                        <Text>{data.title} </Text>
                        <Image
                          className="w-14 h-14 border-0.5 ml-auto  border-pink-600"
                          source={{ uri: data.image }}
                          style={{ width: 300, height: 300 }}
                        />
                        {/* <Image
                          className="w-14 h-14 rounded-full border-2 ml-auto border-blue-300"
                          source={{ uri: data.logo }}
                          style={{ width: 100, height: 100 }}
                        /> */}
                      </View>
                    </View>
                  );
                })
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default PostsTab;

{
  /* <View>
            {posts.map((post) => {
              return (
                <View key={post.id}>
                  <Text>{post.title}</Text>
                  <View className>
                    <Image
                      style={{ width: 200, height: 200 }}
                      source={{
                        uri: post.image,
                      }}
                      alt="error in image display"
                    ></Image>
                  </View>
                </View>
              );
            })}
          </View> */
}
