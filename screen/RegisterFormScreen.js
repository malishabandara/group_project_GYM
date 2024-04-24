import React, { useState, useEffect } from "react";
// import Checkbox from "expo-checkbox";
import CheckBox from "expo-checkbox";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  AntDesign,
  Ionicons,
  Entypo,
} from "react-native-vector-icons";
import COLOR from "../config/color";
import AppTextInput from "../component/AppTextInput";
import AppButton from "../component/AppButton";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "axios";

function RegisterFormScreen() {
  const [isSelected, setIsSelected] = useState(false);
  const [isInformed, setIsinformed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (isSubmit) authenticate();
  }, [isSubmit]);

  const authenticate = async () => {
    axios
      .post(
        "http://192.168.182.209/GymApp/signUp.php",
        JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
      )
      .then((response) => {
        console.log(response.data);
        setIsSubmit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validation = () => {
    let errors = {};
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!firstName) errors.firstName = "First Name is required!";

    if (!lastName) errors.lastName = "Last Name is required!";

    if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!password) {
      errors.password = "Password is required!";
    } else if (password.length < 4) {
      errors.password = "password must be more than 4 characters!";
    } else if (password.length > 10) {
      errors.password = "password can not exceed more than 10 characters!";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validation()) {
      console.log("Submitted ", firstName, lastName, email, password);
      setIsSubmit(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setErrors({});
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <AntDesign
            name="leftcircle"
            size={28}
            color={COLOR.primary}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Sign Up</Text>
      </View>

      <View style={styles.textInputContainer}>
        <AppTextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(firstName) => setFirstName(firstName)}
        />
        {errors.firstName ? (
          <Text style={{ color: COLOR.primary }}>{errors.firstName}</Text>
        ) : null}

        <AppTextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(lastName) => setLastName(lastName)}
        />
        {errors.lastName ? (
          <Text style={{ color: COLOR.primary }}>{errors.lastName}</Text>
        ) : null}

        <AppTextInput
          placeholder="Email Address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        {errors.email ? (
          <Text style={{ color: COLOR.primary }}>{errors.email}</Text>
        ) : null}

        <AppTextInput
          placeholder="Password"
          value={password}
          isPasswordShown={true}
          icon={true}
          //value="password"
          onChangeText={(password) => setPassword(password)}
        />
        {errors.password ? (
          <Text style={{ color: COLOR.primary }}>{errors.password}</Text>
        ) : null}

        <AppTextInput
          placeholder="Confirm Password"
          icon={true}
          secureTextEntry={isPasswordShown}
        />
      </View>

      <View style={styles.checkBoxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setIsSelected}
          style={styles.checkbox}
        />
        <Text style={styles.checkText}>I agree to</Text>
        <TouchableOpacity>
          <Text style={styles.links}>Terms & Condition</Text>
        </TouchableOpacity>
        <Text style={styles.checkText}>and</Text>
      </View>
      <TouchableOpacity style={styles.linkP}>
        <Text style={styles.links}>Privacy Policy</Text>
      </TouchableOpacity>

      <View style={styles.checkBoxContainer}>
        <CheckBox
          value={isInformed}
          onValueChange={setIsinformed}
          style={styles.checkbox}
        />
        <Text style={styles.checkText}>Keep me informed</Text>
      </View>

      <View style={styles.btnContainer}>
        <AppButton
          title="Sign Up"
          textColor="black"
          //onPress={() => navigation.navigate("OtpScreen")}
          onPress={() => handleSubmit(true)}
        />
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.text1}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.text2}>Log Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    //position: "relative",
    flex: 1,
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.black,
    width: "100%",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    width: "100%",
    height: 50,
  },
  icon: {
    marginLeft: 20,
    fontWeight: "900",
  },
  header: {
    marginHorizontal: 25,
    fontSize: 23,
    fontWeight: "700",
    color: COLOR.primary,
  },
  textInputContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  checkBoxContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
  },
  checkText: {
    paddingHorizontal: 5,
    fontSize: 18,
    fontWeight: "600",
    color: COLOR.text,
  },
  checkbox: {
    alignSelf: "center",
    borderColor: COLOR.primary,
    borderRadius: 15,
  },
  links: {
    fontSize: 18,
    color: COLOR.primary,
    textDecorationLine: "underline",
  },
  linkP: {
    left: -87,
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 25,
  },
  footerContainer: {
    flexDirection: "row",
  },
  text1: {
    fontSize: 18,
    fontWeight: "600",
    color: COLOR.text,
  },
  text2: {
    fontSize: 18,
    fontWeight: "600",
    color: COLOR.primary,
  },
});
export default RegisterFormScreen;
