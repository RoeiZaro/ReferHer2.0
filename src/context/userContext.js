import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_URL, API_URL_JWT } from "@env";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigation();
  const { setItem, getItem, removeItem } = useAsyncStorage("token");
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    async function init() {
      const localInfo = await readItemFromStorage();
      if (!localInfo) {
        console.log("no token saved");
        return;
      }

      setToken(localInfo);
      const data = await whoami(localInfo);

      if (!data) {
        console.log("Error: Unable to fetch user data with saved token");
        return;
      }
      // console.log(data.avatar_urls[48]);
      setUserData(data);
    }
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        authenticate,
        whoami,
        removeItem,
        userData,
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
