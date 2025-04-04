import React from "react";
import { TextInput, View } from "react-native";
import { registerStyles as styles } from "../../styles/RegisterStyles";

const FormFields = ({ formData, setFormData, passwordValid, passwordsMatch, setShowPasswordRequirements }) => {
  return (
    <View>
      <TextInput
        placeholder="First Name*"
        style={styles.firstNameInput}
        value={formData.firstName}
        onChangeText={(value) => setFormData({ ...formData, firstName: value })}
      />
      <TextInput
        placeholder="Last Name*"
        style={styles.lastNameInput}
        value={formData.lastName}
        onChangeText={(value) => setFormData({ ...formData, lastName: value })}
      />
      <TextInput
        placeholder="Email*"
        style={styles.emailInput}
        value={formData.email}
        onChangeText={(value) => setFormData({ ...formData, email: value })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password*"
        style={[styles.passwordInput, !passwordValid && styles.inputError]}
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => {
          setFormData({ ...formData, password: value });
          setShowPasswordRequirements(true);
        }}
      />
      <TextInput
        placeholder="Confirm Password*"
        style={[styles.confirmPasswordInput, !passwordsMatch && styles.inputError]}
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(value) => setFormData({ ...formData, confirmPassword: value })}
      />
    </View>
  );
};

export default FormFields;
