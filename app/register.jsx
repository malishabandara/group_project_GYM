import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, router } from "expo-router";

import COLOR from "../constants/Color";
import FormField from "@/components/FormField";
import SubmitButton from "../components/SubmitButton";
import AppFormField from "@/components/AppFormField";

import { createUser } from "@/lib/appwrite";

//Validate function using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(4).max(10).label("Password"),
  confirmPassword: Yup.string().required("Confirm Your Password"),
});

const register = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [isInformed, setIsinformed] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(true);

  const navigation = useNavigation();

  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      ToastAndroid.show("Please fill the all fields ", ToastAndroid.SHORT);
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(
        form.email,
        form.password,
        form.firstName,
        form.lastName
      );

      console.log("Succefully Sign Up!!!");
      //router.replace("/successScreen");
      //navigation.navigate("successScreen");
      <Link href={"./successScreen"}></Link>;
    } catch (error) {
      //Alert.alert("Error ", error.message);
      ToastAndroid.show(`${error.message}`, ToastAndroid.LONG);
    } finally {
      setIsSubmitting(false);
    }
    //createUser();
  };

  return (
    <SafeAreaView className="flex-1 flex-col items-center w-full bg-black">
      <StatusBar backgroundColor={COLOR.black} barStyle={"dark-content"} />
      <ScrollView>
        <View className="flex flex-row mt-3 items-center justify-between p-3 w-full h-50">
          <TouchableOpacity onPress={() => navigation.navigate("index")}>
            <AntDesign
              name="leftcircle"
              size={28}
              color={COLOR.primary}
              className="ml-2 font-bold"
            />
          </TouchableOpacity>
          <Text className="mx-5 text-2xl text-primary font-text">Sign Up</Text>
        </View>

        <Formik
          resetForm
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
        >
          {() => (
            <>
              <View className="mt-5 w-full px-3">
                <AppFormField
                  title="First Name"
                  placeholder="First Name"
                  value={form.firstName}
                  handleChangeText={(e) => setform({ ...form, firstName: e })}
                />
                <AppFormField
                  title="Last Name"
                  placeholder="Last Name"
                  value={form.lastName}
                  handleChangeText={(e) => setform({ ...form, lastName: e })}
                />
                <AppFormField
                  title="Email"
                  placeholder="Email Address"
                  value={form.email}
                  handleChangeText={(e) => setform({ ...form, email: e })}
                  keyboardType="email-address"
                />

                <AppFormField
                  title="Password"
                  placeholder="Password"
                  value={form.password}
                  handleChangeText={(e) => setform({ ...form, password: e })}
                />
              </View>

              <View className="w-full px-3 my-6 ">
                <SubmitButton
                  title="Sign Up"
                  textColor="black"
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                />
              </View>

              <View className="flex flex-row text-center justify-center my-1">
                <Text className="text-1xl font-text text-text">
                  Already have an Account?{" "}
                </Text>
                <TouchableOpacity
                  //onPress={() => navigation.navigate("LoginScreen")}
                  onPress={() => navigation.navigate("login")}
                >
                  <Text className="text-1xl text-primary font-title1">
                    Log Now
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default register;
