import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { useCustomFonts } from "../../../assets/fonts/fonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window"); // Get screen dimensions

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  opacityBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(245, 245, 245, 0.4)",
  },
  titleText: {
    color: "#111B56",
    fontSize: 60,
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    marginTop: height * 0.08,
  },
  subTitleText: {
    color: "#111B56",
    bottom: height * 0.020,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
  },
  buttonContainer:{
    backgroundColor: '#111B56D4',
    padding: height * 0.015,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    top: height * 0.6,
  },
  buttonText:{
    color: '#FFF',
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    textAlign: 'center'
  },
  image: {
    flex: 1
  },
});
