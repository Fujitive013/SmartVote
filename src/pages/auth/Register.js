import React, { useEffect, useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useCustomFonts } from "../../../assets/fonts/fonts";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { registerStyles as styles } from "../../styles/RegisterStyles";
import { API_BASE_URL } from "../../config/ApiConfig";
import { register } from "../../services/auth";
import FormFields from "../../components/Register/FormFields";
import CityPicker from "../../components/Register/CityPicker";
import BarangayPicker from "../../components/Register/BarangayPicker";
import TermsCheckbox from "../../components/Register/TermsCheckbox";
import ErrorSnackbar from "../../components/Register/ErrorSnackbar";
import SuccessModal from "../../components/Register/SuccessModal";

SplashScreen.preventAutoHideAsync();

const Register = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedCity: "",
    selectedBarangay: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/locations/fetchCitiesAll`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const handleCityChange = (cityId) => {
    setFormData({ ...formData, selectedCity: cityId, selectedBarangay: "" });
    const city = cities.find((c) => c._id === cityId);
    setBarangays(city ? city.barangays : []);
  };

  const handleContinue = async () => {
    const { firstName, lastName, email, password, confirmPassword, selectedCity, selectedBarangay } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !selectedCity || !selectedBarangay) {
      setErrorMessage("Please fill out all required fields");
      setShowError(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowError(true);
      return;
    }

    if (!isChecked) {
      setErrorMessage("Please accept the terms and conditions");
      setShowError(true);
      return;
    }

    try {
      const response = await register(firstName, lastName, email, password, selectedCity, selectedBarangay);
      if (response.status === 201) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigation.navigate("LoginNew");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred while creating the account.");
      setShowError(true);
    }
  };

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FormFields
              formData={formData}
              setFormData={setFormData}
              passwordValid={passwordValid}
              passwordsMatch={passwordsMatch}
              setShowPasswordRequirements={setShowPasswordRequirements}
            />
            {showPasswordRequirements && <PasswordRequirements />}
            <CityPicker cities={cities} selectedCity={formData.selectedCity} onCityChange={handleCityChange} />
            <BarangayPicker
              barangays={barangays}
              selectedBarangay={formData.selectedBarangay}
              onBarangayChange={(value) => setFormData({ ...formData, selectedBarangay: value })}
            />
            <TermsCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
            <TouchableOpacity style={styles.continueContainer} onPress={handleContinue}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
            <ErrorSnackbar visible={showError} message={errorMessage} onDismiss={() => setShowError(false)} />
            <SuccessModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;
