import { Stack } from "expo-router";

import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { ContextProvider } from "../GlobalContext";

const layout = () => {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            options={{ headerShown: true, title: "" }}
          />
          <Stack.Screen name="Dashboard" options={{ headerShown: false }} />
          <Stack.Screen
            name="register"
            options={{ headerShown: true, title: "" }}
          />
        </Stack>
      </ContextProvider>
    </Provider>
  );
};

export default layout;
