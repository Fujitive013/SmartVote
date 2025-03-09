import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useCustomFonts } from "../../assets/fonts/fonts";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

SplashScreen.preventAutoHideAsync();

const LoginNew = () => {
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
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Log In</Text>
        <Text style={styles.subLoginText}>
          Access your account to cast your vote, and be part of a secure and
          transparent voting process.
        </Text>
        <TextInput placeholder="Email*" style={styles.emailInput} />
        <TextInput placeholder="Password*" style={styles.passwordInput} />
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.continueButton}>
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginNew;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  loginContainer: {
    top: height * 0.15,
    marginLeft: height * 0.02,
  },
  loginText: {
    fontSize: 32,
    fontFamily: "Montserrat-Bold",
  },
  subLoginText: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginBottom: height * 0.05,
  },
  emailInput: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    height: height * 0.06,
    width: height * 0.46,
    paddingLeft: height * 0.02,
    marginBottom: height * 0.02,
  },
  passwordInput: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    height: height * 0.06,
    width: height * 0.46,
    paddingLeft: height * 0.02,
  },
  containerButton: {

  },
  continueButton: {

  }
});
