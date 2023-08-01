import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import GlobalContext from "../GlobalContext";
import { useRegisterMutation } from "../slices/userApiSlice";
import { Redirect, useRouter } from "expo-router";

const RegisterComp = () => {
  const { loginRes, setLoginRes, setLoading, loading } =
    useContext(GlobalContext);

  const [Name, setName] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const router = useRouter();

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmedPasswordChange = (text) => {
    setConfirmedPassword(text);
  };

  const handleSubmit = async () => {
    if (password !== confirmedPassword) {
      Alert.alert("Error!", "Password did not match,Bruh!");
    } else {
      try {
        const res = await register({
          name: Name,
          username: username,
          password: password,
        }).unwrap();
        setLoginRes(res);
        setLoading(false);
        Alert.alert("Well done,bruh! You did it! You broke the Matrix ");
      } catch (err) {
        Alert.alert("There was an Error", `${err?.data?.message || err.error}`);
      }
    }
  };

  useEffect(() => {
    if (loginRes !== null && loginRes !== undefined) {
      router.replace("/Dashboard");
    }
  }, [loginRes]);

  if (isLoading)
    return (
      <ActivityIndicator
        className="flex-1 my-10 justify-center"
        size="large"
        color="#000000"
      />
    );

  return (
    <View style={styles.container}>
      <Text className="font-bold text-2xl">Register</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          className="border-red-300"
          style={styles.input}
          value={Name}
          onChangeText={handleNameChange}
          placeholder="Enter your Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          className="border-red-400"
          style={styles.input}
          value={username}
          onChangeText={handleUsernameChange}
          placeholder="Enter your username"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          className="border-red-500"
          style={styles.input}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          className="border-red-600"
          style={styles.input}
          value={confirmedPassword}
          onChangeText={handleConfirmedPasswordChange}
          placeholder="Confirm password"
          secureTextEntry
        />
      </View>
      <Pressable
        className="bg-zinc-900 text-red-300 font-extrabold m-3 px-7 py-4 rounded-full"
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
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

export default RegisterComp;
