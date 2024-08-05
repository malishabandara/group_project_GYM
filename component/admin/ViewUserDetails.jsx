import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    navigation.navigate('Workouts', { userId });
  };

  const handleMealPlanPress = () => {
    navigation.navigate('Meal Plans', { userId });
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
              navigation.navigate('User Details'); // Navigate to UserDetails or another appropriate screen
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {userDetails ? (
        <>
          <Text style={styles.detail}>ID: {userDetails.user_id}</Text>
          <Text style={styles.detail}>Name: {userDetails.name}</Text>
          <Text style={styles.detail}>Weight: {userDetails.weight}</Text>
          <Text style={styles.detail}>Height: {userDetails.height}</Text>
          <Text style={styles.detail}>Contact: {userDetails.phone}</Text>
          <Text style={styles.detail}>Date of Admission: {userDetails.DoA}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Schedule" onPress={handleSchedulePress} color="#FFF"/>
              <Icon name="add" size={20} color="#FFF" />
            </View>
            <View style={styles.button}>
              <Button title="Add Meal Plan" onPress={handleMealPlanPress} color="#FFF" />
              <Icon name="add" size={20} color="#FFF" />
            </View>
            <Button title="Delete" color="red" onPress={handleDeleteUser} />
          </View>
        </>
      ) : (
        <Text>No user details found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
    backgroundColor: '#007BFF',
  },
});

export default ViewUserDetails;
