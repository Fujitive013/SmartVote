import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'none',
    alignItems: "center",
  },
  loadingText:{
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#111B56",
    marginTop: 10,
  }
});

module.exports = { loadingStyles };
