import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import BMIcal from '../../components/BMIcal'


const stats = () => {
  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#FFF" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>User Stats</Text>
      <BMIcal />
    </ScrollView>
  )
}

export default stats