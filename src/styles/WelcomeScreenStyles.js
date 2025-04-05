import { StyleSheet, Dimensions } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const{ height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: hp(48),
    flex: 1,
    gap: 2,
  },
  welcomeText: {
    fontSize: hp(3.5),
    fontFamily: "Montserrat-Bold",
    lineHeight: 40,
    textAlign: "center",
  },
  subwelcomeText: {
    fontFamily: "Montserrat-Medium",
    fontSize: hp(2),
    textAlign: "center",
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: hp(7),
    gap: hp(2), 

  },
  createAccountButton: {
    backgroundColor: "#111B56D4",
    width: wp(90),
    height: hp(7),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  accountText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: hp(2),
  },
  loginButton: {
    backgroundColor: "#F5F5F5",
    width: wp(90),
    height: hp(7),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  loginText: {
    color: "#111B56",
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: hp(2), 
  }
});

module.exports = { styles };