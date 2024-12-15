
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";



import { router } from "expo-router";

function body() {
  return (
     <SafeAreaView>
      <View>
          <Text>UserDashboard</Text>
          <Button title="Play" onPress={() => setIsPlaying(true)} />
      </View>
     </SafeAreaView>
        
   
  )
}

export default body

