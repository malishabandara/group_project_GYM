import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import BMIcal from '../../components/BMIcal'
import { useNavigation } from "@react-navigation/native";


const UserStats = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#FFF" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>User Stats</Text>
      <BMIcal />
    </ScrollView>
  )
}

export default UserStats