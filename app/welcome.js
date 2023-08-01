import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import GlobalContext from "../GlobalContext";

const welcome = () => {
  const { loginRes, setLoginRes, loading } = useContext(GlobalContext);

  return (
    <>{loading ? <ActivityIndicator /> : <Text> {loginRes?.name}</Text>}</>
  );
};

export default welcome;
