import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const candidateStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2A501A",
    alignItems: "center",
  },
  subContainer: {
    backgroundColor: "#DBDEF1",
    width: width * 1,
    height: height * 0.28,
    borderBottomLeftRadius: height * 0.05,
    borderBottomRightRadius: height * 0.05,
    alignItems: "center",
  },
  header: {
    top: height * 0.03,
  },
  subHeader: {
    marginBottom: height * 0.02,
  },
  subHeaderText: {
    fontFamily: "Montserrat-Bold",
    color: "#111B56",
    fontSize: 24,
  },
  backImage: {
    width: height * 0.05,
    height: height * 0.05,
  },
  phasesContainer: {
    flexDirection: "row",
    top: height * 0.02,
    justifyContent: "space-between",
  },
  phaseOne: {
    backgroundColor: "#000",
    width: height * 0.15,
    height: height * 0.01,
    backgroundColor: "#B90A0A",
  },
  subPhaseOne: {
    width: width * 0.3,
    alignItems: "center",
  },
  subPhaseOneText: {
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    top: height * 0.01,
  },
  phaseTwo: {
    backgroundColor: "#F5F5F5",
    width: width * 0.28,
    height: height * 0.01,
  },
  phaseThree: {
    backgroundColor: "#F5F5F5",
    width: height * 0.15,
    height: height * 0.01,
  },
  searchContainer: {
    flexDirection: "row",
    width: width * 0.9,
    height: height * 0.07,
    top: height * 0.03,
    borderRadius: 6,
    backgroundColor: "#FFF",
    paddingLeft: height * 0.02,
  },
  searchIcon: {
    width: width * 0.06,
    height: height * 0.03,
    alignSelf: "center",
  },
  inputSearch: {
    fontFamily: "Montserrat-Regular",
    width: width * 1,
    paddingLeft: height * 0.02,
    fontSize: 14,
  },
  filterLocation: {
    flexDirection: "row",
    top: height * 0.06,
    gap: 5,
  },
  cityContainer: {
    width: width * 0.15,
    borderRadius: height * 1,
    borderWidth: 1,
    borderColor: "#111B56",
    height: height * 0.04,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  cityText: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 12,
  },
  barangayContainer: {
    width: width * 0.25,
    borderRadius: height * 1,
    borderWidth: 1,
    borderColor: "#111B56",
    height: height * 0.04,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
  },
  barangayText: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 12,
  },
  errorIndicator: {
    color: "red",
  },
  infoElections: {
    top: height * 0.1,
  },
  selectedButton: {
    backgroundColor: "#111B56", // Active background color
    borderColor: "#111B56", // Active border color
  },
  selectedText: {
    color: "#FFF", // Active text color
  },
});

module.exports = { candidateStyles };
