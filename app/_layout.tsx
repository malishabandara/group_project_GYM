import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect,useState } from 'react';
import 'react-native-reanimated';
//import { NativeBaseProvider } from 'native-base';

import { useColorScheme } from '@/hooks/useColorScheme';
import GlobalProvider from "../context/GlobalProvider"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
 
  const [loaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
    'SpaceMono-Regular':require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Regular':require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Black':require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Light':require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium':require('../assets/fonts/Poppins-Medium.ttf'),

  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack initialRouteName=''>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='home' options={{headerShown:false}}/>
        <Stack.Screen name='Register' options={{headerShown:false}}/>
        <Stack.Screen name='Login' options={{headerShown:false}}/>
        <Stack.Screen name='registerScreen' options={{headerShown:false}}/>
        <Stack.Screen name='successScreen' options={{headerShown:false}}/>
        <Stack.Screen name='weightScreen' options={{headerShown:false}}/>
        <Stack.Screen name='Account' options={{headerShown:false}}/>
      </Stack>   
    </GlobalProvider>
   
  );
}

