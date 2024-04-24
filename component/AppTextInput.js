import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  AntDesign,
  Ionicons,
  Entypo,
} from "react-native-vector-icons";
import COLOR from "../config/color";

function AppTextInput({ icon = "false", ...otherProps }) {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [values, setValue] = useState("");

  return (
    <View style={styles.textInputContainer}>
      {icon == true ? (
        <>
          <TextInput
            style={styles.textInput}
            {...otherProps}
            //placeholder={placeholder}
            secureTextEntry={isPasswordShown}
            // value={value}
            //onChangeText={(values) => setValue(values)}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)}
          >
            {isPasswordShown == true ? (
              <Ionicons name="eye-off" size={22} color={COLOR.middle} />
            ) : (
              <Ionicons name="eye" size={22} color={COLOR.middle} />
            )}
          </TouchableOpacity>
        </>
      ) : (
        <TextInput
          style={styles.textInput}
          {...otherProps}
          // placeholder={placeholder}
          // value={value}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: COLOR.white,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    marginVertical: 0,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: COLOR.primary,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    fontSize: 19,
    color: COLOR.black,
    marginHorizontal: 5,
    width: "90%",
    //fontFamily: "Poppins",
  },
  icon: {
    fontSize: 20,
    fontWeight: "900",
    color: COLOR.black,
    marginRight: 10,
  },
});
export default AppTextInput;
