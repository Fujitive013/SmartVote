import React from "react";
import { View, Text } from "react-native";
import { registerStyles as styles } from "../../styles/RegisterStyles";

const PasswordRequirements = () => {
  return (
    <View style={styles.requirementsContainer}>
      <Text style={styles.requirementsText}>
        A six-character password is required with at least 3 of the following:
      </Text>
      <Text style={styles.requirementItem}>1 upper-case character</Text>
      <Text style={styles.requirementItem}>1 special character (e.g., !@#*_)</Text>
      <Text style={styles.requirementItem}>1 number</Text>
    </View>
  );
};

export default PasswordRequirements;
