import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigation();
  const { getItem,setItem,removeItem } = useAsyncStorage("token");
  const [token, setToken] = useState(null);
  const [userData, seUsertData] = useState(null);
  const [user, setUser] = useState(123);

    const readItemFromStorage = async () => {
      const item = await getItem();
      if(item){
        return item
      }
      return null;
    };

    const writeItemToStorage = async (newValue) => {
      await setItem(newValue);
      setToken(newValue);
    };

    const authenticate = async (username, password) => {
      const body = JSON.stringify({ username, password });
      const response = await fetch(`${process.env.API_URL_JWT}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body,
      });
    
      const data = await response.json();
    
      if (response.status !== 200) {
        console.error(`Error: ${data.message}`);
        return false;
      }
    
      if (data.token) {
        setToken(data.token);
        await writeItemToStorage(data.token);
          setTimeout(() => {
            navigate.goBack();
          }, 900);
      }
    
      return false;
    };


    const whoami = async (token) => {
      const response = await fetch(`${process.env.API_URL}/users/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    
      const data = await response.json();
    
      if (response.status !== 200) {
        console.error(`Error while trying to get user info with a token: ${data.message}`);
        return false;
      }
    
      return data;
    };
    
    useEffect(() => {
     async function  init(){
         const localInfo = await readItemFromStorage();
         if (localInfo) {
             setToken(localInfo);
             setUserData(whoami(localInfo));
         }
      }
      init()
    }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        authenticate,
        whoami,
        removeItem


      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// adflakshfasdhflaksjdhfklajsdhflkasjdhflkajs

const verifyToken = async (token) => {
  const response = await fetch(`${apiUrl}token/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    console.error(`Error: ${data.message}`);
    return false;
  }

  return data;
};



