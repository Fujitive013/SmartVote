import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { homeStyles as styles } from "../../styles/HomeStyles";
import { useNavigation } from "@react-navigation/native";

const QuickAccess = () => {
  const navigation = useNavigation(); // ✅ Move hook here

  const handleQuickAccessPress = () => {
    navigation.navigate("Results");
  };

  return (
    <View style={styles.quickAccessContainer}>
      <Text style={styles.quickAccessText}>Quick Access</Text>
      <View style={styles.subQuickAccessContainer}>
        <TouchableOpacity
          style={styles.resultContainer}
          onPress={handleQuickAccessPress}
        >
          <Image
            source={require("../../../assets/images/trending.png")}
            style={styles.imageContainer}
          />
          <View style={styles.subResultContainer}>
            <Text style={styles.resultText}>Result</Text>
            <Text style={styles.viewResultText}>View Result</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickAccess;