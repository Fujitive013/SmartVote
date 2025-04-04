import React from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";
import { registerStyles as styles } from "../../styles/RegisterStyles";

const SuccessModal = ({ visible, onClose }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
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
          <TouchableOpacity onPress={onClose} style={styles.closeContainer}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
