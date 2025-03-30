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

const ElectionDetails = ({ route }) => {
  const { electionId } = route.params || {};
  console.log("Election ID:", electionId);
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElectionDetails = async () => {
      try {
        if (!electionId) {
          throw new Error("Invalid election ID");
        }

        const token = await AsyncStorage.getItem("token"); // Retrieve the token from storage
        const response = await fetch(
          `${API_BASE_URL}/elections/${electionId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch election details");
        }
        const data = await response.json();
        setElection(data);
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
                <View style={styles.phaseTwo}/>
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
    </View>
  );
};

export default ElectionDetails;
