import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as Statusbarr } from "expo-status-bar";
import { useForm, Controller } from "react-hook-form";

export default function Register() {
  const { authenticate } = useContext(UserContext);
  const [authRes, setAuthRes] = useState(null);
 
  const {control,handleSubmit,formState: { errors }} = useForm({defaultValues: {username: "",password: ""}});


  const onSubmit = (data) => {
    const { username, password } = data;

    authenticate(username, password)
    .then(result => setAuthRes(result))
    .catch(error => console.error(error));
  };

  return (
    <>
     <View>
        <Statusbarr style="dark" />
      </View>
      <View className=" bg-pink-900 flex min-h-full w-full flex-col justify-center py-12">
      <View className="bg-pink-800">
        <Text className="mt-6 text-center text-xl font-bold tracking-tight text-gray-800">
          Refer-her
        </Text>
      </View>
    {/* the register card conteiner */}
      <View className="bg-pink-600 mt-8">
        {/* rhe register card  */}
        <View className="bg-purple-200 py-8 px-4 shadow rounded-lg mx-5">

          {/* first name */}
          <View className="">
            <Text className="block text-sm font-bold text-gray-500">First name</Text>
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
              name="firstName"
            />
            {errors.username && <Text>This is required.</Text>}
          </View>

          {/* last name */}
          <View className="mt-5">
            <Text className="block text-sm font-bold text-gray-500">Last name</Text>
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
              name="lastName"
            />
            {errors.username && <Text>This is required.</Text>}
          </View>

           {/* email */}
           <View className="mt-5">
            <Text className="block text-sm font-bold text-gray-500">Email</Text>
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
              name="email"
            />
            {errors.username && <Text>This is required.</Text>}
          </View>

          {/* pass */}
          <View className="mt-5">
            <Text className="block text-sm font-bold text-gray-500">Password</Text>
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
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}
            </View>
          </View>

          {/* Confirm pass */}
          <View className="mt-5">
            <Text className="block text-sm font-bold text-gray-500">Confirm Password</Text>
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
                secureTextEntry={true}
              />
            )}
            name="confirmPassword"
          />
          {errors.password && <Text>This is required.</Text>}
            </View>
          </View>

          {/* choose role */}
          {/* agree ToS */}
          {/* Submit */}
          <View className="mt-5">
            <TouchableOpacity onPress={handleSubmit(onSubmit)}
              className="flex w-full justify-center rounded-md border border-transparent bg-pink-600 p-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Text className="text-center text-white">Sign in</Text>
            </TouchableOpacity>
          </View>
        
      </View>
    </View>
      </View>
    </>
  );
}
