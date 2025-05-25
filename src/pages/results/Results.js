import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../config/ApiConfig"; // Adjust the import path as necessary

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [locationIds, setLocationIds] = useState({
    city_id: null,
    baranggay_id: null,
  }); // store user's location ids

  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("userData");
      if (user) {
        const userData = JSON.parse(user);
        setLocationIds({
          city_id: userData.city_id,
          baranggay_id: userData.baranggay_id,
        });
        return userData;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  // Function to fetch election details by location
  const fetchElectionDetailsByLocation = async (cityId, barangayId, token) => {
    // Support two fetches:
    const electionsCityWidePromise = fetch(
      `${API_BASE_URL}/elections/getByLocation/${cityId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const electionsBarangayPromise = fetch(
      barangayId
        ? `${API_BASE_URL}/elections/getByLocation/${cityId}/${barangayId}`
        : `${API_BASE_URL}/elections/getByLocation/${cityId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const [cityWideResponse, barangayResponse] = await Promise.all([
      electionsCityWidePromise,
      electionsBarangayPromise,
    ]);

    if (!cityWideResponse.ok || !barangayResponse.ok) {
      throw new Error("Failed to fetch elections");
    }

    const cityWideElections = await cityWideResponse.json();
    const barangayElections = await barangayResponse.json();

    // Combine and remove duplicates (based on _id)
    const combined = [...cityWideElections];

    const existingIds = new Set(combined.map((e) => e._id));

    for (const election of barangayElections) {
      if (!existingIds.has(election._id)) {
        combined.push(election);
      }
    }

    return combined;
  };

  // Function to fetch candidates for a specific election
  const fetchCandidatesForElection = async (
    electionId,
    cityId,
    barangayId,
    token
  ) => {
    const url = `${API_BASE_URL}/elections/${electionId}`; // assuming your endpoint to get election detail includes candidates or is designed to fetch candidates
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch election details");
    }
    const electionDetails = await response.json();
    // Return candidates array
    return electionDetails.candidates || [];
  };

  const fetchVoteCount = async (candidateId, token) => {
    const response = await fetch(`${API_BASE_URL}/votes/count/${candidateId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch votes");
    }
    const data = await response.json();
    return data.voteCount;
  };

  const fetchResults = async () => {
    try {
      const token = await getToken();
      const user = await getUserData();

      if (!token || !user) {
        console.warn("Missing token or user data.");
        setLoading(false);
        return;
      }

      const { city_id, baranggay_id } = user;

      const elections = await fetchElectionDetailsByLocation(
        city_id,
        baranggay_id,
        token
      );

      const resultsData = [];
      for (const election of elections) {
        const res = await fetch(
          `${API_BASE_URL}/elections/results/${election._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await res.json();
        resultsData.push({
          name: election.name,
          _id: election._id,
        });
      }
      setResults(resultsData);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (election) => {
    setSelectedElection(election);
    const token = await getToken();
    const user = await getUserData();
    const { city_id, baranggay_id } = user;

    try {
      const fetchedCandidates = await fetchCandidatesForElection(
        election._id,
        city_id,
        baranggay_id,
        token
      );

      // Now fetch votes for each candidate
      const candidatesWithVotes = await Promise.all(
        fetchedCandidates.map(async (candidate) => {
          try {
            const votes = await fetchVoteCount(candidate._id, token);
            return { ...candidate, votes };
          } catch (err) {
            console.error("Error fetching candidate votes:", err);
            return { ...candidate, votes: 0 }; // fallback
          }
        })
      );

      setCandidates(candidatesWithVotes);
    } catch (err) {
      console.error("Error fetching candidates or votes:", err);
      setCandidates([]); // fallback
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedElection(null);
    setCandidates([]);
  };

  useEffect(() => {
    // Start polling
    const intervalId = setInterval(() => {
      fetchResults();
    }, 3000); // 3000 ms = 3 seconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading results...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Election Results</Text>
        {results.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
            No results available for your city and barangay.
          </Text>
        ) : (
          results.map((election, index) => (
            <View key={index} style={styles.electionContainer}>
              <Text style={styles.electionTitle}>{election.name}</Text>
              <TouchableOpacity
                style={styles.viewCandidatesButton}
                onPress={() => openModal(election)}
              >
                <Text style={styles.viewCandidatesText}>View Candidates</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Candidates for {selectedElection?.name}
            </Text>
            <FlatList
              data={candidates}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.candidateDetail}>
                  <Text style={styles.candidateName}>{item.name}</Text>
                  <Text style={styles.candidateParty}>{item.party}</Text>
                  <Text style={styles.voteCount}>Votes: {item.votes}</Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={{ textAlign: "center" }}>
                  No candidates available
                </Text>
              }
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1a1a2e",
  },
  electionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
  },
  electionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
    textAlign: "center",
  },
  viewCandidatesButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  viewCandidatesText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  candidateItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  candidateName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  voteCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },
  loadingText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#007bff",
  },
  candidateDetail: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  candidateParty: {
    fontSize: 14,
    color: "#555",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Results;
