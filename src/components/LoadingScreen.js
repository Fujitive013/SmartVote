import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { loadingStyles } from "../styles/loadingStyles";

const LoadingScreen = ({ message = "Please wait..." }) => {
  return (
    <View style={loadingStyles.container}>
      <ActivityIndicator size="large" color="#111B56" />
      <Text style={loadingStyles.loadingText}>{message}</Text>
    </View>
  );
};

export default LoadingScreen;