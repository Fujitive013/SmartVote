import VoteList from "../../../components/VoteList";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { electionDetailsStyles as styles } from "../../../styles/electionDetails";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../config/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "../../../utils/Storage";

const ElectionDetails = ({ route }) => {
  const { electionId } = route.params || {};
  console.log("Election ID:", electionId);
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchElectionDetails = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const user = await getUserData();
        if (!user || !user.city_id || !user.baranggay_id) {
          console.error("User data is incomplete or missing");
          return;
        }

        // Fetch election details by electionId first
        const electionResponse = await fetch(
          `${API_BASE_URL}/elections/${electionId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!electionResponse.ok) {
          throw new Error("Failed to fetch election details by electionId");
        }

        const electionData = await electionResponse.json();
        setElection(electionData);

        // Use the election data to determine if it's city or barangay level
        const locationUrl = electionData.baranggay_id
          ? `${API_BASE_URL}/elections/getByLocation/${user.city_id}/${user.baranggay_id}`
          : `${API_BASE_URL}/elections/getByLocation/${user.city_id}`;

        const locationResponse = await fetch(locationUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!locationResponse.ok) {
          throw new Error("Failed to fetch election details by location");
        }

        const locationData = await locationResponse.json();

        // Find the specific election that matches our electionId
        const matchingElection = locationData.find(
          (election) => election._id === electionId
        );

        // Set candidates from the matching election
        setCandidates(matchingElection ? matchingElection.candidates : []);

        // If no matching election was found, we could fall back to the candidates from electionData
        if (!matchingElection && electionData.candidates) {
          setCandidates(electionData.candidates);
        }
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
            <TouchableOpacity>
              <Image
                source={require("../../../../assets/images/electionImages/back.png")}
                style={styles.backImage}
              />
            </TouchableOpacity>
            <Text style={styles.subHeaderText}>
              {" "}
              {election?.name || "Election Details"}{" "}
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
          <View style={styles.searchContainer}>
            <Image
              source={require("../../../../assets/images/search.png")}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search for an ongoing election"
              style={styles.inputSearch}
            />
          </View>
        </View>
      </View>
      <VoteList
        votes={candidates}
        onVote={(candidateId) =>
          console.log(`Voted for candidate ID: ${candidateId}`)
        }
      />
    </View>
  );
};

export default ElectionDetails;
