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
      <Text className="font-bold " style={{ fontSize: 32 }}>
        A Project Created by Nuren Shams. JWT authentication with React js in
        the web and React Native for android and ios app using single database
        and API.
      </Text>
      <View className=" flex-row justify-center">
        <Link
          className="bg-zinc-900 text-red-300 rounded m-3 p-4"
          href="/login"
        >
          Login
        </Link>
        <Link
          className="bg-zinc-900 text-red-300 rounded m-3 p-4"
          href="/register"
        >
          Register
        </Link>
      </View>
      <View>
        <Text>See the web version</Text>
        <Button
          title="Here"
          onPress={() =>
            Linking.openURL(
              "https://github.com/whyshams/MERN-Stack-JWT-authentication"
            )
          }
        />
      </View>
    </View>
  );
}
