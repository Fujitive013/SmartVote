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
    justifyContent: "center",
    height: height * 0.03,
    borderRadius: 20,
  },
  candidateParty: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    textAlign: "center",
    color: "#2563EB",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(180, 180, 180, 0.6)",
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalImage: {
    width: width * 0.2,
    height: height * 0.1,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
    color: "#111B56",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    fontFamily: "Montserrat-Regular",
    color: "#111B56",
  },
  boldText: {
    fontFamily: "Montserrat-Bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  yesButton: {
    flex: 1,
    backgroundColor: "#21C179",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },
  noButton: {
    flex: 1,
    backgroundColor: "#B90A0A",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  successModalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  successModalImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  successModalTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  successModalMessage: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#333",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  activeButton: {
    backgroundColor: "#111B56",
  },
});

module.exports = { voteStyles };
