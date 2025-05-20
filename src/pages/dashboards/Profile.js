import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../config/ApiConfig";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cityName, setCityName] = useState("");
  const [barangayName, setBarangayName] = useState("");
  const navigation = useNavigation();

  // Prevent hardware back button navigation
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true; // Prevents default back navigation
      }
    );

    // Cleanup back handler on unmount
    return () => backHandler.remove();
  }, []);

  const fetchCityNameAndBarangay = async (cityId, barangayId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE_URL}/locations/fetchCities/${cityId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const cityData = res.data;
      setCityName(cityData.name);

      const barangayItem = cityData.barangays.find(
        (b) => b._id === barangayId
      );
      setBarangayName(barangayItem ? barangayItem.name : "N/A");
    } catch (error) {
      console.error("Error fetching city and barangay:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUser(parsedData);
          if (parsedData.city_id && parsedData.baranggay_id) {
            fetchCityNameAndBarangay(parsedData.city_id, parsedData.baranggay_id);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Logout function to clear AsyncStorage and navigate to Login
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("token");
      navigation.replace("LoginNew");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getInitials = () => {
    if (!user?.first_name || !user?.last_name) return "N/A";
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.profileContainer}>
          <Text style={styles.profileInitials}>{getInitials()}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>
            {user?.first_name || "Loading..."}
          </Text>
          <Text style={styles.roleText}>{user?.role || "Voter"}</Text>
        </View>
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.infoText}>
          Full Name: {user?.first_name} {user?.last_name}
        </Text>
        <Text style={styles.infoText}>Role: {user?.role || "Voter"}</Text>
        <Text style={styles.infoText}>City: {cityName}</Text>
        <Text style={styles.infoText}>Barangay: {barangayName}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    borderRadius: 20,
  },
  profileContainer: {
    backgroundColor: "#111B56",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    fontFamily: "Montserrat-Bold",
    fontSize: 36, // Large font for initials
    color: "#FFFFFF", // White color for contrast
    textAlign: "center",
  },
  infoContainer: {
    alignItems: "center",
  },
  nameText: {
    top: 10,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  roleText: {
    top: 10,
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
  },
  informationContainer: {
    alignSelf: "center",
    top: 10,
    flex: 0.3,
    borderRadius: 20,
    width: "80%",
  },
  infoText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    padding: 10,
    backgroundColor: "#F5FCFF",
    borderRadius: 20,
    marginBottom: 10,
  },
  logoutButton: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#FF4D4D", // Red color for logout button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutButtonText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});