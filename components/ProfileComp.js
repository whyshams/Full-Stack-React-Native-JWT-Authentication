import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import GlobalContext from "../GlobalContext";
import {
  useUpdateUserMutation,
  useLogoutApiMutation,
} from "../slices/userApiSlice";
import { Redirect, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const ProfileComp = () => {
  const { loginRes, setLoginRes, setLoading, loading } =
    useContext(GlobalContext);

  const [Name, setName] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [inputOnFocus, setInputOnFocus] = useState(false);

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [logoutApi] = useLogoutApiMutation();

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
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      setLoginRes();
      router.push("../");
      Alert.alert("LoggedOut");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmedPassword) {
      Alert.alert("Error!", "Password did not match,Bruh!");
    } else {
      try {
        const res = await updateUser({
          _id: loginRes._id,
          name: Name,
          username: username,
          password: password,
        }).unwrap();
        setLoginRes(res);
        Alert.alert("Profile Updated!");
      } catch (err) {
        Alert.alert("There was an Error", `${err?.data?.message || err.error}`);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setName(loginRes.name);
    setUsername(loginRes.username);
    setLoading(false);
  }, [loginRes.name, loginRes.username]);

  if (loading)
    return (
      <ActivityIndicator
        className="flex-1 my-10 justify-center"
        size="large"
        color="#000000"
      />
    );
  if (isLoading)
    return (
      <ActivityIndicator
        className="flex-1 my-10 justify-center"
        size="large"
        color="#000000"
      />
    );

  return (
    <>
      {!inputOnFocus ? (
        <View className="flex-row justify-start ">
          <Pressable
            className="bg-red-400 flex-row ml-2 p-3 mt-12 rounded-full"
            onPress={handleLogout}
          >
            <AntDesign name="logout" size={24} color="black" />
            <Text className="font-bold px-2">logout</Text>
          </Pressable>
        </View>
      ) : (
        <View className="flex-row justify-start ">
          <Pressable
            className="bg-red-200 ml-2 flex-row p-2  mt-12 rounded-full"
            onPress={handleLogout}
          >
            <AntDesign name="logout" size={24} color="black" />
          </Pressable>
        </View>
      )}

      <View style={styles.container}>
        <Text className="font-bold text-2xl">Update Profile</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            className="border-red-300"
            style={styles.input}
            value={Name}
            onChangeText={handleNameChange}
            placeholder="Change Name"
            onFocus={() => setInputOnFocus(true)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            className="border-red-400"
            style={styles.input}
            value={username}
            onChangeText={handleUsernameChange}
            placeholder="Change Username"
            onFocus={() => setInputOnFocus(true)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            className="border-red-500"
            style={styles.input}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Change Password"
            secureTextEntry
            onFocus={() => setInputOnFocus(true)}
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
            onFocus={() => setInputOnFocus(true)}
          />
        </View>

        <ScrollView>
          <Pressable
            className="bg-zinc-900 font-extrabold m-3 px-7 py-4 rounded-full"
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Update</Text>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    backgroundColor: "#000",
    zIndex: 3,
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

export default ProfileComp;
