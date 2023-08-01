import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { Redirect, useRouter } from "expo-router";
import GlobalContext from "../GlobalContext";

const LoginComp = () => {
  const { loginRes, setLoginRes, loading, setLoading } =
    useContext(GlobalContext);
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await login({
        username: username,
        password: password,
      }).unwrap();

      setLoginRes(res);

      setLoading(false);
      Alert.alert("", "LoggedIn Successfully!", [
        {
          text: "Ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "ok",
        },
      ]);
    } catch (err) {
      setLoading(false);

      Alert.alert("Error ", `${err?.data?.message || err?.error}`, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
  };

  useEffect(() => {
    if (loginRes !== null && loginRes !== undefined) {
      router.replace("/Dashboard");
    }
  }, [loginRes]);

  if (loading)
    return (
      <ActivityIndicator
        className="flex-1 my-10 justify-center"
        size="large"
        color="#000000"
      />
    );

  return (
    <View style={styles.container}>
      <Text className="font-bold text-2xl">Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          className="border-red-300"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter your username"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          className="border-red-400"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        className="bg-zinc-900 font-extrabold m-3 px-7 py-4 rounded-full"
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 50,

    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginComp;
