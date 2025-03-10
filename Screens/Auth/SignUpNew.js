import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useCustomFonts } from "../../assets/fonts/fonts";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

SplashScreen.preventAutoHideAsync();

const SignUpNew = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const fontsLoaded = useCustomFonts();

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
      <View style={styles.signUpContainer}>
        <Text style={styles.createText}>Create an account</Text>
        <Text style={styles.signUpText}>
          Sign up to make your voice count! Create your account to securely cast
          your vote.
        </Text>
        <TextInput placeholder="First Name*" style={styles.firstNameInput} />
        <TextInput placeholder="Last Name*" style={styles.lastNameInput} />
        <TextInput placeholder="Email*" style={styles.emailInput} />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password*"
            style={styles.passwordInput}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.emojiContainer}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Image
              source={
                passwordVisible
                  ? require("../../assets/images/eye-close.png") // Eye open
                  : require("../../assets/images/eye-open.png") // Eye closed
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: height * 0.02 }} />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password*"
            style={styles.confirmPasswordInput}
            secureTextEntry={!confirmPasswordVisible}
          />
          <TouchableOpacity
            style={styles.emojiContainer}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Image
              source={
                confirmPasswordVisible
                  ? require("../../assets/images/eye-close.png") // Eye open
                  : require("../../assets/images/eye-open.png") // Eye closed
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

SplashScreen.preventAutoHideAsync();

export default SignUpNew;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    alignItems: "center",
  },
  createText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 32,
  },
  signUpContainer: {
    width: height * 0.45,
    top: height * 0.1,
    justifyContent: "center",
    width: height * 0.45,
  },
  signUpText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    marginBottom: height * 0.04,
  },
  firstNameInput: {
    borderRadius: 10,
    height: height * 0.07,
    paddingLeft: height * 0.02,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: height * 0.02,
    fontSize: 16,
  },
  lastNameInput: {
    borderRadius: 10,
    height: height * 0.07,
    paddingLeft: height * 0.02,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: height * 0.02,
    fontSize: 16,
  },
  emailInput: {
    borderRadius: 10,
    height: height * 0.07,
    paddingLeft: height * 0.02,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: height * 0.02,
    fontSize: 16,
  },
  passwordInput: {
    height: height * 0.07,
    fontSize: 16,
    paddingLeft: height * 0.02,
    paddingRight: height * 0.08,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
  },
  confirmPasswordInput: {
    height: height * 0.07,
    fontSize: 16,
    paddingLeft: height * 0.02,
    paddingRight: height * 0.08,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
  },
  emojiContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  eyeIcon: {
    width: 30,
    height: 20,
    tintColor: "#1E1E1E",
  },
});
