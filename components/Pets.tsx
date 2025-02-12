import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import eatingAnimation from "../assets/lottie/eatingDog.json";
import sleepingAnimation from "../assets/lottie/sleepingDog.json";
import walkingAnimation from "../assets/lottie/walkingDog.json";
import idleAnimation from "../assets/lottie/idleDog.json";

type PetProps = {
  action: "idle" | "eating" | "sleeping" | "walking";
};

const Pet: React.FC<PetProps> = ({ action }) => {
  const getAnimation = () => {
    switch (action) {
      case "eating":
        return eatingAnimation;
      case "sleeping":
        return sleepingAnimation;
      case "walking":
        return walkingAnimation;
      default:
        return idleAnimation;
    }
  };

  return (
    <View style={styles.container}>
      <LottieView source={getAnimation()} autoPlay loop style={styles.animation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default Pet;
