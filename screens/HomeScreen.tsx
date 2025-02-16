import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const fullText = "Hello, I'm Bunny! 🐰 What are we learning today?";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]); 
        setIndex(index + 1);
      }, 70); 

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Code and Pet</Text>
        <Text style={styles.subtitle}>🐶 Learn coding by playing with your virtual pet! 🐶</Text>
      </View>

      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>{displayedText}</Text>
      </View>

      <LottieView
        source={require("../assets/lottie/bunny.json")}
        autoPlay
        loop
        style={styles.bunnyAnimation}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Game")}>
        <Text style={styles.buttonText}>Commands</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Loops</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sequences</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEBEE", 
  },
  title: {
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowColor: "#FF4081", 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3, 
  },
  subtitle: {
    fontSize: 14,
    padding: 10,
    fontWeight: "bold",
    color: "#FF4081",
    textAlign: "center",
    marginBottom: 20,
  },
  speechBubble: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FF4081",
    width: "80%",
    minHeight: 60, 
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  speechText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
  },
  bunnyAnimation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF4081",
    padding: 15,
    borderRadius: 15,
    width: "60%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
