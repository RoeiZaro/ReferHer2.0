import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { PostProvider } from "../../context/postContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "@env";
import axios from "axios";
import { createContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";

function PostsTab() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorNumber, setAuthorNumber] = useState("34567");
  const [page, setpage] = useState(1);

  useEffect(() => {
    async function getPosts() {
      try {
        const { data: person } = await axios.get(
          `${API_URL}/posts?per_page=10&_fields=id,title,author,featured_media&page=${page}`
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
                logo: logo[0].media_details.sizes.full.source_url,
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
  }, [page]);

  // if you press an alert will be displayed asking if the user want to request a chat with alert yes or no
  function handlepress(author) {
    try {
      Alert.alert("Get Reffered", "Do you want to get in touch?", [
        {
          text: "Yes",
          color: "blue",
          onPress: () => {
            setAuthorNumber(author);
          },
        },
        {
          text: "No",
          color: "#FF0000",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ScrollView className=" bg-referpink  min-h-full w-full flex-col m-0">
        <SafeAreaView className=" bg-referpink justify-center m-0">
          <View className="bg-referwhite">
            <View className="bg-referblue">
              <Text className="font-extrabold text-3xl text-white p-1 bg-referblue">
                Find Your Next Internal Referral!
              </Text>
              <Text className="font-semibold text-m p-2 text-white bg-referblue">
                Explore all of the different referrers and find the ones at the
                companies you want to apply to! Tap on their image or the
                “Contact Me” button to send them a message on LinkedIn! Check
                out the “Job Seeker Templates” page to find message templates to
                send referrers.
              </Text>
              {/* <Text className="text-referblue text-xs">{authorNumber}</Text> */}
              <Text className="p-2 text-referwhite bg-referblue pb-5">
                ** Be sure to include the name of the role/position you are
                looking to apply to when reaching out to referrers
              </Text>
            </View>
            <View>
              <Text>
                {loading ? (
                  <View className="pl-15 ml-auto mr-auto text-3xl p-30">
                    <Text className="text-white  font-semibold mr-auto ml-auto text-3xl p-30">
                      <ActivityIndicator
                        size="large"
                        color="#15172C"
                        className="m-10 p-10"
                      />
                    </Text>
                  </View>
                ) : (
                  post.map((data) => {
                    return (
                      <View key={data.id}>
                        <View className="m-4 ml-10 bg-referpink p-1 shadow-2xl rounded-xl">
                          <Text className="p-1 text-lg font-bold text-white">
                            {data.title}
                          </Text>
                          <Image
                            source={{ uri: data.image }}
                            style={{ width: 300, height: 300 }}
                            className="m-1 h-70 w-150 bg-cover rounded-md"
                          />
                          <View className="pl-5 ">
                            <Text className="p-1 text-m font-medium text-white ">
                              Company:
                            </Text>
                            <Image
                              source={{ uri: data.logo }}
                              style={{
                                width: 150,
                                height: 70,
                                resizeMode: "contain",
                              }}
                              className="h-70 w-150 bg-cover rounded-sm"
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() => handlepress(data.author)}
                          >
                            <View className="rounded-md pr-10 pl-10 pt-2 pb-2 bg-purple-900 mt-1 ml-2 mr-2 mb-1">
                              <Text className="text-white transform-cpu font-bold text-center">
                                Get Reffered by {data.title}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })
                )}
              </Text>
            </View>
            <View className="flex-row ml-auto mr-auto items-center pb-5">
              <TouchableOpacity onPress={() => setpage(page - 1)}>
                <View className="rounded-md  bg-referblue w-10 h-10  flex items-center m-1">
                  <Text className="text-white font-bold text-center text-3xl ">
                    &#x2039;
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setpage(page + 1)}>
                <View className="rounded-md  bg-referblue w-10 h-10 flex items-center m-1">
                  <Text className="text-white font-bold text-center text-3xl">
                    &#x203A;
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default PostsTab;
