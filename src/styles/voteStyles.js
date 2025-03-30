import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const voteStyles = StyleSheet.create({
  candidateContainer: {
    top: height * 0.05,
    alignItems: "center",
    justifyContent: "space-between", // Ensures elements are spaced
    backgroundColor: "#FFF",
    width: width * 0.9,
    height: height * 0.2, // Increased height to fit the button
    borderRadius: 6,
    padding: 15,
    flexDirection: "column", // Ensures content is stacked vertically
    marginBottom: 10,
  },
  candidateInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profileIcon: {
    width: height * 0.08,
    height: height * 0.08,
    borderRadius: (height * 0.08) / 2,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
  candidateSubContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  candidateText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
  },
  candidatePartyContainer: {
    backgroundColor: "#EFF6FF",
    width: width * 0.6,
    justifyContent: 'center',
    height: height * 0.03,
    borderRadius: 20,
  },
  candidateParty: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    textAlign: 'center',
    color: '#2563EB'
  },
  voteNowButton: {
    backgroundColor: "#111B56",
    width: width * 0.8,
    borderRadius: height * 1,
    height: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  voteNowButtonText: {
    color: "#F5F5F5",
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },
});

module.exports = { voteStyles };
