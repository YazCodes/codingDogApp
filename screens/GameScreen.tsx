import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from "react-native";
import LottieView from "lottie-react-native";
import Pet from "../components/Pets";

const translations = {
  "Enter a command:": "コマンドを入力してください:",
  "Run Code": "コードを実行",
  "rest();": "休む (やすむ);",
  "eat();": "食べる (たべる);",
  "sleep();": "寝る (ねる);",
  "walk();": "歩く (あるく);",
  "play();": "遊ぶ (あそぶ);",
};

const GameScreen: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [codeInput, setCodeInput] = useState("");
  const [action, setAction] = useState<"resting" | "eating" | "sleeping" | "walking" | "playing">("resting");
  const [hoveredText, setHoveredText] = useState<string | null>(null);

  const runCode = () => {
    const command = codeInput.trim().toLowerCase();
    switch (command) {
      case "eat();":
        setAction("eating");
        break;
      case "sleep();":
        setAction("sleeping");
        break;
      case "walk();":
        setAction("walking");
        break;
      case "play();":
        setAction("playing");
        break;
      case "rest();":
        setAction("resting");
        break;
      default:
        setAction("resting");
    }
  };

  return (
    <View style={styles.container}>
      {showIntro ? (
        <View style={styles.introContainer}>

            <Text style={styles.instructionsTitle}>
                Commands
            </Text>
    
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              Let's learn about commands!
            </Text>
          </View>

            <LottieView 
            source={require("../assets/lottie/bunny.json")}
            style={styles.bunnyAnimation}
          />

          <View style={styles.learningSection}>
            <Text style={styles.infoText}>
              🧩 What You'll Learn: {"\n\n"}
              ✅ Commands are instructions telling a computer (or your pet) what to do 🐶 {"\n\n"}
              ✅ Commands are essential in programming! Build problem-solving and logical thinking skills 🧠 {"\n\n"}
              ✅ You'll learn to write and execute commands 🚀  {"\n\n"}
                rest(); → Doggie takes a break.{"\n"}
                eat(); →  Doggie eats food.{"\n"}
                walk(); → Doggie moves forward.{"\n"}
                play(); → Doggie plays.{"\n\n"}
                Each command performs one specific action, just like in real programming!
            </Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={() => setShowIntro(false)}>
            <Text style={styles.startButtonText}>Let's Start!</Text>
          </TouchableOpacity>
        </View>
      ) : (
   
        <View style={styles.gameContainer}>
          <View style={styles.sidebar}>
            <Text style={styles.sidebarTitle}>Commands</Text>
            {Object.keys(translations)
              .filter((cmd) => cmd.endsWith("();"))
              .map((cmd) => (
                <TouchableOpacity
                  key={cmd}
                  onLongPress={() => setHoveredText(translations[cmd as keyof typeof translations])}
                  onPressOut={() => setHoveredText(null)}
                  style={styles.commandButton}
                >
                  <Text style={styles.commandText}>{cmd}</Text>
                </TouchableOpacity>
              ))}
          </View>

          <View style={styles.mainContent}>
            <Text style={styles.instructions}>Enter a command:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type code here..."
              value={codeInput}
              onChangeText={setCodeInput}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.runButton} onPress={runCode}>
              <Text style={styles.runButtonText}>Run Code</Text>
            </TouchableOpacity>

            <Pet action={action} />

            <TouchableOpacity style={styles.backButton} onPress={() => setShowIntro(true)}>
              <Text style={styles.backButtonText}>Back to Instructions</Text>
            </TouchableOpacity>

            <Modal visible={hoveredText !== null} transparent animationType="fade">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.translationText}>{hoveredText}</Text>
                  <Button title="Close" onPress={() => setHoveredText(null)} />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FCE4EC" },
  
    introContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },

    instructionsTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },
  
    speechBubble: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 20,
      borderWidth: 3,
      borderColor: "#FF4081",
      width: "85%",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      marginBottom: 15,
    },
    
    speechText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#444",
      textAlign: "left",
    },
  
    learningSection: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 15,
      width: "90%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      marginBottom: 20,
    },
  
    infoText: {
      fontSize: 12,
      textAlign: "center",
      color: "#444",
      fontWeight: "600",
    },
  
    startButton: {
      backgroundColor: "#FF4081",
      padding: 15,
      borderRadius: 25,
      width: 200,
      alignItems: "center",
      marginTop: 20,
    },
  
    startButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
  
    sidebar: {
      width: "35%",
      backgroundColor: "#FF80AB",
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  
    sidebarTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
      marginBottom: 10,
    },
  
    commandButton: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      width: "80%",
      alignItems: "center",
    },
  
    commandText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#FF4081",
    },
  
    gameContainer: {
      flexDirection: "row",
      flex: 1,
    },
  
    mainContent: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
  
    instructions: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: "bold",
    },
  
    input: {
      width: "80%",
      height: 50,
      borderColor: "#FF4081",
      borderWidth: 2,
      borderRadius: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      fontSize: 18,
      backgroundColor: "white",
    },
  
    runButton: {
      backgroundColor: "#FF4081",
      padding: 10,
      borderRadius: 10,
      width: "60%",
      alignItems: "center",
      marginBottom: 20,
    },
  
    runButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
  
    backButton: {
      backgroundColor: "#757575",
      padding: 10,
      borderRadius: 10,
      width: "60%",
      alignItems: "center",
      marginTop: 20,
    },
  
    backButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  
    modalContent: {
      width: "80%",
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
    },
  
    translationText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#FF4081",
      marginBottom: 10,
    },

    bunnyAnimation: {
        width: 100,
        height: 100,
        marginBottom: 10, 
        alignSelf: "center", 
      },
      
  });
  

export default GameScreen;
