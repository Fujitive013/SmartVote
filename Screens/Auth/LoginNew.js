import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler
} from "react-native";
import React, { useState, useEffect } from "react";
import { useCustomFonts } from "../../assets/fonts/fonts";
import * as SplashScreen from "expo-splash-screen";
import { Entypo } from "@expo/vector-icons"; // Import icon from Expo
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

SplashScreen.preventAutoHideAsync();

const LoginNew = () => {
  const fontsLoaded = useCustomFonts();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const createAccountPress = () => {
    navigation.navigate("SignUpNew")
  }

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
        <TouchableOpacity style={styles.continueContainer}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.accountContainer}>
          <Text style={styles.dontText}>Don't have an account? </Text>
          <TouchableOpacity onPress={createAccountPress}>
            <Text style={styles.createText}>Create now.</Text>
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
    alignItems: "center",
  },
  loginContainer: {
    top: height * 0.1,
    justifyContent: "center",
    width: height * 0.45,
  },
  loginText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 36,
  },
  subLoginText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    marginBottom: height * 0.05,
  },
  emailInput: {
    height: height * 0.07,
    fontSize: 16,
    paddingLeft: height * 0.02,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: height * 0.02,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
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
  continueContainer: {
    backgroundColor: "#111B56D4",
    borderRadius: 20,
    height: height * 0.07,
    justifyContent: "center",
    top: height * 0.03,
    marginBottom: height * 0.05,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
  forgotContainer: {
    width: height * 0.25,
    alignSelf: "center",
  },
  forgotText: {
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },
  accountContainer: {
    flexDirection: "row",
    top: height * 0.3,
    justifyContent: "center",
  },
  dontText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
  },
  createText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
    color: "#111B56",
  },
});
