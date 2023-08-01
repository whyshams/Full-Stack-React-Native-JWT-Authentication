import { View, Text, Button, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import LoginComp from "../components/LoginComp";

const login = () => {
  const { name } = useLocalSearchParams();
  return <LoginComp />;
};

export default login;
