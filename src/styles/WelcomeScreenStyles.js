import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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

module.exports = { styles };