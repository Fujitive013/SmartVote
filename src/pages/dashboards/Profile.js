import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // Make sure axios is installed
import API_BASE_URL from "../../config/ApiConfig";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cityName, setCityName] = useState("");
  const [barangayName, setBarangayName] = useState("");

  const fetchCityNameAndBarangay = async (cityId, barangayId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(
        `http://192.168.1.3:3000/locations/fetchCities/${cityId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const cityData = res.data;
      setCityName(cityData.name);
  
      // Find barangay name in populated baranggays array
      const barangayItem = cityData.baranggays.find(
        (b) => b._id._id === barangayId
      );
  
      if (barangayItem) {
        setBarangayName(barangayItem._id.name);
      } else {
        setBarangayName("N/A");
      }
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

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.profileContainer} />
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
        <Text style={styles.infoText}>City: {cityName || "Loading..."}</Text>
        <Text style={styles.infoText}>Barangay: {user?.baranggay_id || "N/A"}</Text>
      </View>
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
});
