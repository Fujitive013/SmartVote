import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const onBoardingStyles = StyleSheet.create({
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
  