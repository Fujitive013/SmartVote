import React from "react";
import { Picker } from "@react-native-picker/picker";
import { registerStyles as styles } from "../../styles/RegisterStyles";

const BarangayPicker = ({ barangays, selectedBarangay, onBarangayChange }) => (
  <Picker
    selectedValue={selectedBarangay}
    onValueChange={onBarangayChange}
    style={styles.picker}
    enabled={barangays.length > 0}
  >
    <Picker.Item label="Select a Barangay" value="" />
    {barangays.map((barangay) => (
      <Picker.Item key={barangay._id} label={barangay.name} value={barangay._id} />
    ))}
  </Picker>
);

export default BarangayPicker;
