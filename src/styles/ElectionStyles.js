import { StyleSheet } from "react-native";

export const electionStyles = StyleSheet.create({
  candidateInfo: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  deadline: {
    fontSize: 16,
    color: "#dc3545",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
    textAlign: "center",
  },
  candidateTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  candidateItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  candidateImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  voteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#007bff",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  voteButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  noCandidatesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});
