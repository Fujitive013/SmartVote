import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const dashboardScreenStyles = StyleSheet.create({
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

module.exports = { dashboardScreenStyles };