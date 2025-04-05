import { StyleSheet, Dimensions } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const{ height, width } = Dimensions.get("window");

const loginStyles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  loginContainer: {
    justifyContent: "center",
    width: wp(100),
    paddingHorizontal: hp(2),
    marginVertical: hp(12),

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
    height: hp(6),
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
    height: hp(6),
    fontSize: 16,
    paddingLeft: height * 0.02,
    paddingRight: height * 0.08,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
  },
  emojiContainer: {
    position: "absolute",
    right: hp(2),
    top: hp(2),
    
  },
  eyeIcon: {
    width: wp(6.5),
    height: hp(2),
    tintColor: "#1E1E1E",
  },
  continueContainer: {
    backgroundColor: "#111B56D4",
    borderRadius: 50,
    height: hp(6),
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(45),
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

module.exports = { loginStyles };