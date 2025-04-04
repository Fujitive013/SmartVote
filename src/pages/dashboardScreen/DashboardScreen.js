import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { dashboardScreenStyles as styles } from "../../styles/DashboardScreenStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserData } from "../../utils/Storage";
import LoadingScreen from "../../components/LoadingScreen";

// Icons
const homeIcon = require("../../../assets/images/icon/home.png");
const profileIcon = require("../../../assets/images/icon/profile.png");
const resultIcon = require("../../../assets/images/icon/voteDashboard.png");

// Screens
import HomePage from "../dashboards/Home";
import Profile from "../dashboards/Profile";
import Settings from "../election/phase1/ViewCandidate";

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [cityId, setCityId] = useState(null);
  const [barangayId, setBarangayId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();

  // Fetch user data to get city_id and barangay_id
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        console.log("Fetched user:", user); // 👈 Add this
        if (user) {
          setCityId(user.city_id);
          setBarangayId(user.baranggay_id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomePage />;
      case "Profile":
        return <Profile />;
      case "Result":
        return (
          <Settings
            navigation={navigation}
            route={route}
            cityId={cityId} // Pass city_id
            barangayId={barangayId} // Pass barangay_id
          />
        );
      default:
        return <HomePage />;
    }
  };

  if (loading) {
    <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {renderContent()}

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "Profile" && styles.activeTabItem,
          ]}
          onPress={() => setActiveTab("Profile")}
        >
          <Image
            source={profileIcon}
            style={[
              styles.icon,
              activeTab === "Profile" ? styles.activeIcon : styles.inactiveIcon,
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === "Home" && styles.activeTabItem]}
          onPress={() => setActiveTab("Home")}
        >
          <Image
            source={homeIcon}
            style={[
              styles.icon,
              activeTab === "Home" ? styles.activeIcon : styles.inactiveIcon,
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "Result" && styles.activeTabItem,
          ]}
          onPress={() => setActiveTab("Result")}
        >
          <Image
            source={resultIcon}
            style={[
              styles.icon,
              activeTab === "Result" ? styles.activeIcon : styles.inactiveIcon,
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;
