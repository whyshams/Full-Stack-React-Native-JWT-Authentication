import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import { Link, useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();

  return (
    <View className=" flex-1 justify-center  mx-7 my-11">
      <Text className="font-bold text-center" style={{ fontSize: 24 }}>
        A Project Created by Nuren Shams. JWT authentication with React js in
        the web and React Native for android and ios app using single database
        and API.
      </Text>
      <View className=" flex-row justify-center">
        <Link
          className="bg-zinc-900 text-red-300 font-extrabold m-3 px-7 py-4 rounded-full"
          href="/login"
        >
          Login
        </Link>
        <Link
          className="bg-zinc-900 text-red-300 font-extrabold m-3 px-7 py-4 rounded-full"
          href="/register"
        >
          Register
        </Link>
      </View>
      <View className="flex-row justify-center mt-10">
        <Text
          className="text-blue-700"
          onPress={() =>
            Linking.openURL("https://authentication-szar.onrender.com/")
          }
        >
          See the web version here
        </Text>
      </View>
    </View>
  );
}
