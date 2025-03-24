import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useCustomFonts } from "../../../assets/fonts/fonts";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../../config/ApiConfig";
import { storeUserData } from "../../utils/Storage";
import { loginStyles as styles } from "../../styles/LoginStyles";
import { login } from "../../services/auth";

SplashScreen.preventAutoHideAsync();

const LoginNew = () => {
  const fontsLoaded = useCustomFonts();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await login(email, password);

      console.log("Login response:", response);

      if (response?.message === "Login successful") {
        const token = response.token.replace("Bearer ", "");
        await storeUserData(response.user, token);

        Alert.alert("Success", "Login successful!");
        navigation.navigate("Dashboard Screen");
      } else {
        Alert.alert(
          "Login failed",
          response?.error || "Invalid credentials."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Login failed",
        error.response?.error || "An unexpected error occurred."
      );
    }
  };

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Log in</Text>
        <Text style={styles.subLoginText}>
          Access your account to cast your vote, and be part of a secure and
          transparent voting process.
        </Text>
        <TextInput
          placeholder="Email*"
          value={email}
          onChangeText={setEmail}
          style={styles.emailInput}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password*"
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.emojiContainer}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Image
              source={
                passwordVisible
                  ? require("../../../assets/images/eye-close.png")
                  : require("../../../assets/images/eye-open.png")
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.continueContainer}
          onPress={handleLogin}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.accountContainer}>
          <Text style={styles.dontText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpNew")}>
            <Text style={styles.createText}>Create now.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginNew;
