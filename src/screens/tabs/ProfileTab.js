import {
  View,
  Text,
  Image,
  StatusBar,
  Button,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageUpload from "../components/ImageUpload";

export default function ProfileTab() {
  const { userData, logout } = useContext(UserContext);
  const getHumanReadableDate = (date) => {
    const event = new Date(
      Date.UTC(date.slice(0, 4), date.slice(5, 7) - 1, date.slice(8, 10))
    );
    const options = { year: "2-digit", month: "numeric", day: "numeric" };
    const dateUS = event.toLocaleDateString("en-US", options);
    return `${dateUS.split("/")[1]}/${dateUS.split("/")[0]}/${
      dateUS.split("/")[2]
    }`;
  };

  return userData ? (
    <View className="mx-auto text-center w-full">
      <SafeAreaView>
        <StatusBar backgroundColor="#8A2BE2" barStyle={"light-content"} />
      </SafeAreaView>

      <View className="overflow-hidden bg-white h-screen">
        <View className="px-4 py-5 flex-row">
          <View>
            <Text className="text-base font-medium leading-6 text-gray-900">
              {userData?.name}
            </Text>
            <Text className="mt-1 text-sm text-gray-400">
              {userData?.roles.map((role) => role).join(", ")}
            </Text>
          </View>
          <View className="ml-auto">
            <ImageUpload>
              <Image
                className="w-14 h-14 rounded-full border-2  border-blue-300"
                source={{ uri: userData?.url }}
              />
            </ImageUpload>
          </View>
        </View>
        <View className="border-t border-gray-200 px-4 py-5 divide-y divide-gray-200">
          <View className="py-4 flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-400">Firstname</Text>
            <Text className="text-sm text-gray-900">
              {userData?.first_name}
            </Text>
          </View>
          <View className="py-4 flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-400">Lastname</Text>
            <Text className="text-sm text-gray-900">{userData?.last_name}</Text>
          </View>
          <View className="py-4 flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-400">Nickname</Text>
            <Text className="text-sm text-gray-900">{userData?.nickname}</Text>
          </View>
          <View className="py-4 flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-400">Email</Text>
            <Text className="text-sm text-gray-900">{userData?.email}</Text>
          </View>
          <View className="py-4 flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-400">
              Registered Date
            </Text>
            <Text className="text-sm text-gray-900">
              {userData ? getHumanReadableDate(userData?.registered_date) : "j"}
            </Text>
          </View>
          <Button title="logout" onPress={() => logout()} />
        </View>
      </View>
    </View>
  ) : (
    <View className="flex-1 bg-pink-300 mx-auto text-center w-full justify-center">
      <ActivityIndicator />
    </View>
  );
}
