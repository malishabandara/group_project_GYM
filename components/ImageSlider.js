import React from "react";
import { View, Text } from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { sliderImages } from "../constants";

function ImageSlider() {
  return (
    <Carousel
      data={sliderImages}
      loop={true}
      autoplay={true}
      renderItem={ItemCard}
      hasParallaxImages={true}
      sliderWidth={450}
      firstItem={1}
      autoplayInterval={4000}
      itemWidth={280}
      slideStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}

const ItemCard = ({ item, index }, parallaxProps) => {
  return (
    <View
      style={{
        width: "100%",
        height: 200,
      }}
    >
      <ParallaxImage
        source={item}
        containerStyle={{ borderRadius: 30, flex: 1 }}
        style={{ resizeMode: "contain" }}
        parallaxFactor={1}
        {...parallaxProps}
      />
    </View>
  );
};

export default ImageSlider;
