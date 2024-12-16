import React from "react";
import { useEffect } from "react";
import { Linking, View,Alert,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const contactCoach = () => {
  const coachPhoneNumber = '94776654177'; //without+

  useEffect(() => {
   // const whatsappUrl =  `https://wa.me/${coachPhoneNumber}`;
   const whatsappUrl =  `whatsapp://send?phone=${coachPhoneNumber}`;

    Linking.openURL(whatsappUrl)
    .then((supported) => {
      if (supported){
       Linking.openURL(whatsappUrl);
      }
      else{
        Alert.alert('Error', 'Whatsapp is not installed or supported on this device.');
      }
  })

  .catch((err) => console.error('Error opening Whatsapp:', err));
    
  },[]);

  return(
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-xl font-psemibold text-center">
        Redirecting you to Whatsapp...
        </Text>
    </SafeAreaView>
  );
};

export default contactCoach;
