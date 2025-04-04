import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { electionStyles as styles } from "../../styles/ElectionStyles";
import { API_BASE_URL } from "../../config/ApiConfig";

const ElectionDetails = ({ route }) => {
  const { electionId } = route.params;
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [user, setUser] = useState(null);
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchElectionDetails();
      fetchUserVote();
    }
  }, [user, electionId]);

  const initializeData = async () => {
    const userData = await fetchUserData();
    setUser(userData);
  };

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const fetchUserVote = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token || !user) return;

      const response = await axios.get(`${API_BASE_URL}/votes/status`, {
        params: { voter_id: user.id, election_id: electionId },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.hasVoted) {
        setSelectedCandidate(response.data.voteDetails.candidate_id);
      }
    } catch (error) {
      console.error("Error fetching user's vote:", error);
    }
  };

  const fetchElectionDetails = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${API_BASE_URL}/elections/${electionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setElection(response.data);
      fetchVoteCounts(response.data.candidates);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVoteCounts = async (candidates) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const counts = {};
    for (const candidate of candidates) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/votes/count/${candidate._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        counts[candidate._id] = response.data.voteCount;
      } catch (error) {
        console.error(`Error fetching vote count for ${candidate._id}:`, error);
        counts[candidate._id] = 0;
      }
    }
    setVoteCounts(counts);
  };

  const handleVote = async (candidateName, candidateId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token || !user || !election) return;

      const payload = {
        voter_id: user.id,
        voter_first_name: user.first_name,
        voter_last_name: user.last_name,
        election_id: election._id,
        election_name: election.name,
        candidate_id: candidateId,
        candidate_name: candidateName,
      };

      const response = await axios.post(`${API_BASE_URL}/votes`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        Alert.alert("Vote Successful", `You have voted for ${candidateName}`);
        fetchVoteCounts(election.candidates);
      } else {
        handleVoteError(response);
      }
    } catch (error) {
      handleVoteError(error.response);
    }
  };

  const handleVoteError = (response) => {
    const errorMessage =
      response?.data?.error || "An error occurred while casting your vote.";
    Alert.alert("Error", errorMessage);
  };

  const handleError = (error) => {
    console.error("Error fetching election details:", error);
    if (error.response?.status === 401) {
      Alert.alert("Session Expired", "Please log in again");
    }
  };

  const renderCandidate = (candidate) => (
    <View key={candidate._id} style={styles.candidateItem}>
      <Image
        source={require("../../../assets/user.png")}
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
          selectedCandidate === candidate._id
            ? styles.disabledButton
            : styles.activeButton,
        ]}
        onPress={() => handleVote(candidate.name, candidate._id)}
        disabled={selectedCandidate === candidate._id}
      >
        <Text style={styles.voteButtonText}>
          {selectedCandidate === candidate._id ? "Voted" : "Vote"}
        </Text>
      </TouchableOpacity>
    </View>
  );

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
        {election.candidates?.length > 0 ? (
          election.candidates.map(renderCandidate)
        ) : (
          <Text style={styles.noCandidatesText}>No candidates available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ElectionDetails;
