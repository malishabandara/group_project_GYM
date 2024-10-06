import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

const ViewUserDetails = () => {
  const { params } = useRoute();
  const { userId } = params;
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.message.includes("The result contains 0 rows")) {
        Alert.alert('Error', 'User not found.');
        navigation.goBack();
      } else {
        console.error('Error fetching user details:', error);
        Alert.alert('Error', 'There was an error fetching user details.');
      }
      setLoading(false);
    } else {
      setUserDetails(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing.");
      navigation.goBack();
    }
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetails();
    }, [userId])
  );

  const handleSchedulePress = () => {
    navigation.navigate('admin/ViewSchedule', { userId });
  };

  const handleMealPlanPress = () => {
    navigation.navigate('admin/meal_plans', { userId });
  };

  const handleDeleteUser = async () => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            const { error } = await supabase
              .from('users')
              .delete()
              .eq('user_id', userId);

            if (error) {
              console.error('Error deleting user:', error);
              Alert.alert('Error', 'There was an error deleting the user.');
            } else {
              Alert.alert('Success', 'User deleted successfully!');
              navigation.navigate('Home'); // Navigate to UserDetails or another appropriate screen
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#764ABC" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {userDetails ? (
        <>
          <Image
            source={{ uri: userDetails.profile_pic || 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F15%2FGym-Fitness-Female-PNG-Transparent-Image.png&f=1&nofb=1&ipt=f45b80c45e4ea2d11a08cf961bddac58d6acabfba2bdc7eee1339480ca15cd97&ipo=images'}}
            style={styles.profilePic}
          />
          <Text style={styles.titles}>User Details</Text>
          <View style={styles.textDetails}>
            <Text style={styles.text}>ID: {userDetails.user_id}</Text>
            <Text style={styles.text}>Name: {userDetails.name}</Text>
            <Text style={styles.text}>Email: {userDetails.email}</Text>
            <Text style={styles.text}>Age: {userDetails.age}</Text>
            <Text style={styles.text}>Weight: {userDetails.weight}</Text>
            <Text style={styles.text}>Height: {userDetails.height}</Text>
            <Text style={styles.text}>Contact: {userDetails.phone}</Text>
            <Text style={styles.text}>Date of Admission: {userDetails.DoA}</Text>
          </View>
          <Text style={styles.titles}>Add a schedule for a user</Text>
          <TouchableOpacity style={styles.customButton} onPress={handleSchedulePress}>
            <Text style={styles.customButtonText}>Schedule</Text>
          </TouchableOpacity>
          <Text style={styles.titles}>Add a meal plan for a user</Text>
          <TouchableOpacity style={styles.customButton} onPress={handleMealPlanPress}>
            <Text style={styles.customButtonText}>Add Meal Plan</Text>
          </TouchableOpacity>
          <Text style={styles.titles}>Do you want to delete this user?</Text>
          <Button title="Delete" color="red" onPress={handleDeleteUser} />
        </>
      ) : (
        <Text>No user details found.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FB',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    marginLeft: 120,
  },
  textDetails: {
    backgroundColor: '#764ABC',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: '#F8F9FB',
  },
  titles: {
    color: '#764ABC',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
  },
  customButton: {
    backgroundColor: '#764ABC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  customButtonText: {
    color: '#F8F9FB',
    fontSize: 16,
  },
});

export default ViewUserDetails;
