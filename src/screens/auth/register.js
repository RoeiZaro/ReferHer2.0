import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  Switch,
  Button,
} from "react-native";
import { useContext, useState } from "react";
import * as Icons from "react-native-heroicons/solid";
import { UserContext } from "../../context/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as Statusbarr } from "expo-status-bar";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "expo-checkbox";

export default function Register() {
  const { register } = useContext(UserContext);
  const [authRes, setAuthRes] = useState(null);
  const [seePass, setSeePass] = useState(false);
  const [seeConPass, setSeeConPass] = useState(false);
  const [accountType, setAccountType] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  // const hadleSeeConPass = () =>{
  //   setSeeConPass
  // }

  const onSubmit = (data) => {
    if (!(data.password === data.conPass))
      Alert.alert("Passwords do not match");
    else {
      const allData = { ...data, role: accountType };
      register(allData);
    }
  };

  const handlePress = (role) => {
    setAccountType(role);
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
        <View className="bg-pink-600">
          {/* rhe register card  */}
          <View className="bg-purple-200 py-8 px-4 shadow rounded-lg mx-5">
            {accountType ? (
              <>
                {/* first name */}
                <View className="">
                  <Text className="block text-sm font-bold text-gray-500">
                    First name
                  </Text>
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
                  {errors.firstName && <Text>This is required.</Text>}
                </View>

                {/* last name */}
                <View className="mt-5">
                  <Text className="block text-sm font-bold text-gray-500">
                    Last name
                  </Text>
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
                  {errors.lastName && <Text>This is required.</Text>}
                </View>

                {/* email */}
                <View className="mt-5">
                  <Text className="block text-sm font-bold text-gray-500">
                    Email
                  </Text>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This is required.",
                      },
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format.",
                      },
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
                  {errors.email && <Text>{errors.email.message}</Text>}
                </View>

                {/* pass */}
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
                        required: true,
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

                {/* Confirm pass */}
                <View className="mt-5">
                  <Text className="block text-sm font-bold text-gray-500">
                    Confirm Password
                  </Text>
                  <Pressable
                    onPress={() => setSeeConPass((prev) => !prev)}
                    className="absolute right-0"
                  >
                    {seeConPass ? (
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
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          className="w-full appearance-none rounded-md border border-gray-300 px-4 py-3 placeholder-pink-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-yellow-500"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          secureTextEntry={!seeConPass}
                        />
                      )}
                      name="conPass"
                    />
                    {errors.conPass && (
                      <Text style={{ color: "red" }}>
                        {errors.conPass.message}
                      </Text>
                    )}
                  </View>
                </View>

                {/* choose role */}
                {/* agree ToS */}
                <View className=" flex-row items-center mt-5">
                  <View>
                    <Controller
                      control={control}
                      defaultValue={false}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          value={value}
                          onBlur={onBlur}
                          onValueChange={(newValue) => {
                            onChange(newValue);
                          }}
                          color={value ? "#FF3591" : undefined}
                        />
                      )}
                      name="terms"
                    />
                  </View>
                  <Text className="block text-sm font-bold text-gray-500">
                    Agree to the ToS
                  </Text>
                  {errors.terms && <Text>This is required.</Text>}
                </View>

                {/* Submit */}
                <View className="mt-5">
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="flex w-full justify-center rounded-md border border-transparent bg-pink-600 p-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Text className="text-center text-white">Sign in</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View className="flex-row justify-around">
                  <Pressable
                    classname="bg-purple-600"
                    onPress={() => handlePress("author")}
                  >
                    <Text>referal</Text>
                  </Pressable>
                  <Pressable
                    classname="bg-purple-600"
                    onPress={() => handlePress("subscriber")}
                  >
                    <Text>referer</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
