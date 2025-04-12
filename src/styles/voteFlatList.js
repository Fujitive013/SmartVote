import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const voteFlatList = StyleSheet.create({
  container: {
    width: width * 0.9,
    top: height * 0.05,
  },
  subContainer: {
    backgroundColor: "#F5F5F5",
    width: width * 0.9,
    borderRadius: height * 0.02,
    marginBottom: height * 0.02,
    padding: height * 0.02,
  },
  candidateContainer: {
    marginTop: 5,
    backgroundColor: "#EFF6FF",
    paddingLeft: height * 0.02,
    marginBottom: height * 0.01,
    justifyContent: "center",
    height: height * 0.08,
    borderRadius: height * 0.04,
  },
  labelText: {
    fontFamily: "Montserrat-Medium",
    color: "#2563EB",
  },
  candidateText: {
    fontFamily: "Montserrat-Bold",
    marginTop: 10,
  },
  nameText: {
    fontFamily: "Montserrat-Bold",
  },
  descriptionText:{
    fontFamily: "Montserrat-Medium"
  }
});

export default voteFlatList;
