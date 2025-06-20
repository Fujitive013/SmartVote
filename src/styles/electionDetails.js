import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const electionDetailsStyles = StyleSheet.create({
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
    top: height * 0.05,
  },
  subHeader: {
    marginBottom: height * 0.02,
  },
  subHeaderText: {
    fontFamily: "Montserrat-Bold",
    color: "#111B56",
    fontSize: 22,
  },
  backImage: {
    width: height * 0.045,
    height: height * 0.045,
  },
  phasesContainer: {
    flexDirection: "row",
    top: height * 0.02,
    justifyContent: "space-between",
  },
  phaseOne: {
    width: height * 0.15,
    height: height * 0.01,
    backgroundColor: "#F5F5F5",
  },
  subPhaseOne: {
    width: width * 0.29, //0.28
    alignItems: "center",
  },
  subPhaseTwoText: {
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    fontSize: 12,
    top: height * 0.01,
  },
  phaseTwo: {
    backgroundColor: "#F6CE3A",
    width: width * 0.29, //0.3
    height: height * 0.01,
  },
  phaseThree: {
    backgroundColor: "#F5F5F5",
    width: width * 0.29,
    height: height * 0.01,
  },
  mainContainer: {
    alignSelf: "center",
    bottom: height * 0.02,
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
  noResults: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: height * 0.3,
  },
});

module.exports = { electionDetailsStyles };
