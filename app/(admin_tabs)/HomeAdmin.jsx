// src/components/UserDetails.jsx
import React, { useEffect, useState, useCallback, StatusBar } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../lib/supabase"; // Adjust the import path as needed
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import { Alert } from "react-native";
import MemberCard from "../admin/MemberCard ";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [totalMembers, setTotalMembers] = useState(0); // New state for total members

  // User Details
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("user_id, name, profile_pic");

    if (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Unable to fetch users. Please try again later.");
    } else {
      setUsers(data);
      setFilteredUsers(data);
      setTotalMembers(data.length); // Set total members
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercasedQuery) ||
        user.user_id.toString().includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  };

  const handleUserPress = (userId) => {
    navigation.navigate("admin/ViewUserDetails", { userId });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#764ABC" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome_text}>Welcome, Admin</Text>
      <MemberCard totalMembers={totalMembers} />
      <Text style={styles.recent_users}>Recent Users</Text>
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#764ABC"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search... Name or ID"
          placeholderTextColor="rgba(118, 74, 188, 0.3)"
          value={searchQuery}
          onChangeText={handleSearch}
          selectionColor="#764ABC" // Change the curser color
        />
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => handleUserPress(item.user_id)}
          >
            <View style={styles.userContent}>
              <Image
                source={{
                  uri:
                    item.profile_pic ||
                    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F15%2FGym-Fitness-Female-PNG-Transparent-Image.png&f=1&nofb=1&ipt=f45b80c45e4ea2d11a08cf961bddac58d6acabfba2bdc7eee1339480ca15cd97&ipo=images",
                }}
                style={styles.profilePic}
              />
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userId}>{item.user_id}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F9FB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  welcome_text: {
    color: "#764ABC",
    fontWeight: "bold",
  },
  recent_users: {
    color: "#764ABC",
    margin: 5,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 1,
    borderColor: "#764ABC",
    borderWidth: 1,
    borderRadius: 40,
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 8,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 8,
    color: "#764ABC",
  },
  userContainer: {
    padding: 15,
  },
  userContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(118, 74, 188, 0.3)",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#764ABC",
  },
  userId: {
    fontSize: 16,
    color: "#764ABC",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default UserDetails;
