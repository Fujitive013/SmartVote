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
import { useCustomFonts } from "../../../assets/fonts/fonts";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { API_BASE_URL } from "../../config/ApiConfig";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { validatePassword } from "../../utils/validatePassword";
import { registerStyles as styles } from "../../styles/RegisterStyles";

SplashScreen.preventAutoHideAsync();

const Register = () => {
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

  useEffect(() => {
    fetch(`${API_BASE_URL}/locations/fetchCities`)
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
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
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
                      source={require("../../../assets/images/success.png")}
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
                        ? require("../../../assets/images/eye-close.png")
                        : require("../../../assets/images/eye-open.png")
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

              <View style={styles.gapSpace} />
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
                        ? require("../../../assets/images/eye-close.png")
                        : require("../../../assets/images/eye-open.png")
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
                    source={require("../../../assets/images/facebook.png")}
                    style={styles.facebookLogo}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../../../assets/images/google.png")}
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

export default Register;
