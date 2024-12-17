import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Button,
  StatusBar,
} from "react-native";
import { Calendar } from "react-native-calendars";
import React, { useState } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import Widget from "../../components/Widget";
import LongWidget from "../../components/LongWidget";
import CustomButton from "../../components/CustomButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const UserHome = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const navigation = useNavigation();
  const onDayPress = (day) => {
    const selectedDay = day.dateString;
    setSelectedDate(selectedDay);

    if (markedDates[selectedDay]) {
      Alert.alert(
        "Details Exist",
        `Details for ${selectedDay}: ${markedDates[selectedDay].details}`,
        [
          {
            text: "Update",
            onPress: () => {
              setDetails(markedDates[selectedDay].details);
              setModalVisible(true);
            },
          },
          {
            text: "Delete",
            onPress: () => handleDeleteDetails(selectedDay),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      setDetails("");
      setModalVisible(true);
    }
  };

  const handleSaveDetails = () => {
    setMarkedDates({
      ...markedDates,
      [selectedDate]: { marked: true, selectedColor: "blue", details: details }, //dotColor: 'blue'
    });
    setModalVisible(false);
  };

  const handleDeleteDetails = (date) => {
    const updatedMarkedDates = { ...markedDates };
    delete updatedMarkedDates[date];
    setMarkedDates(updatedMarkedDates);
  };

  return (
    <SafeAreaView className="flex-1 m-3">
      <ScrollView>
        <View className="flex-row justify-between items-center">
          <View>
            <View className="flex-row items-center">
              <Text className="text-2xl font-pbold">Welcome, </Text>
              <Text className="text-xl font-psemibold">Jane Doe!</Text>
            </View>
            <Text className="text-base font-pregular">
              Are you reaching your goals?
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("(userTabs)/UserProfile")}
          >
            <Image className="w-16 h-16 rounded-full" source={images.girl} />
          </TouchableOpacity>
        </View>

        <View className="border-t border-gray-300 mt-2"></View>

        {/* Calendar Component */}
        <View className="p-4">
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates} // Pass the markedDates state to the calendar
          />
        </View>

        {/* <View className="border-t border-gray-300"></View> */}

        <View className="justify-center items-center m-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("(userTabs)/UserPlans")}
            style={{
              backgroundColor: "#C7F03C",
              width: 300,
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Click Me</Text>
          </TouchableOpacity>
        </View>

        {/* <View className="border-t border-gray-300"></View> */}

        <View className="text-center">
          <TouchableOpacity 
            title="Meal Plan"
            onPress={() => navigation.navigate("(user)/UserMealPlans")}
            containerStyles={{ backgroundColor: "#128c7e" }}
          >
            <Text
              style={{
                width: 200,
                height: 60,
                //backgroundColor: '#25D366', // WhatsApp green
                backgroundColor: "#128C7E", //Whatsapp-green-darker
                elevation: 5, // Android shadow
                shadowColor: "#000", // iOS shadow
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              }}
            >
              Meal Plan
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("../(user)/contactCoach")}
            activeOpacity={0.8}
            className="flex-row items-center justify-center rounded-lg"
            style={{
              width: 200,
              height: 60,
              //backgroundColor: '#25D366', // WhatsApp green
              backgroundColor: "#128C7E", //Whatsapp-green-darker
              elevation: 5, // Android shadow
              shadowColor: "#000", // iOS shadow
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          >
            <FontAwesome
              name="whatsapp"
              size={28}
              color="white"
              style={{ marginRight: 12 }}
            />
            <Text className="text-white text-lg font-pbold">Contact Coach</Text>
          </TouchableOpacity>
        </View>

        {/* <View className="w-full">
          <TouchableOpacity
            onPress={() => router.push("../(user)/contactCoach")}
            className="m-4 bg-primary flex-row items-center justify-center py-3 rounded-lg"
          >
            <FontAwesome name="whatsapp" size={24} color="black" style={{ marginRight: 8 }} />
            <Text className="text-black text-lg font-pbold">Contact Coach</Text>
          </TouchableOpacity>
        </View> */}

        {/* <View className="w-full ">
          <CustomButton
          title="Contact Coach"
          handlePress={() => router.push("../(user)/contactCoach")}
          containerStyles="m-4 bg-primary"
          
          />
        </View> */}
      </ScrollView>

      {/* Modal for Adding Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-72 p-5 bg-white rounded-lg">
            <Text className="text-lg text-center mb-2">
              Add Details for {selectedDate}
            </Text>
            <TextInput
              className="h-32 border border-gray-400 mb-2 px-2.5"
              placeholder="Enter details"
              onChangeText={setDetails}
              value={details}
            />
            <View className="mb-3">
              <Button title="Save" onPress={handleSaveDetails} />
            </View>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default UserHome;
