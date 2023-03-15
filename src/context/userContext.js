import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { API_URL, API_URL_JWT, REGISTER_TOKEN, CHAT_API } from "@env";
import { createContext, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigation();
  const { setItem, getItem, removeItem } = useAsyncStorage("token");
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [chats, setChats] = useState([]);
  const socket = useRef();

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

  const registerWithCustomUsername = async (data, added, usedToken) => {
    const { firstName, lastName, email, password, role } = data;
    const body = JSON.stringify({
      username: `${firstName}${lastName}${added}`,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
      name: `${firstName} ${lastName}`,
      slug: firstName + lastName,
      nickname: firstName + lastName,
      roles: role,
    });
    await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${usedToken}`,
      },
      body,
    })
      .then((response) => response.json())
      .then((pl) => {
        if (pl.id) {
          Alert.alert(
            "register completed successfully",
            "You will redirect to the login page",
            [
              {
                text: "Ok",
                onPress: () =>
                  navigate.navigate("Login", { username: pl.username }),
                style: "destructive",
              },
            ],
            {
              cancelable: true,
              onDismiss: () =>
                navigate.navigate("Login", { username: pl.username }),
            }
          );
        } else if (pl.code) {
          if (pl.code == "existing_user_login")
            registerWithCustomUsername(data, added + 1, usedToken);
          else {
            Alert.alert(
              "Error while trying to register",
              pl.message,
              [
                {
                  text: "Ok",
                },
              ],
              {
                cancelable: true,
              }
            );
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const register = async (formData) => {
    let useToken = REGISTER_TOKEN;

    // create new user
    const { firstName, lastName, email, password, role } = formData;
    const boddy = JSON.stringify({
      username: firstName + lastName,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
      name: `${firstName} ${lastName}`,
      slug: firstName + lastName,
      nickname: firstName + lastName,
      roles: role,
    });
    await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${useToken}`,
      },
      body: boddy,
    })
      .then((response) => response.json())
      .then((pl) => {
        if (pl.id) {
          Alert.alert(
            "register completed successfully",
            "You will redirect to the login page",
            [
              {
                text: "Ok",
                onPress: () =>
                  navigate.navigate("Login", { username: pl.username }),
                style: "destructive",
              },
            ],
            {
              cancelable: true,
              onDismiss: () =>
                navigate.navigate("Login", { username: pl.username }),
            }
          );
        } else if (pl.code) {
          if (pl.code == "existing_user_login")
            registerWithCustomUsername(formData, 1, useToken);
          else {
            Alert.alert(
              "Error while trying to register",
              pl.message,
              [
                {
                  text: "Ok",
                },
              ],
              {
                cancelable: true,
              }
            );
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const updateAvatar = async (url) => {
    const body = JSON.stringify({ url: url });
    await fetch(`${API_URL}/users/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  };

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
          res = await axios.post(`${CHAT_API}:4000/authorChat`, {
            user_id: userData.id,
          });
        } else if (userData.roles.includes("subscriber")) {
          res = await axios.post(`${CHAT_API}:4000/subscriberChat`, {
            user_id: userData.id,
          });
        }
        setChats(res.data.chats);
      } catch (err) {
        console.error(
          "couldnt get chats from server =>",
          err,
          `${CHAT_API}:4000/subscriberChat`
        );
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
        register,
        updateAvatar,
        socket,
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
