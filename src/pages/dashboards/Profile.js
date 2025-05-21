import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect,  } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../../config/ApiConfig"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cityName, setCityName] = useState("");
  const [barangayName, setBarangayName] = useState("");
  const navigation = useNavigation();

  // Fetch user data and location names
  const fetchCityNameAndBarangay = async (cityId, barangayId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE_URL}/locations/fetchCities/${cityId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cityData = res.data;
      setCityName(cityData.name);
      const barangay = cityData.barangays.find((b) => b._id === barangayId);
      setBarangayName(barangay ? barangay.name : "N/A");
    } catch (error) {
      console.error("Error fetching city/Barangay:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const dataStr = await AsyncStorage.getItem("userData");
        if (dataStr) {
          const parsed = JSON.parse(dataStr);
          setUser(parsed);
          if (parsed.city_id && parsed.baranggay_id) {
            fetchCityNameAndBarangay(parsed.city_id, parsed.baranggay_id);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("LoginNew");
  };

  const getInitials = () => {
    if (!user?.first_name || !user?.last_name) return "N/A";
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  };

  return (
    <View style={styles.container}>
      {/* Profile picture */}
      <View style={styles.profileCircle}>
        <Text style={styles.initials}>{getInitials()}</Text>
      </View>
      {/* User name and role */}
      <Text style={styles.name}>{user?.first_name || "Loading..."}</Text>
      <Text style={styles.role}>{user?.role || "Voter"}</Text>

      {/* Info cards */}
      <View style={styles.infoCardsContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{user?.first_name} {user?.last_name}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user?.role || "Voter"}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>{cityName}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Barangay</Text>
          <Text style={styles.value}>{barangayName}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 0.27,
    backgroundColor: "#eef2f3",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  profileCircle: {
    marginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#111B56",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  initials: {
    fontSize: 40,
    color: "#F2F2F2",
    fontWeight: "bold",
  },
  name: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
  },
  role: {
    fontSize: 16,
    color: "#555",
  },
  infoCardsContainer: {
    marginTop: 30,
    width: "100%",
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 13,
    color: "#999",
    fontWeight: "600",
  },
  value: {
    marginTop: 6,
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#e53935",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});