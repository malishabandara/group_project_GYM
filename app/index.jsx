import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  Alert,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
// import { Link } from "expo-router";
import { Redirect, router } from "expo-router";
import { SafeAreaView, button } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const { setAuth } = useAuth();

  const onLogOut = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Sign Out", "Error signing Out!");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "transparent, padding:0, margin:0" }}
    >
      <ImageBackground
        source={require("../assets/images/userdashscreenfit.jpg")}
        resizeMode="cover"
        style={{ width, height }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
              paddingTop: 0,
            }}
          >
            <Text
              style={{
                fontSize: 80,
                fontWeight: "bold",
                color: "white",
                fontFamily: "primary",
              }}
            >
              Hi, Jane
            </Text>
          </View>

          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Text
              style={{
                fontSize: 36,
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                fontFamily: "primary",
                lineHeight: 36,
                marginBottom: 15,
              }}
            >
              Every rep, every step counts!
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                textAlign: "center",
                color: "white",
                fontFamily: "secondary",
              }}
            >
              Are you ready?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("(userTabs)")}
              style={{
                backgroundColor: "#FAE7FB",
                paddingVertical: 20,
                paddingHorizontal: 40,
                borderRadius: 20,
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#E054B8",
                }}
              >
                LET'S GET STARTED!
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onLogOut}
              style={{
                backgroundColor: "#FAE7FB",
                paddingVertical: 20,
                paddingHorizontal: 40,
                borderRadius: 20,
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#E054B8",
                }}
              >
                LOGOUT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
