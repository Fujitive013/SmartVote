import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ElectionDetails = ({ route }) => {
  const { electionId } = route.params;
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [user, setUser] = useState(null);
  const [voteCounts, setVoteCounts] = useState({});
  const API_KEY = Constants.expoConfig?.extra?.API_KEY;

  useEffect(() => {
    const initializeData = async () => {
      await fetchUserData(); // Fetch user data first
    };
  
    initializeData();
  }, []);
  
  useEffect(() => {
    if (user) {
      fetchElectionDetails();
      fetchUserVote(); // Only fetch vote status once user is available
    }
  }, [user, electionId]);

  const fetchUserVote = async () => {
    if (!user) {
      console.error("User data not available");
      return;
    }

    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get(`${API_KEY}/votes/status`, {
        params: {
          voter_id: user.id, // Use the user's ID
          election_id: electionId, // Use the current election ID
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.hasVoted) {
        setSelectedCandidate(response.data.voteDetails.candidate_id); // Set the selected candidate
      }
    } catch (error) {
      console.error("Error fetching user's vote:", error);
    }
  };

  const fetchElectionDetails = async () => {
    setLoading(true);
    try {
      console.log("Fetching election details...");
      const response = await axios.get(`${API_KEY}/elections/${electionId}`);
      console.log("Election data received:", response.data);
      setElection(response.data);
      fetchVoteCounts(response.data.candidates);
    } catch (error) {
      console.error("Error fetching election details:", error);
    }
    setLoading(false);
  };

  const fetchVoteCounts = async (candidates) => {
    const token = await AsyncStorage.getItem("userToken"); // Retrieve the token
    if (!token) {
      console.error("No token found");
      return;
    }

    const counts = {};
    for (const candidate of candidates) {
      try {
        const response = await axios.get(
          `${API_KEY}/votes/count/${candidate._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token
            },
          }
        );
        counts[candidate._id] = response.data.voteCount;
      } catch (error) {
        console.error(
          "Error fetching vote count for candidate:",
          candidate._id,
          error
        );
        counts[candidate._id] = 0; // Default to 0 if there's an error
      }
    }
    setVoteCounts(counts);
  };

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      console.log("Raw user data from storage:", userData);
      if (userData) {
        const parsedData = JSON.parse(userData);
        console.log("Parsed user data:", parsedData);
        setUser(parsedData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateName, candidateId) => {
    const token = await AsyncStorage.getItem("userToken"); // Retrieve the token
    if (!token) {
      console.error("No token found");
      Alert.alert("Error", "You are not authorized to vote. Please log in.");
      return;
    }

    const { first_name, last_name, id: voterId } = user;
    const { _id: electionId, name: electionName } = election;

    const payload = {
      voter_id: voterId,
      voter_first_name: first_name,
      voter_last_name: last_name,
      election_id: electionId,
      election_name: electionName,
      candidate_id: candidateId,
      candidate_name: candidateName,
    };

    console.log("Payload:", payload);

    try {
      const response = await axios.post(`${API_KEY}/votes`, payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      });

      if (response.status === 201) {
        Alert.alert("Vote Successful", `You have voted for ${candidateName}`);
        fetchVoteCounts(election.candidates); // Refresh vote counts
      } else if (response.status === 400) {
        Alert.alert("Error", "You have already voted in this election");
      } else {
        Alert.alert(
          "Error",
          response.data.error ||
            "There was an issue casting your vote. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during voting:", error);
      Alert.alert(
        "Error",
        error.response?.data?.error ||
          "There was an issue with your request. Please try again later."
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading election details...</Text>
      </View>
    );
  }

  if (!election) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Election details not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{election.name}</Text>
      <Text style={styles.deadline}>
        Deadline: {new Date(election.end_date).toDateString()}
      </Text>
      <Text style={styles.description}>{election.description}</Text>

      <Text style={styles.candidateTitle}>Candidates:</Text>
      <ScrollView>
        {election.candidates && election.candidates.length > 0 ? (
          election.candidates.map((candidate) => (
            <View key={candidate._id} style={styles.candidateItem}>
              <Image
                source={require("../assets/user.png")}
                style={styles.candidateImage}
              />
              <View style={styles.candidateInfo}>
                <Text style={styles.candidateName}>{candidate.name}</Text>
                <Text style={styles.candidateParty}>{candidate.party}</Text>
                <Text style={styles.voteCountText}>
                  Votes: {voteCounts[candidate._id] || 0}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.voteButton,
                  selectedCandidate?._id === candidate._id
                    ? styles.disabledButton
                    : styles.activeButton,
                ]}
                onPress={() => {
                  console.log(
                    "handleVote triggered for:",
                    candidate.name,
                    candidate._id
                  );
                  handleVote(candidate.name, candidate._id);
                }}
              >
                <Text style={styles.voteButtonText}>
                  {selectedCandidate === candidate._id ? "Voted" : "Vote"}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noCandidatesText}>No candidates available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ElectionDetails;

const styles = StyleSheet.create({
  candidateInfo: { flex: 1, justifyContent: "center", marginRight: 10 },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { fontSize: 16, color: "#333", marginTop: 10 },
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
  activeButton: { backgroundColor: "#007bff" },
  disabledButton: { backgroundColor: "#ccc" },
  voteButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
  noCandidatesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});