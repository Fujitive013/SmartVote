import React, { useEffect, useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const ErrorSnackbar = ({ message, visible, onDismiss }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(onDismiss);
      }, 3000);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.snackbar, { opacity: fadeAnim }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "bold" 
  },
});

export default ErrorSnackbar;
