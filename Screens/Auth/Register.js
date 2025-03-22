import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useCustomFonts } from "../../assets/fonts/fonts";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const { width, height } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

const SignUpNew = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();

  // Form field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState("");
  const [barangays, setBarangays] = useState([]);
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [loading, setLoading] = useState(true);

  // Validation states
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  // Error message state
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  // API KEY
  const API_KEY = Constants.expoConfig?.extra?.API_KEY;

  useEffect(() => {
    fetch(`${API_KEY}/locations/fetchCities`)
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setLoading(false);
      });
  }, []);

  // When the city changes, update the barangay list
  const handleCityChange = (cityId) => {
    setSelectedCities(cityId);
    const city = cities.find((c) => c._id === cityId);
    setBarangays(city ? city.barangays : []);
    setSelectedBarangay("");
  };

  const loginPress = () => {
    navigation.navigate("LoginNew");
  };

  // Password validation function
  const validatePassword = (pass) => {
    let criteria = 0;

    // Check for minimum length
    if (pass.length >= 6) {
      // Check for uppercase
      if (/[A-Z]/.test(pass)) criteria++;
      // Check for special character
      if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) criteria++;
      // Check for number
      if (/[0-9]/.test(pass)) criteria++;

      return criteria >= 3;
    }
    return false;
  };

  // Check if passwords match and validate when either input changes
  useEffect(() => {
    if (password || confirmPassword) {
      setPasswordsMatch(password === confirmPassword);

      // Only validate password if there's a value
      if (password) {
        const isValid = validatePassword(password);
        setPasswordValid(isValid);

        // If password is valid, hide requirements
        // If not valid, show requirements
        setShowPasswordRequirements(!isValid);
      }
    }
  }, [password, confirmPassword]);

  // Handle continue button press
  const handleContinue = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !selectedCities ||
      !selectedBarangay
    ) {
      setErrorMessage("Please fill out all required fields");
      setShowError(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowError(true);
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Password does not meet requirements");
      setShowError(true);
      return;
    }

    if (!isChecked) {
      setErrorMessage("Please accept the terms and conditions");
      setShowError(true);
      return;
    }

    if (!selectedCities) {
      setErrorMessage("Please select a city");
      setShowError(true);
      return;
    }

    if (!selectedBarangay) {
      setErrorMessage("Please select a valid barangay");
      setShowError(true);
      return;
    }

    try {
      // Make API request to register the user
      const response = await axios.post(`${API_KEY}/auth/register`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        city_id: selectedCities, // Ensure you have this value
        baranggay_id: selectedBarangay, // Ensure you have this value
      });

      // Handle successful response
      if (response.status === 201) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigation.navigate("LoginNew");
        }, 3000);
      }
    } catch (error) {
      // Handle error response
      console.error("Error during signup:", error);
      Alert.alert("Error", "An error occurred while creating the account.");
    }
  };

  // Auto-hide error message after 3 seconds
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    // Only add this listener when success modal is showing
    if (showSuccessModal) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          // Return true to prevent default behavior (going back)
          return true;
        }
      );

      // Clean up the event listener
      return () => backHandler.remove();
    }
  }, [showSuccessModal]);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.signUpContainer}>
              <Text style={styles.createText}>Create an account</Text>
              <Text style={styles.signUpText}>
                Sign up to make your voice count! Create your account to
                securely cast your vote.
              </Text>

              {/* Error message snackbar */}
              {showError && (
                <View style={styles.errorSnackbar}>
                  <Text style={styles.errorSnackbarText}>{errorMessage}</Text>
                </View>
              )}

              {showSuccessModal && (
                <View style={styles.successModalOverlay}>
                  <View style={styles.successModal}>
                    <Image
                      source={require("../../assets/images/success.png")}
                      style={styles.successIcon}
                    />
                    <Text style={styles.successTitle}>SUCCESS</Text>
                    <Text style={styles.successMessage}>
                      You have successfully created an account.
                    </Text>
                    <TouchableOpacity
                      onPress={loginPress}
                      style={styles.closeContainer}
                    >
                      <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <TextInput
                placeholder="First Name*"
                style={styles.firstNameInput}
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                placeholder="Last Name*"
                style={styles.lastNameInput}
                value={lastName}
                onChangeText={setLastName}
              />
              <TextInput
                placeholder="Email*"
                style={styles.emailInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Password*"
                  style={[
                    styles.passwordInput,
                    !passwordValid && password.length > 0 && styles.inputError,
                  ]}
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setShowPasswordRequirements(true)}
                />
                <TouchableOpacity
                  style={styles.emojiContainer}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Image
                    source={
                      passwordVisible
                        ? require("../../assets/images/eye-close.png")
                        : require("../../assets/images/eye-open.png")
                    }
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>

              {showPasswordRequirements && (
                <View style={styles.requirementsContainer}>
                  <Text style={styles.requirementsText}>
                    A six character password is required with at least 3 of the
                    following:
                  </Text>
                  <Text style={styles.requirementItem}>
                    1 upper-case character
                  </Text>
                  <Text style={styles.requirementItem}>
                    1 special character (e.g !@#*_)
                  </Text>
                  <Text style={styles.requirementItem}>1 number</Text>
                </View>
              )}

              <View style={{ marginBottom: height * 0.02 }} />
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Confirm Password*"
                  style={[
                    styles.confirmPasswordInput,
                    !passwordsMatch &&
                      confirmPassword.length > 0 &&
                      styles.inputError,
                  ]}
                  secureTextEntry={!confirmPasswordVisible}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.emojiContainer}
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  <Image
                    source={
                      confirmPasswordVisible
                        ? require("../../assets/images/eye-close.png")
                        : require("../../assets/images/eye-open.png")
                    }
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>

              {!passwordsMatch && confirmPassword.length > 0 && (
                <Text style={styles.errorText}>Passwords do not match</Text>
              )}

              <Text style={styles.label}>Select City:</Text>
              {loading ? (
                <ActivityIndicator size="large" color="blue" />
              ) : (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedCities}
                    onValueChange={handleCityChange}
                    style={styles.picker}
                  >
                    <Picker.Item
                      label="Select a City"
                      value=""
                      color="#bebebe"
                    />
                    {cities.map((city) => (
                      <Picker.Item
                        key={city._id}
                        label={city.name}
                        value={city._id}
                      />
                    ))}
                  </Picker>
                </View>
              )}

              <Text style={styles.label}>Select Barangay:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedBarangay}
                  onValueChange={(itemValue) => setSelectedBarangay(itemValue)}
                  style={styles.picker}
                  enabled={barangays.length > 0} // Disable if no barangays
                >
                  <Picker.Item
                    label="Select a Barangay"
                    value=""
                    enabled={false}
                  />
                  {barangays.map((barangay) => (
                    <Picker.Item
                      key={barangay._id}
                      label={barangay.name}
                      value={barangay._id}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.conditionContainer}>
                <Pressable
                  style={[styles.checkbox, isChecked && styles.checked]}
                  onPress={() => setIsChecked(!isChecked)}
                >
                  {isChecked && <Text style={styles.checkmark}>✓</Text>}
                </Pressable>
                <Text style={styles.text}>
                  By continuing, you agree to the terms & conditions and
                  acknowledge the privacy policy.
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.continueContainer}
                  onPress={handleContinue}
                >
                  <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.loginContainer}>
                <Text style={styles.accountText}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={loginPress}>
                  <Text style={styles.textLogin}>Log in</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.line} />
              </View>
              <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.facebookContainer}>
                  <Image
                    source={require("../../assets/images/facebook.png")}
                    style={styles.facebookLogo}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={styles.googleLogo}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUpNew;

