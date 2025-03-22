import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const { width, height } = Dimensions.get("window");

// Icons
const homeIcon = require("../assets/images/icon/home.png");
const profileIcon = require("../assets/images/icon/profile.png");
const resultIcon = require("../assets/images/icon/result.png");

// Screens
import HomePage from "../Screens/Dashboard/Home";
import Profile from "../Screens/Dashboard/Profile";
import Settings from "../Screens/Dashboard/Settings";

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState("Home");

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomePage />;
      case "Profile":
        return <Profile />;
      case "Result":
        return <Settings />;
      default:
        return <HomePage />;
    }
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DBDEF1",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: height * 0.07,
    width: width * 0.7,
    backgroundColor: "#ced1e2",
    alignSelf: "center",
    position: "absolute",
    bottom: height * 0.02,
    borderRadius: height * 1,
    elevation: 0,
    paddingHorizontal: height * 0.03,
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.2,
    padding: height * 0.01,
    borderRadius: 30,
  },
  activeTabItem: {
    backgroundColor: "#111B56", // Background color for the active tab
  },
  icon: {
    width: 26,
    height: 24,
  },
  activeIcon: {
    tintColor: "#fff", // Color for active icon
  },
  inactiveIcon: {
    tintColor: "black", // Color for inactive icon
  },
});
