import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { setAuth } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      // Get the current session (user authentication)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const userId = session.user.id; // Get the authenticated user's ID

        // Fetch the user data from the 'users' table by the user's ID
        const { data, error } = await supabase
          .from("profiles") // Change 'users' to your actual table name
          .select("*")
          .eq("id", userId)
          .single(); // Since we expect a single user

        if (error) {
          console.error("Error fetching user data:", error.message);
        } else {
          setUserData(data); // Set the fetched user data
        }
      } else {
        console.log("No user session found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onLogOut = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Sign Out", "Error signing Out!");
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View>
        <Text>No user data found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <View>
        <Text>Welcome, {userData.username || "User"}!</Text>
        {/* Assuming 'username' field exists */}
        <Text>Email: {userData.email}</Text>
        {/* Display image if 'image_url' exists */}
        {userData.image_url ? (
          <Image
            source={{ uri: userData.image_url }}
            style={styles.profileImage}
          />
        ) : (
          <Text>No profile image</Text>
        )}
        <Button title="Log Out" onPress={onLogOut} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
