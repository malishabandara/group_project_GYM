import React, { createContext, useState, useEffect } from "react";
import supabase from "../../lib/supabase";

export const MealPlansContext = createContext();

export const MealPlansProvider = ({ children }) => {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      const { data, error } = await supabase.from("meal_plans").select("*");
      if (error) console.error("Error fetching meal plans:", error);
      else setMealPlans(data);
    };

    fetchMealPlans();

    const subscription = supabase
      .from("meal_plans")
      .on("*", (payload) => {
        console.log("Change received!", payload);
        fetchMealPlans();
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <MealPlansContext.Provider value={{ mealPlans }}>
      {children}
    </MealPlansContext.Provider>
  );
};
