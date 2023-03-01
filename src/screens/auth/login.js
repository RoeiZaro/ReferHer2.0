import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as Statusbarr } from "expo-status-bar";
import { useForm, Controller } from "react-hook-form";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Login() {
  const { user, setUser, setToken } = useContext(UserContext);
  const navigation = useNavigation();
  const { setItem } = useAsyncStorage("token");

  const writeItemToStorage = async (newValue) => {
    await setItem(newValue);
    setToken(newValue);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("http://192.168.34.8:3000/login", {
        email,
        password,
      });
      if (res.status === 201) {
        alert("user not found");
      }
      if (res.status === 200) {
        await writeItemToStorage(res.data.token);
        setData(res.data.user);
        setTimeout(() => {
          navigation.goBack();
        }, 900);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data) => {
    login(data);
  };
  return (
    <SafeAreaView>
      <View>
        <Statusbarr style="dark" />
      </View>
      <View className="bg-purple-200 basis-full ">
        <Text className="font-extrabold  text-6xl text-pink-500 bg-purple-300">
          ReferHer
        </Text>
        <View className="flex-row justify-center ">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="email"
              />
            )}
            name="email"
          />
          {errors.email && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="password"
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}
          <TouchableOpacity
            className="text-white bg-purple-900  mt-2 justify-center font-medium rounded-lg text-base w-20 h-7  align-content: center items-center "
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
