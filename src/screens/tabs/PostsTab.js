import { View, Text, Button, Image, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { PostContext } from "../../context/postContext";
import { SafeAreaView } from "react-native-safe-area-context";
import PostMongo from "../../context/postMongo";

function PostsTab() {
  const { fetchPosts, posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
    const getPosts = async () => {
      const title = await AsyncStorage.getItem("title");
    };
  }, []);

  return (
    <>
      <ScrollView className="pt-10">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          className="p-2 m-2 bg-pink-600 justify-center"
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
          <PostMongo />
          {/* <View>
            {posts.map((post) => {
              return (
                <View key={post.id}>
                  <Text>{post.title.rendered}</Text>
                  <View className>
                    <Image
                      style={{ width: 200, height: 200 }}
                      source={{
                        uri: post.link,
                      }}
                      alt="error in image display"
                    ></Image>
                  </View>
                </View>
              );
            })}
          </View> */}
        </View>
      </ScrollView>
    </>
  );
}

export default PostsTab;
