import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { dashboardScreenStyles as styles } from "../../styles/DashboardScreenStyles";

// Icons
const homeIcon = require("../../../assets/images/icon/home.png");
const profileIcon = require("../../../assets/images/icon/profile.png");
const resultIcon = require("../../../assets/images/icon/result.png");

// Screens
import HomePage from "../dashboards/Home";
import Profile from "../dashboards/Profile";
import Settings from "../dashboards/Settings";

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