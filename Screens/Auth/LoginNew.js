import { StyleSheet, Dimensions, ImageBackground, Text, View } from "react-native";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "../../assets/fonts/fonts";

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
    fontSize: 30,
    fontFamily: "Montserrat-Bold",
    lineHeight: 40,
    textAlign: "center",
    top: height * 0.45,
  },
  subwelcomeText: {
    top: height * 0.46,
    fontFamily: "Montserrat-Medium",
    fontSize: 17,
    textAlign: "center",
  },
});
