import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const BodyLayout = () => {
  return (
    <>
    <Stack>
    
    <Stack.Screen name = "body" options={{headerShown:false}}/>
    
  </Stack>
    </>
    
  )
}

export default BodyLayout