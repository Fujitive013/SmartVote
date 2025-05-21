import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { voteDetailsStyles as styles } from "../../../styles/voteDetailStyles";
import voteFlatList from "../../../styles/voteFlatList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getElectionDetails } from "../../../services/auth";
import { useNavigation } from "@react-navigation/native";

const VoteDetails = () => {
  const [votedElectionDetails, setVotedElectionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const intervalRef = useRef(null); // Ref to store interval ID

  // Handle hardware back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true; // Prevents default back navigation
      }
    );

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    // Clear the polling interval before navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Reset the ref
    }
    navigation.navigate("Dashboard Screen");
  };

  // Fetch election details and set up polling
  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted component

    const fetchVotedElectionDetails = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const token = await AsyncStorage.getItem("token");

        if (userData && token) {
          const parsedUserData = JSON.parse(userData);
          const votedElectionIds = parsedUserData?.voted_elections || [];

          const electionDetails = await Promise.all(
            votedElectionIds.map(async (id) => {
              try {
                const data = await getElectionDetails(id, token);
                return data;
              } catch (err) {
                console.log(
                  `Failed to fetch election with id: ${id}`,
                  err.message
                );
                return null; // Handle failed request gracefully
              }
            })
          );

          if (isMounted) {
            setVotedElectionDetails(electionDetails.filter((e) => e)); // Filter null values
          }
        }
      } catch (error) {
        console.error("Error fetching election details:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    fetchVotedElectionDetails();

    // Set up polling every 5 seconds
    intervalRef.current = setInterval(fetchVotedElectionDetails, 1000);

    // Cleanup interval on component unmount
    return () => {
      isMounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Reset the ref
      }
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require("../../../../assets/images/electionImages/back.png")}
                style={styles.backImage}
              />
            </TouchableOpacity>
            <Text style={styles.subHeaderText}>Confirmed Vote Elections</Text>
            <View style={styles.phasesContainer}>
              <View style={styles.phaseOne} />
              <View style={styles.phaseTwo} />
              <View>
                <View style={styles.phaseThree} />
                <View style={styles.subPhaseOne}>
                  <Text style={styles.subPhaseTwoText}>Confirmed Votes</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.mainContainer}>
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
      <FlatList
        data={votedElectionDetails}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={voteFlatList.container}>
            <View style={voteFlatList.subContainer}>
              <Text style={voteFlatList.nameText}>{item.name}</Text>
              <Text style={voteFlatList.descriptionText}>
                {item.description}
              </Text>
              <Text style={voteFlatList.candidateText}>Candidates:</Text>
              {item.candidates && item.candidates.length > 0 ? (
                item.candidates.map((candidate) => (
                  <View
                    key={candidate._id}
                    style={voteFlatList.candidateContainer}
                  >
                    <Text style={voteFlatList.labelText}>
                      Name: {candidate.name}
                    </Text>
                    <Text style={voteFlatList.labelText}>
                      Party: {candidate.party}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noVoteText}>
                  You haven't voted any candidate yet
                </Text>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You haven't voted in any election yet
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default VoteDetails;
