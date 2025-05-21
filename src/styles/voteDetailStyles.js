import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const voteDetailsStyles = StyleSheet.create({
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
    width: width * 0.29,
    alignItems: "center",
  },
  subPhaseTwoText: {
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    fontSize: 12,
    top: height * 0.01,
  },
  phaseTwo: {
    backgroundColor: "#F5F5F5",
    width: width * 0.29,
    height: height * 0.01,
  },
  phaseThree: {
    backgroundColor: "#21C179",
    width: width * 0.29,
    height: height * 0.01,
  },
  mainContainer: {
    alignSelf: "center",
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
  noVoteText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
    marginTop: 8,
    textAlign: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
  },
});

module.exports = { voteDetailsStyles };