import { View, Text } from "react-native";
import React, { useContext } from "react";
import GlobalContext from "../../GlobalContext";
import { Redirect, Stack } from "expo-router";
import Header from "../../components/Header";

const _layout = () => {
  const { loginRes, loading } = useContext(GlobalContext);

  return (
    <>
      {loginRes ? (
        <>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
          </Stack>
          <Header />
        </>
      ) : (
        <Redirect href="/" />
      )}
    </>
  );
};

export default _layout;
