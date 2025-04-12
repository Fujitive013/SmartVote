import VoteList from "../../../components/VoteList";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { electionDetailsStyles as styles } from "../../../styles/electionDetails";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "../../../utils/Storage";
import {
  fetchElectionDetailsById,
  fetchElectionDetailsByLocation,
  fetchVotingStatus,
} from "../../../services/ElectionService";

const ElectionDetails = ({ route, navigation }) => {
  const { electionId } = route.params || {};
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]); // Renamed
  const [searchQuery, setSearchQuery] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchElectionDetails = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const user = await getUserData();
        if (!user || !user.city_id || !user.baranggay_id) {
          throw new Error("User data is incomplete or missing");
        }

        // Fetch election details by electionId
        const electionData = await fetchElectionDetailsById(electionId, token);
        setElection(electionData);

        // Fetch election details by location
        const locationData = await fetchElectionDetailsByLocation(
          user.city_id,
          user.baranggay_id,
          token
        );

        // Find the specific election that matches our electionId
        const matchingElection = locationData.find(
          (election) => election._id === electionId
        );

        // Set candidates
        const electionCandidates = matchingElection
          ? matchingElection.candidates
          : electionData.candidates || [];
        setCandidates(electionCandidates);
        setFilteredCandidates(electionCandidates); // Initialize filteredCandidates
        console.log("Candidates:", electionCandidates); // Debug

        // Fetch voting status
        const votingStatus = await fetchVotingStatus(
          user.id,
          electionId,
          token
        );
        setHasVoted(votingStatus.hasVoted);
        setSelectedCandidate(votingStatus.voteDetails?.candidate_id || null);
      } catch (err) {
        console.error("Error fetching election details:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (electionId) {
      fetchElectionDetails();
    }
  }, [electionId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query || query.trim() === "") {
      setFilteredCandidates(candidates); // Show all candidates
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = candidates.filter((candidate) =>
        candidate.name?.toLowerCase().startsWith(lowerQuery)
      );
      setFilteredCandidates(filtered);
      console.log("Search query:", lowerQuery, "Filtered:", filtered); // Debug
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../../../../assets/images/electionImages/back.png")}
                style={styles.backImage}
              />
            </TouchableOpacity>
            <Text style={styles.subHeaderText}>
              {election?.name || "Election Details"}
            </Text>
            <View style={styles.phasesContainer}>
              <View style={styles.phaseOne} />
              <View>
                <View style={styles.phaseTwo} />
                <View style={styles.subPhaseOne}>
                  <Text style={styles.subPhaseTwoText}>
                    Select a candidate to vote
                  </Text>
                </View>
              </View>
              <View style={styles.phaseThree} />
            </View>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.searchContainer}>
              <Image
                source={require("../../../../assets/images/search.png")}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search for a candidate"
                style={styles.inputSearch}
                value={searchQuery}
                onChangeText={handleSearch}
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>
      </View>
      <VoteList
        votes={filteredCandidates}
        electionId={electionId}
        electionName={election?.name}
        hasVoted={hasVoted}
        selectedCandidate={selectedCandidate}
        onVote={(candidateId) => {
          console.log(`Voted for candidate ID: ${candidateId}`);
          setHasVoted(true);
          setSelectedCandidate(candidateId);
        }}
      />
      {filteredCandidates.length === 0 && searchQuery && (
        <Text style={styles.noResults}>No candidates found</Text>
      )}
    </View>
  );
};

export default ElectionDetails;