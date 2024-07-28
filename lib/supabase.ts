import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://tvtilnnxgvqcmukpuffy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dGlsbm54Z3ZxY211a3B1ZmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxNjA1NzYsImV4cCI6MjAzNzczNjU3Nn0.5oVXTKCW02yjj53aIQjOUu2MhgrwMg9cgrBlm8JJcEI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
