import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DBDEF1",
    alignItems: "center",
  },
  textWrapper: {
    alignSelf: "flex-start",
    paddingLeft: height * 0.03,
    paddingTop: height * 0.05,
  },
  subContainer: {
    backgroundColor: "#111B56",
    width: width * 1,
    height: height * 0.4,
    borderBottomLeftRadius: height * 0.05,
    borderBottomRightRadius: height * 0.05,
    alignItems: "center",
  },
  subSaharanContainer: {
    width: width * 0.9,
    top: height * 0.05,
  },
  date: {
    color: "#BFBFBF",
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
  },
  greetingsText: {
    color: "#FFF",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
  },
  voteCounterContainer: {
    backgroundColor: "#FFF",
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 15,
    position: "absolute",
    top: height * 0.14,
  },
  voteText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13.5,
    padding: height * 0.02,
  },
  countVote: {
    bottom: height * 0.02,
    flexDirection: "row",
    paddingLeft: height * 0.02,
    alignItems: "baseline",
  },
  votedText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 40,
  },
  overVotedText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 25,
    color: "#757575",
  },
  viewDetailsContainer: {
    bottom: height * 0.02,
  },
  detailsText: {
    fontFamily: "Montserrat-Bold",
    paddingLeft: height * 0.02,
    color: "#111B56",
    textDecorationLine: "underline",
    textDecorationColor: "#111B56",
  },
  searchContainer: {
    flexDirection: "row",
    width: width * 0.9,
    height: height * 0.07,
    bottom: height * 0.045,
    borderRadius: 6,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
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
  quickAccessContainer: {
    alignSelf: "flex-start",
    paddingLeft: height * 0.02,
  },
  quickAccessText: {
    fontFamily: "Montserrat-Bold",
    paddingLeft: height * 0.005,
  },
  subQuickAccessContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensures space between items
    width: width * 0.9,
    marginTop: height * 0.02,
    paddingLeft: height * 0.005,
  },
  resultContainer: {
    backgroundColor: "#99C98F",
    width: width * 0.9,
    height: height * 0.1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: height * 0.01,
  },
  subResultContainer: {
    justifyContent: "center",
  },
  imageContainer: {
    backgroundColor: "#E8EAF6",
    width: width * 0.12,
    height: height * 0.06,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: height * 0.01,
  },
  resultText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  viewResultText: {
    fontFamily: "Montserrat-Medium",
  },
  monitorContainer: {
    backgroundColor: "#FFF",
    width: width * 0.43,
    height: height * 0.1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: height * 0.01,
  },
  subMonitorContainer: {
    justifyContent: "center",
  },
  monitorText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  checkVotesText: {
    fontFamily: "Montserrat-Medium",
  },
  ongoingElectionsContainer: {
    alignSelf: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: height * 0.02,
    top: height * 0.02,
    width: width * 0.9,
    alignItems: "baseline",
    marginBottom: height * 0.04,
  },
  ongoingElectionsText: {
    fontFamily: "Montserrat-Bold",
    paddingLeft: height * 0.005,
  },
  viewAllText: {
    fontFamily: "Montserrat-Bold",
    color: "#4B515D",
    fontSize: 12,
  },
  barangayCaptainContainer: {
    backgroundColor: "#FFF",
    width: width * 0.9,
    height: height * 0.15,
    paddingLeft: height * 0.02,
    borderRadius: 6,
    marginBottom: height * 0.02,
  },
  barangayCaptainText: {
    fontFamily: "Montserrat-Bold",
    top: height * 0.02,
  },
  barangayDateEnd: {
    fontFamily: "Montserrat-Regular",
    top: height * 0.04,
  },
  voteImage: {
    top: height * 0.02,
    right: height * 0.01,
    width: height * 0.05, // Set appropriate width
    height: height * 0.05, // Set appropriate height
    resizeMode: "contain", // Optional: controls how image fits in space
    marginTop: 8, // Optional: add spacing if needed
    alignSelf: "flex-end", // Optional: center the image
  },
  voteNowText: {
    top: height * 0.06,
    fontFamily: "Montserrat-Bold",
    fontSize: 17,
    color: "#111B56",
    textDecorationLine: "underline",
  },
  noElectionsText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: height * 0.04,
  },
  voteNowButton: {
    backgroundColor: "#4CAF50", // Green background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  voteNowButtonText: {
    color: "#FFF", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});

module.exports = { homeStyles };
