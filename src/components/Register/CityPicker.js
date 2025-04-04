import React from "react";
import { Picker } from "@react-native-picker/picker";
import { registerStyles as styles } from "../../styles/RegisterStyles";

const CityPicker = ({ cities, selectedCity, onCityChange }) => (
  <Picker selectedValue={selectedCity} onValueChange={onCityChange} style={styles.picker}>
    <Picker.Item label="Select a City" value="" />
    {cities.map((city) => (
      <Picker.Item key={city._id} label={city.name} value={city._id} />
    ))}
  </Picker>
);

export default CityPicker;
