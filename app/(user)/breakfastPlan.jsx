import { View, Text, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const breakfastPlan = () => {
  return (
    <SafeAreaView className="flex-1">
        <ScrollView>
        <Text className="font-pbold">below goes the breakfast plan</Text>  
        </ScrollView>
   
  </SafeAreaView>
    
  )
}

export default breakfastPlan;