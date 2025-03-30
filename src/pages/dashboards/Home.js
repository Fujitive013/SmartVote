import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../../config/ApiConfig";
import { homeStyles as styles } from "../../styles/HomeStyles";
import ElectionList from "../../components/ElectionList";

const { width, height } = Dimensions.get("window");

const HomeNew = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [elections, setElections] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myCityId, setMyCityId] = useState(null);
  const [myBarangayId, setMyBarangayId] = useState(null);
  const [voteCount, setVoteCount] = useState(0);
  const [totalElections, setTotalElections] = useState(0);
  const navigation = useNavigation();

  // Filter elections by user's barangay and city and exclude already voted ones
  const filteredElections = elections.filter((election) => {
    const isUserArea =
      election.city_id === myCityId && election.baranggay_id === myBarangayId;

    // Convert ObjectIDs to strings for comparison
    const hasVoted = user?.voted_elections?.some(
      (votedId) => String(votedId) === String(election._id)
    );

    console.log(
      `Election: ${election.name}, ID: ${election._id}, hasVoted: ${hasVoted}`
    );

    // For the vote count display, we want ALL elections in the user's area
    return isUserArea;
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (myCityId && myBarangayId) {
      fetchElections();
    }
  }, [myCityId, myBarangayId]);

  const fetchElections = async () => {
    try {
      if (!myCityId || !myBarangayId) {
        console.error("City ID or Barangay ID is missing.");
        return;
      }

      const token = await AsyncStorage.getItem("token");
      console.log("Raw token from storage:", token); // Debug

      if (!token) {
        console.error("No token found");
        return;
      }

      const url = `${API_BASE_URL}/elections/getByLocation/${myCityId}/${myBarangayId}`;
      console.log("Fetching elections from:", url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer prefix here
        },
      });

      const electionsData = response.data;
      setElections(electionsData);
      setTotalElections(electionsData.length);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.log("Elections not found for the given city and barangay.");
        } else {
          console.error(
            "Server error:",
            error.response.status,
            error.response.data
          );
        }
      } else if (error.request) {
        // No response received
        console.error(
          "No response from the server. Check your network connection."
        );
      } else {
        // Something went wrong in setting up the request
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  // In your HomeNew.js component, modify the fetchUserData function:
  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const token = await AsyncStorage.getItem("token"); // Get token first
      console.log("Token from storage:", token);
      if (userData) {
        const parsedData = JSON.parse(userData);
        console.log("User Data:", parsedData);
        console.log("Token:", token); // Debugging
        setUser(parsedData);
        setMyCityId(parsedData.city_id);
        setMyBarangayId(parsedData.baranggay_id);

        // Debugging - log the voted_elections array
        console.log("Voted Elections:", parsedData.voted_elections);

        // Make sure voted_elections is getting processed correctly
        if (
          parsedData.voted_elections &&
          Array.isArray(parsedData.voted_elections)
        ) {
          console.log(
            "Vote count should be:",
            parsedData.voted_elections.length
          );
          setVoteCount(parsedData.voted_elections.length);
        } else {
          console.log("voted_elections is not an array or doesn't exist");
          setVoteCount(0);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Manila",
        weekday: "long", // Thursday
        year: "numeric",
        month: "long", // March
        day: "numeric", // 20
      };

      const formattedDate = now.toLocaleDateString("en-US", options);
      const [weekday, date] = formattedDate.split(", "); // Split weekday and date
      setCurrentDate(`${weekday} | ${date}`);
    };

    updateDate();
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.subSaharanContainer}>
          <Text style={styles.date}>{currentDate}</Text>
          <Text style={styles.greetingsText}>
            {getGreeting()}, {user?.first_name}!
          </Text>
        </View>
        <View style={styles.voteCounterContainer}>
          <Text style={styles.voteText}>
            {voteCount === totalElections
              ? "You have already cast a vote for these ongoing elections:"
              : "Looks like you haven't cast a vote for these ongoing elections."}
          </Text>

          <View style={styles.countVote}>
            <Text style={styles.votedText}>{voteCount}</Text>
            <Text style={styles.overVotedText}> / {totalElections}</Text>
          </View>
          <TouchableOpacity style={styles.viewDetailsContainer}>
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../../assets/images/search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for a candidate"
          style={styles.inputSearch}
        />
      </View>
      <View style={styles.quickAccessContainer}>
        <Text style={styles.quickAccessText}>Quick Access</Text>
        <View style={styles.subQuickAccessContainer}>
          <TouchableOpacity style={styles.resultContainer}>
            <Image
              source={require("../../../assets/images/trending.png")}
              style={styles.imageContainer}
            />
            <View style={styles.subResultContainer}>
              <Text style={styles.resultText}>Result</Text>
              <Text style={styles.viewResultText}>View Result</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorContainer}>
            <Image
              source={require("../../../assets/images/monitor.png")}
              style={styles.imageContainer}
            />
            <View style={styles.subMonitorContainer}>
              <Text style={styles.monitorText}>Monitor</Text>
              <Text style={styles.checkVotesText}>Check votes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ongoingElectionsContainer}>
        <Text style={styles.ongoingElectionsText}>Ongoing Elections</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("View Candidate", {
              elections: filteredElections,
              userCityId: myCityId,
              userBarangayId: myBarangayId,
            })
          }
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ maxHeight: height * 0.28 }}>
        {filteredElections.length === 0 ? (
          <Text style={styles.noElectionsText}>
            No ongoing elections available for your barangay.
          </Text>
        ) : (
          <ElectionList
            elections={filteredElections}
            emptyMessage="No ongoing elections available for your barangay."
          />
        )}
      </View>
    </View>
  );
};

export default HomeNew;
