import React, { useState } from "react";
import { View, Button, StyleSheet, Text, TextInput } from "react-native";
import Pet from "../components/Pets";

const GameScreen: React.FC = () => {
    const [codeInput, setCodeInput] = useState("");
    const [action, setAction] = useState<"idle" | "eating" | "sleeping" | "walking">("idle");
  
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
        default:
          setAction("idle");
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Enter a command: eat(); sleep(); walk();</Text>
        <TextInput
          style={styles.input}
          placeholder="Type code here..."
          value={codeInput}
          onChangeText={setCodeInput}
          autoCapitalize="none"
        />
        <Button title="Run Code" onPress={runCode} />
        <Pet action={action} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    instructions: { fontSize: 16, marginBottom: 10 },
    input: {
      width: "80%",
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
    },
  });
  
  export default GameScreen;