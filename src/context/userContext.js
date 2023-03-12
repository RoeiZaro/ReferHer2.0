import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_URL, API_URL_JWT, REGISTER_TOKEN, USERNAME, PASSWORD } from "@env";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigation();
  const { setItem, getItem, removeItem } = useAsyncStorage("token");
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [chats, setChats] = useState([]);

  const readItemFromStorage = async () => {
    const item = await getItem();
    if (item) {
      return item;
    }
    return null;
  };
  const writeItemToStorage = async (newValue) => {
    await setItem(newValue);
  };
  const logout = async () => {
    await removeItem();
    setToken(null);
  };
  //WARNING: This is a temporary solution, in case the user try too many times to log in with incorrect credentials the api will retrurn a html recaptcha and this will break the function in the response.json() linne
  const authenticate = async (username, password) => {
    const body = JSON.stringify({ username, password });
    const response = await fetch(`${API_URL_JWT}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.error(`Error: ${data.message}`);
      if (data.message.charAt(0) === "<")
        Alert.alert(
          `Invalid username`,
          `${data.message
            .split(">")[2]
            .slice(1, data.message.split(">")[2].length)}`
        );
      if (data.message.charAt(0) === "T")
        Alert.alert(`Invalid password`, `${data.message}`);
      return false;
    }

    if (data.token) {
      setToken(data.token);
      await writeItemToStorage(data.token);
    }
    whoami;
    return false;
  };

  const whoami = async (token) => {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.error(
        `Error while trying to get user info with a token: ${data.message}`
      );
      return false;
    }

    return data;
  };

  // const register = async (data) => {
  //   let useToken = REGISTER_TOKEN;

  //   // checking token validity
  //   const response = await fetch(
  //     `https://referher.co/wp-json/jwt-auth/v1/token/validate`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${useToken}`,
  //       },
  //     }
  //   );
  //   const data = await response.json();

  //   // get new token if existing is bad
  //   if (response.status !== 200) {
  //     console.error(`Error: ${data.message}`);

  //     const body = JSON.stringify({ username: USERNAME, password: PASSWORD });
  //     const response2 = await fetch(`${API_URL_JWT}/token`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body,
  //     });

  //     const data2 = await response2.json();

  //     // if (response2.status !== 200) {
  //     //   console.error(`Error: ${data.message}`);
  //     //   if (data.message.charAt(0) === "<")
  //     //     Alert.alert(
  //     //       `Invalid username`,
  //     //       `${data.message
  //     //         .split(">")[2]
  //     //         .slice(1, data.message.split(">")[2].length)}`
  //     //     );
  //     //   if (data.message.charAt(0) === "T")
  //     //     Alert.alert(`Invalid password`, `${data.message}`);
  //     //   return false;
  //     // }

  //     if (data2.token) useToken = data2.token;
  //   }

  //   // create new user
  //   const { firstname, lastname, email, password, role } = data;
  //   const boddy = JSON.stringify({
  //     username: firstname + lastname,
  //     password: password,
  //     email: email,
  //     first_name: firstname,
  //     last_name: lastname,
  //     name: `${firstname} ${lastname}`,
  //     slug: firstname + lastname,
  //     nickname: firstname + lastname,
  //     roles: [role],
  //   });
  // };

  useEffect(() => {
    async function fetchToUserData(token) {
      const data = await whoami(token);

      if (!data) {
        console.log("Error: Unable to fetch user data with saved token");
        return;
      }

      setUserData(data);
    }
    async function fetchFromPhone() {
      const localInfo = await readItemFromStorage();
      if (!localInfo) {
        console.log("no token saved");
        return;
      }

      setToken(localInfo);
      fetchToUserData(localInfo);
    }
    token ? fetchToUserData(token) : fetchFromPhone();
  }, [token]);

  useEffect(() => {
    async function fetchChats(userData) {
      try {
        let res = {};
        if (userData.roles.includes("author")) {
          res = await axios.post("http://192.168.50.60:4000/authorChat", {
            user_id: userData.id,
          });
        } else if (userData.roles.includes("subscriber")) {
          res = await axios.post("http://192.168.50.60:4000/subscriberChat", {
            user_id: userData.id,
          });
        }
        setChats(res.data.chats);
      } catch (err) {
        console.error("couldnt get chats from server =>", err);
      }
    }
    (userData !== null) & fetchChats(userData);
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        token,
        chats,
        userData,
        authenticate,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// adflakshfasdhflaksjdhfklajsdhflkasjdhflkajs

const verifyToken = async (token) => {
  const response = await fetch(
    `https://referher.co/wp-json/jwt-auth/v1/token/validate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  if (response.status !== 200) {
    console.error(`Error: ${data.message}`);
    return false;
  }

  return data;
};
