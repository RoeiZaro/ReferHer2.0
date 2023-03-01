import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigation();
  const { getItem } = useAsyncStorage("token");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(123);

  //   const readItemFromStorage = async () => {
  //     const item = await getItem();
  //     setToken(item);
  //   };

  //   useEffect(() => {
  //     readItemFromStorage();
  //   }, []);

  //   useEffect(() => {
  //     if (token) getUser();
  //   }, [token]);

  //   const getUser = async () => {
  //     try {
  //       const res = await axios.post("http://10.0.0.10:3000/getUser", {
  //         token: token,
  //       });

  //       if (res.status === 200) setUser(res.data.user);
  //       else setUser(null);
  //     } catch (e) {
  //       console.log("78", e);
  //     }
  //   };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
