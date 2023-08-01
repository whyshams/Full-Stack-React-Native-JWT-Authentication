import { View, Text } from "react-native";
import React, { useContext } from "react";
import GlobalContext from "../../GlobalContext";

const index = () => {
  const { loginRes, loading } = useContext(GlobalContext);
  return (
    <View className="flex-1 flex-row justify-center items-center">
      <Text className="font-bold text-5xl">
        We can start building a world here,{loginRes ? loginRes.name : null}!
      </Text>
    </View>
  );
};

export default index;
