import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { useCustomFonts } from "../../../assets/fonts/fonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { onBoardingStyles as styles } from "../../styles/OnBoardingStyles";

SplashScreen.preventAutoHideAsync();

const OnBoarding = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();

  const votePress = () => {
    navigation.navigate('WelcomeScreen')
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
      <ImageBackground
        source={require("../../../assets/images/background.png")}
        resizeMode="cover"
        blurRadius={10}
        style={styles.image}
      >
        <View style={styles.opacityBackground} />
        <Text style={styles.titleText}>E-boto</Text>
        <Text style={styles.subTitleText}>Voting made effortless</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={votePress}>
            <Text style={styles.buttonText}>Vote Now!</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default OnBoarding;