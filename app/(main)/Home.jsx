import { View, Text, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { getUserData } from "../../services/userServices";

const Home = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const updateUserData = async (user) => {
      let res = await getUserData(user?.id);
      console.log("got user data: ", res.email);
      setEmail(res.email);
    };
  });

  const onLogOut = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Sign Out", "Error signing Out!");
    }
  };

  return (
    <ScreenWrapper>
      <Text>Home</Text>
      <Button title="Log Out" onPress={onLogOut} />
      <Text className="text-primary">{email}</Text>
    </ScreenWrapper>
  );
};

export default Home;
