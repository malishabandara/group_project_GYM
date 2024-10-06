import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MemberCard = ({ totalMembers }) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonth = monthNames[new Date().getMonth()];

  return (
    <View style={styles.card}>
      <Text style={styles.totalMembersText}>
        <Text style={styles.icon}>👤 </Text>
        Total Members
      </Text>
      <Text style={styles.memberCount}>{totalMembers}</Text>
      <Text style={styles.month}>{currentMonth}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#764ABC',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
    margin: 15,
  },
  totalMembersText: {
    fontSize: 16,
    color: '#F8F9FB',
    marginBottom: 10,
  },
  icon: {
    fontSize: 16,
  },
  memberCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F8F9FB',
  },
  month: {
    fontSize: 16,
    color: '#F8F9FB',
    marginTop: 10,
  },
});

export default MemberCard;
