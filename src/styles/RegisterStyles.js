import { StyleSheet, Dimensions } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const{ height, width } = Dimensions.get("window");

const registerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  createText: {
    fontFamily: "Montserrat-Bold",
    fontSize: hp(4),
  },
  signUpContainer: {
    width: wp(100),
    marginVertical: hp(9), 
    justifyContent: "center",
    
  },
  labelContainer: {
    paddingHorizontal: hp(2),
  },
  signUpText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
  },
  errorSnackbar: {
    backgroundColor: "#FF3B30",
    marginHorizontal: hp(2),
    padding: hp(2),
    borderRadius: 6,
    marginBottom: 15,
  },
  errorSnackbarText: {
    color: "#FFF",
    fontFamily: "Montserrat-Medium",
    fontSize: hp(1.7),
    textAlign: "center",
  },
  inputContainer: {
    gap: hp(2),
    width: wp(100),
    paddingHorizontal: hp(2),
    marginTop: hp(2),
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  firstNameInput: {
    height: hp(6),
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    fontSize: hp(1.8),
    paddingLeft: hp(1.5),

  },
  lastNameInput: {
    height: hp(6),
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    fontSize: hp(1.8),
    paddingLeft: hp(1.5),
  },
  emailInput: {
    height: hp(6),
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    fontSize: hp(1.8),
    paddingLeft: hp(1.5),
  },
  passwordContainer: {
    width: wp(100),
    paddingHorizontal: hp(2),
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: hp(2),
  },
  passwordInput: {
    height: hp(6),
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    fontSize: hp(1.8),
    paddingLeft: hp(1.5),

  },
  confirmPasswordInput: {
    height: hp(6),
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    fontSize: hp(1.8),
    paddingLeft: hp(1.5),
  },
  inputError: {
    borderColor: "red",
  },
  inputValid: {
    borderColor: "green",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginHorizontal: hp(2),
    marginVertical: hp(1),
    fontFamily: "Montserrat-Medium",
  },
  requirementsContainer: {
    backgroundColor: "#E6E6F8",
    borderRadius: 8,
    padding: hp(2),
    marginHorizontal: hp(2),
    marginVertical: hp(2),
  },
  requirementsText: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#333",
    marginBottom: 5,
  },
  requirementItem: {
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
    color: "#333",
    marginLeft: 10,
    marginTop: 2,
  },
  emojiContainer: {
    position: "absolute",
    right: hp(4),
  },
  eyeIcon: {
    width: wp(6.5),
    height: hp(2),
    tintColor: "#1E1E1E",
  },
  locationContainer: {
    gap: hp(1),
    width: wp(90),
    paddingHorizontal: hp(0),
    paddingVertical: hp(2)  ,
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: hp(1.5),
    fontFamily: "Montserrat-Bold",
  },
  pickerContainer: {
    width: wp(90),
    height: hp(6),
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    
  },
  picker: {
    borderColor: "#000",
    borderWidth: 1,
    fontSize: hp(1.8),
    color: "zyyyyyy",

  },
  conditionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: hp(2),
    
  },
  checkbox: {
    width: wp(5),
    borderRadius: 2,
    height: hp(2.5),
    borderWidth: 2,
    borderColor: "#111B56D4",
    justifyContent: "center",
    alignItems: "center",
 
  },
  checked: {
    backgroundColor: "#111B56D4",
  },
  checkmark: {
    color: "white",
    fontSize: hp(1.5),
    textAlign: "center",
  },
  text: {
    fontSize: hp(1.5),
    color: "#000",
    fontFamily: "Montserrat-Regular",
    paddingHorizontal: hp(2),
  },
  continueContainer: {
    backgroundColor: "#111B56D4",
    borderRadius: 50,
    height: hp(6),
    width: wp(90),
    alignSelf: "center",  
    justifyContent  : "center",
    marginVertical: hp(2),

  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  accountText: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  textLogin: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "#111B56",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(2),
  },
  
  line: {
    flex: 1, 
    height: 1,
    backgroundColor: "#000",
    marginHorizontal: hp(1.5), 
  },
  
  orText: {
    fontSize: hp(1.8),
    fontFamily: "Montserrat-Bold",
  },
  
  socialLoginContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  facebookLogo: {
    width: width * 0.1,
    height: height * 0.05,
  },
  facebookContainer: {
    marginRight: height * 0.02,
  },
  googleLogo: {
    width: width * 0.1,
    height: height * 0.05,
  },
  successModalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  successModal: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: height * 0.03,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: width * 0.8,
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: height * 0.015,
  },
  successTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    color: "#222",
    marginBottom: height * 0.01,
  },
  successMessage: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    textAlign: "center",
    color: "#444",
  },
  closeContainer: {
    marginTop: height * 0.02,
    backgroundColor: "#FF3B30",
    width: height * 0.12,
    height: height * 0.04,
    borderRadius: 10,
    justifyContent: "center",
  },
  closeText: {
    color: "#FFF",
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },

});

module.exports = { registerStyles };