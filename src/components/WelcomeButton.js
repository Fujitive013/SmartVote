import React from "react";
import { TouchableOpacity, Text, View, Dimensions } from "react-native";
import { styles } from "../styles/WelcomeScreenStyles"; // Import styles

const { height } = Dimensions.get("window");

const WelcomeButtons = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate("SignUpNew")}>
        <Text style={styles.accountText}>Create an account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("LoginNew")}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeButtons;