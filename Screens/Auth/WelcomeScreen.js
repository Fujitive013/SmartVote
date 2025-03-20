import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "../../assets/fonts/fonts";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

SplashScreen.preventAutoHideAsync();

const LoginNew = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();

  const onSignUp = () => {
    navigation.navigate("SignUpNew")
  }

  const onLogin = () => {
    navigation.navigate("LoginNew")
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
    <ImageBackground
      source={require("../../assets/images/backgroundLogin.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View>
        <Text style={styles.welcomeText}>Welcome to E-boto</Text>
        <Text style={styles.subwelcomeText}>
          Where voting is made effortless.
        </Text>
        <TouchableOpacity style={styles.createAccountButton} onPress={onSignUp}>
          <Text style={styles.accountText}>Create an account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: "Montserrat-Bold",
    lineHeight: 40,
    textAlign: "center",
    top: height * 0.45,
  },
  subwelcomeText: {
    top: height * 0.45,
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    textAlign: "center",
  },
  createAccountButton: {
    backgroundColor: "#111B56D4",
    width: width * 0.9,
    alignSelf: "center",
    top: height * 0.65,
    height: height * 0.07,
    borderRadius: 20,
    justifyContent: "center",
  },
  accountText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: "#F5F5F5",
    width: width * 0.9,
    alignSelf: "center",
    top: height * 0.67,
    height: height * 0.07,
    borderRadius: 20,
    justifyContent: "center",
    elevation: 5,
  },
  loginText: {
    color: "#111B56",
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
  },
});
