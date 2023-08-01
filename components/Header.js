import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { FontAwesome, Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import GlobalContext from "../GlobalContext";

const Header = () => {
  const [homePressed, setHomePressed] = useState(false);
  const [profilePressed, setProfilePressed] = useState(false);
  const { setLoading } = useContext(GlobalContext);

  const router = useRouter();
  const pathname = usePathname();

  const onHomeClick = () => {
    router.replace("/Dashboard");
  };
  const onProfileClick = () => {
    setLoading(true);
    router.replace("/Dashboard/profile");
    setLoading(false);
  };

  return (
    <View className="flex-row justify-around py-5">
      <TouchableOpacity onPress={onHomeClick}>
        {pathname === "/Dashboard" ? (
          <Ionicons name="home" size={28} color="black" />
        ) : (
          <Ionicons name="home-outline" size={28} color="black" />
        )}
      </TouchableOpacity>
      <Pressable onPress={onProfileClick}>
        {pathname === "/Dashboard/profile" ? (
          <FontAwesome name="user" size={28} color="black" />
        ) : (
          <FontAwesome name="user-o" size={28} color="black" />
        )}
      </Pressable>
    </View>
  );
};

export default Header;
