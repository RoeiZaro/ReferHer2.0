import { API_URL } from "@env";
import { createContext, useState } from "react";

export const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts?_fields`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      // console.log(data);
      const image = await fetch(`${API_URL}/media/${data.media}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider value={{ fetchPosts, posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
