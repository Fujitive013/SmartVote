import React from "react";
import { View, Text, Pressable } from "react-native";
import { registerStyles as styles } from "../../styles/RegisterStyles";

const TermsCheckbox = ({ isChecked, setIsChecked }) => {
  return (
    <View style={styles.conditionContainer}>
      <Pressable
        style={[styles.checkbox, isChecked && styles.checked]}
        onPress={() => setIsChecked(!isChecked)}
      >
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>
      <Text style={styles.text}>
        By continuing, you agree to the terms & conditions and acknowledge the privacy policy.
      </Text>
    </View>
  );
};

export default TermsCheckbox;
