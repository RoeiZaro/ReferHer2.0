import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as Statusbarr } from "expo-status-bar";
import { useForm, Controller } from "react-hook-form";
import * as Icons from "react-native-heroicons/solid";

export default function Login({ route }) {
  const { authenticate } = useContext(UserContext);
  const [authRes, setAuthRes] = useState(null);
  const [seePass, setSeePass] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: route?.params ? route?.params?.username : "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const { username, password } = data;

    authenticate(username, password)
      .then((result) => setAuthRes(result))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <View>
        <Statusbarr style="dark" />
      </View>
      <View className=" bg-pink-300 flex min-h-full w-full flex-col justify-center py-12">
        <View className="">
          <Text className="mt-6 text-center text-xl font-bold tracking-tight text-gray-800">
            Refer-her
          </Text>
        </View>

        <View className="mt-8">
          <View className="bg-purple-200 py-8 px-4 shadow rounded-lg mx-5">
            <View>
              <Text className="block text-sm font-bold text-gray-500">
                Email Address or Username
              </Text>
              <View className=" justify-center ">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="block w-full appearance-none rounded-md border border-gray-300 px-4 py-3 placeholder-pink-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-yellow-500"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="username"
                />
                {errors.username && <Text>This is required.</Text>}
              </View>

              <View className="mt-5">
                <Text className="block text-sm font-bold text-gray-500">
                  Password
                </Text>
                <Pressable
                  onPress={() => setSeePass((prev) => !prev)}
                  className="absolute right-0"
                >
                  {seePass ? (
                    <Icons.EyeSlashIcon size={24} color="grey" />
                  ) : (
                    <Icons.EyeIcon size={24} color="grey" />
                  )}
                </Pressable>
                <View className="mt-2">
                  <Controller
                    control={control}
                    rules={{
                      maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="block w-full appearance-none rounded-md border border-gray-300 px-4 py-3 placeholder-pink-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-yellow-500"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={!seePass}
                      />
                    )}
                    name="password"
                  />
                  {errors.password && <Text>This is required.</Text>}
                </View>
              </View>

              <View className="mt-5">
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className="flex w-full justify-center rounded-md border border-transparent bg-pink-600 p-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Text className="text-center text-white">Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