const styles = StyleSheet.create({
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
    fontSize: 32,
  },
  signUpContainer: {
    width: height * 0.45,
    marginTop: height * 0.1,
    marginBottom: height * 0.05, // Add bottom margin for scrolling space
    justifyContent: "center",
  },
  signUpText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    marginBottom: height * 0.04,
  },
  errorSnackbar: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  errorSnackbarText: {
    color: "#FFF",
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    textAlign: "center",
  },
  firstNameInput: {
    borderRadius: 10,
    height: height * 0.07,
    paddingLeft: height * 0.02,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: height * 0.02,
    fontSize: 16,
  },
  lastNameInput: {
    borderRadius: 10,
    height: height * 0.07,
    paddingLeft: height * 0.02,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: height * 0.02,
    fontSize: 16,
  },
  emailInput: {
    borderRadius: 10,
    height: height * 0.07,
    paddingLeft: height * 0.02,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: height * 0.02,
    fontSize: 16,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
  },
  passwordInput: {
    height: height * 0.07,
    fontSize: 16,
    paddingLeft: height * 0.02,
    paddingRight: height * 0.08,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
  },
  confirmPasswordInput: {
    height: height * 0.07,
    fontSize: 16,
    paddingLeft: height * 0.02,
    paddingRight: height * 0.08,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "Montserrat-Medium",
  },
  requirementsContainer: {
    backgroundColor: "#E6E6F8",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
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
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  eyeIcon: {
    width: 30,
    height: 20,
    tintColor: "#1E1E1E",
  },
  pickerContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    height: height * 0.07,
    justifyContent: "center",
    marginBottom: height * 0.02,
  },
  picker: {
    fontSize: 16,
    paddingLeft: height * 0.02,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: height * 0.01,
  },
  conditionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: height * 0.01,
  },
  checkbox: {
    width: 20,
    borderRadius: 2,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#000",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  text: {
    marginLeft: height * 0.02,
    fontSize: 13,
    color: "#000",
    fontFamily: "Montserrat-Regular",
  },
  continueContainer: {
    backgroundColor: "#111B56D4",
    borderRadius: 20,
    height: height * 0.07,
    justifyContent: "center",
    top: height * 0.01,
    marginBottom: height * 0.03,
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
    marginVertical: height * 0.01,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000", // Adjust color if needed
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#000",
    fontFamily: "Montserrat-Medium",
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
