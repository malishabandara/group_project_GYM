import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notification')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
    } else {
      setNotifications(data);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.message}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noNotifications}>No Notifications Yet</Text>
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 16,
  //   backgroundColor: "#F8F9FB",
  // },
  noNotifications: {
    fontSize: 18,
    color: "red",
    margin: 17
  },
});