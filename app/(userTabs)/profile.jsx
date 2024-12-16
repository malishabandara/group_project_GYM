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
import * as ImagePicker from "expo-image-picker";
import images from "../../constants/images";
import icons from "../../constants/icons"; // Add your camera icon here
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [name, setName] = useState("Jane Doe");
  const [registrationNumber, setRegistrationNumber] = useState("123456");
  const [age, setAge] = useState("30");
  const [email, setEmail] = useState("janedoe@example.com");
  const [weight, setWeight] = useState("50");
  const [height, setHeight] = useState("153");
  const [newImage, setNewImage] = useState(images.girl);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSave = () => {
    setAlertMessage("Your profile has been updated successfully!");
    setIsAlertVisible(true);
    // Alert.alert(
    //   "Profile Updated",
    //   "Your profile details have been updated successfully."
    // );
    setIsEditing(false);
  };

  const handleEditImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setAlertMessage(
        "Permission Required",
        "Sorry, we need camera roll permissions to make this work!"
      );
      setIsAlertVisible(true);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage({ uri: result.assets[0].uri });
      setAlertMessage("Profile picture updated successfully!");
      setIsAlertVisible(true);
      setIsImageModalVisible(false);
    }
  };

  const handleDeleteImage = () => {
    setNewImage(images.girl);
    setAlertMessage("Profile picture deleted successfully!");
    setIsAlertVisible(true);

    setIsImageModalVisible(false);
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="m-4">
          <View className="flex-row items-center m-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                className="w-7 h-7"
                source={icons.leftArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="absolute left-0 right-0 items-center">
              <Text className="font-psemibold text-xl">Profile</Text>
            </View>
          </View>

          <View className="border-t border-gray-300"></View>

          <View className="m-1 items-center mt-16">
            <View
              className="w-40 h-40 overflow-hidden rounded-full relative "
              style={{
                position: "relative",
                marginTop: -50,
                zIndex: 1,
                borderWidth: 4,
                borderColor: "#C5C6D0",
                shadowColor: "#808080",
                shadowOpacity: 0.8,
                shadowOffset: { width: 0, height: 4 },
              }}
            >
              <Image
                className="w-full h-full"
                source={newImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => setIsImageModalVisible(true)}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full"
                style={{ backgroundColor: "#00000080" }}
              >
                <View className="w-8 h-8">
                  <Image
                    source={icons.camera} // Replace with your camera icon
                    className="w-8 h-8"
                    resizeMode="cover"
                    style={{ tintColor: "white" }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View
              className="p-6 bg-blue-200 rounded-lg shadow"
              style={{
                marginTop: -20,
                zIndex: 0,
              }}
            >
              <Text className="text-base font-pmedium m-1">Name: {name}</Text>
              <View className="border-t border-gray-400"></View>
              <Text className="text-base font-pmedium m-2">
                Registration Number: {registrationNumber}
              </Text>
              <View className="border-t border-gray-400"></View>

              <Text className="text-base font-pmedium m-2">Age: {age}</Text>
              <View className="border-t border-gray-400"></View>
              <Text className="text-base font-pmedium m-2">Email: {email}</Text>

              <View className="border-t border-gray-400"></View>
              <Text className="text-base font-pmedium m-2">
                Weight (kg): {weight}
              </Text>

              <View className="border-t border-gray-400"></View>
              <Text className="text-base font-pmedium m-2">
                Height (cm): {height}
              </Text>
            </View>
          </View>

          <CustomButton
            title="Edit Details"
            handlePress={() => setIsEditing(true)}
            containerStyles={`m-4 shadow-sm`}
          />

          {/* Modal for Image Actions */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isImageModalVisible}
            onRequestClose={() => setIsImageModalVisible(false)}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="w-80 p-6 bg-white rounded-lg items-center">
                <Text className="text-lg font-pbold mb-1">Edit Image</Text>
                <View className="border-t border-gray-500"></View>

                <CustomButton
                  title="Change Profile Picture"
                  handlePress={handleEditImage}
                  containerStyles={`w-60 bg-blue-400 p-2 m-2`}
                />

                <CustomButton
                  title="Delete Profile Picture"
                  handlePress={handleDeleteImage}
                  containerStyles={`w-60 bg-red-400 p-2 m-2`}
                />

                <CustomButton
                  title="Cancel"
                  handlePress={() => setIsImageModalVisible(false)}
                  containerStyles={`w-60 p-2 m-2`}
                />
              </View>
            </View>
          </Modal>

          <CustomAlert
            isAlertVisible={isAlertVisible}
            setIsAlertVisible={setIsAlertVisible}
            alertMessage={alertMessage}
          />

          {/* <Modal
            animationType="fade"
            transparent={true}
            visible={isAlertVisible}
            onRequestClose={() => setIsAlertVisible(false)}
          >
          <View className="flex-1 justify-center items-center bg-black/50">
              <View className="w-80 p-5 bg-white rounded-lg items-center shadow-lg">
                <Text className="text-lg font-pmedium mb-4">{alertMessage}</Text>
                <Button
              
                  title="OK"
                  onPress={()=>setIsAlertVisible(false)}
                  
                />

              </View>

          </View>
            </Modal> */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={isEditing}
            onRequestClose={() => setIsEditing(false)}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="w-80 p-6 bg-white rounded-lg">
                <View>
                  <Text className="text-lg font-pbold text-center mb-1 ">
                    Edit Details
                  </Text>
                </View>

                <TextInput
                  className="border-2 border-gray-400 p-2 mb-2 rounded-xl text-base font-pmedium"
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  className="border-2 border-gray-400 p-2 mb-2 rounded-xl text-base font-pmedium"
                  placeholder="Age"
                  value={age}
                  onChangeText={setAge}
                />
                <TextInput
                  className="border-2 border-gray-400 p-2 mb-2 rounded-xl text-base font-pmedium"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />

                <TextInput
                  className="border-2 border-gray-400 p-2 mb-2 rounded-xl text-base font-pmedium"
                  placeholder="Weight (in kg)"
                  value={weight}
                  onChangeText={setWeight}
                />

                <TextInput
                  className="border-2 border-gray-400 p-2 mb-2 rounded-xl text-base font-pmedium"
                  placeholder="Height (in cm)"
                  value={height}
                  onChangeText={setHeight}
                />

                <CustomButton
                  title="Save"
                  handlePress={handleSave}
                  containerStyles={`mt-2 mb-2 bg-blue-400`}
                />

                <CustomButton
                  title="Cancel"
                  handlePress={() => setIsEditing(false)}
                />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
