import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { bodyParts } from "../constants/index";
import COLOR from "../config/color";
import { useNavigation } from "@react-navigation/native";

function BodyParts() {
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "700",
          marginHorizontal: 20,
          marginBottom: 20,
        }}
      >
        Exersices
      </Text>

      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        renderItem={({ item, index }) => (
          <BodyPartCard index={index} item={item} />
        )}
      />
    </View>
  );
}

const BodyPartCard = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={{
          width: 150,
          height: 150,
          flex: 1,
          marginBottom: 15,
          borderRadius: 35,
          opacity: 0.7,
          shadowColor: COLOR.white,
          shadowOffset: { width: 50, height: 10 },
          shadowOpacity: 90,
          shadowRadius: 35,
          elevation: 15,
        }}
        onPress={() => navigation.navigate("Exercise")}
      >
        <Image
          source={item.image}
          resizeMode="cover"
          style={{
            width: 150,
            height: 150,
            borderRadius: 35,
            position: "absolute",
          }}
        />

        <Text
          style={{
            fontSize: 16,
            color: COLOR.text,
            fontWeight: "700",
            textAlign: "center",
            flex: 1,
            alignItems: "center",
          }}
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default BodyParts;
