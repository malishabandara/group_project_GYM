// context/UsersContext.js
import React, { createContext, useState, useEffect } from 'react';
import supabase from '../../lib/supabase';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('user_id, name');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();

    const subscription = supabase
      .from('users')
      .on('*', (payload) => {
        console.log('Change received!', payload);
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <UsersContext.Provider value={{ users }}>
      {children}
    </UsersContext.Provider>
  );
};
