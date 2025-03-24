import React, { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCustomFonts } from "../../../assets/fonts/fonts";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/WelcomeScreenStyles";
import WelcomeButtons from "../../components/WelcomeButton";

const { height } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

const WelcomeScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();

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
      source={require("../../../assets/images/backgroundLogin.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View>
        <Text style={styles.welcomeText}>Welcome to E-boto</Text>
        <Text style={styles.subwelcomeText}>Where voting is made effortless.</Text>
        <WelcomeButtons navigation={navigation} />
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;