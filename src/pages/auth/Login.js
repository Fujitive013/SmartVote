import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useCustomFonts } from "../../../assets/fonts/fonts";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
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
  const [errorMessage, setErrorMessage] = useState("");

  // Prevent hardware back button navigation
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true; // Prevents default back navigation
      }
    );

    // Cleanup back handler on unmount
    return () => backHandler.remove();
  }, []);

  const validateInputs = () => {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return false;
    }

    setErrorMessage(""); // Clear previous errors
    return true;
  };

  const handleLogin = async () => {
    // Validate inputs before proceeding
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await login(email, password);

      console.log("Login response:", response);

      if (response?.message === "Login successful") {
        const token = response.token?.replace("Bearer ", "").trim();
        await storeUserData(response.user, token);
        navigation.navigate("Dashboard Screen");
      } else {
        const message = response?.error || "Invalid credentials.";
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      const message =
        error.response?.data?.error || "Invalid email or password.";
      setErrorMessage(message);

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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
        {errorMessage ? (
          <View style={{ alignSelf: "center", top: 5 }}>
            <Text style={{ color: "red", top: 5 }}>{errorMessage}</Text>
          </View>
        ) : null}
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
