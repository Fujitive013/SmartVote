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
import Constants from "expo-constants";

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
  const API_KEY = Constants.expoConfig?.extra?.API_KEY;

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

      const url = `${API_KEY}/elections/getByBaranggay/${myCityId}/${myBarangayId}`;
      console.log("Fetching elections from:", url); // Debugging: Log the URL

      const response = await axios.get(url);

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
      if (userData) {
        const parsedData = JSON.parse(userData);
        console.log("User Data:", parsedData);
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

  //for candidate ni nga date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  const renderElectionItem = ({ item }) => (
    <View style={styles.candidateContainer}>
      <View style={styles.barangayCaptainContainer}>
        <Text style={styles.barangayCaptainText}>{item.name}</Text>
        <Text style={styles.barangayDateEnd}>{`End: ${formatDate(
          item.end_date
        )}`}</Text>
        <TouchableOpacity
          style={styles.voteButton}
          onPress={() =>
            navigation.navigate("Election Details", { electionId: item._id })
          }
        >
          <Text style={styles.voteNowText}>Vote Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          placeholder="Search a candidate..."
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
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ maxHeight: height * 0.28 }}>
        {filteredElections.length === 0 ? (
          <Text style={styles.noElectionsText}>
            No ongoing elections available for your barangay.
          </Text>
        ) : (
          <FlatList
            data={filteredElections}
            renderItem={renderElectionItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.electionList}
          />
        )}
      </View>
    </View>
  );
};

export default HomeNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DBDEF1",
    alignItems: "center",
  },
  subContainer: {
    backgroundColor: "#111B56",
    width: width * 1,
    height: height * 0.4,
    borderBottomLeftRadius: height * 0.05,
    borderBottomRightRadius: height * 0.05,
    alignItems: "center",
  },
  subSaharanContainer: {
    width: width * 0.9,
    top: height * 0.05,
  },
  date: {
    color: "#BFBFBF",
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
  },
  greetingsText: {
    color: "#FFF",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
  },
  voteCounterContainer: {
    backgroundColor: "#FFF",
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 15,
    position: "absolute",
    top: height * 0.14,
  },
  voteText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13.5,
    padding: height * 0.02,
  },
  countVote: {
    bottom: height * 0.02,
    flexDirection: "row",
    paddingLeft: height * 0.02,
    alignItems: "baseline",
  },
  votedText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 40,
  },
  overVotedText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 25,
    color: "#757575",
  },
  viewDetailsContainer: {
    bottom: height * 0.02,
  },
  detailsText: {
    fontFamily: "Montserrat-Bold",
    paddingLeft: height * 0.02,
    color: "#111B56",
    textDecorationLine: "underline",
    textDecorationColor: "#111B56",
  },
  searchContainer: {
    flexDirection: "row",
    width: width * 0.9,
    height: height * 0.07,
    bottom: height * 0.045,
    borderRadius: 6,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
    paddingLeft: height * 0.02,
  },
  searchIcon: {
    width: width * 0.07,
    height: height * 0.035,
    alignSelf: "center",
  },
  inputSearch: {
    fontFamily: "Montserrat-Regular",
    width: width * 1,
    paddingLeft: height * 0.02,
    fontSize: 16,
  },
  quickAccessContainer: {
    alignSelf: "flex-start",
    paddingLeft: height * 0.02,
  },
  quickAccessText: {
    fontFamily: "Montserrat-Bold",
    paddingLeft: height * 0.005,
  },
  subQuickAccessContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensures space between items
    width: width * 0.9,
    marginTop: height * 0.02,
    paddingLeft: height * 0.005,
  },
  resultContainer: {
    backgroundColor: "#FFF",
    width: width * 0.43,
    height: height * 0.1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: height * 0.01,
  },
  subResultContainer: {
    justifyContent: "center",
  },
  imageContainer: {
    backgroundColor: "#E8EAF6",
    width: width * 0.12,
    height: height * 0.06,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: height * 0.01,
  },
  resultText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  viewResultText: {
    fontFamily: "Montserrat-Medium",
  },
  monitorContainer: {
    backgroundColor: "#FFF",
    width: width * 0.43,
    height: height * 0.1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: height * 0.01,
  },
  subMonitorContainer: {
    justifyContent: "center",
  },
  monitorText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  checkVotesText: {
    fontFamily: "Montserrat-Medium",
  },
  ongoingElectionsContainer: {
    alignSelf: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: height * 0.02,
    top: height * 0.02,
    width: width * 0.9,
    alignItems: "baseline",
    marginBottom: height * 0.04,
  },
  ongoingElectionsText: {
    fontFamily: "Montserrat-Bold",
    paddingLeft: height * 0.005,
  },
  viewAllText: {
    fontFamily: "Montserrat-Bold",
    color: "#4B515D",
    fontSize: 12,
  },
  barangayCaptainContainer: {
    backgroundColor: "#FFF",
    width: width * 0.9,
    height: height * 0.18,
    paddingLeft: height * 0.02,
    borderRadius: 6,
    marginBottom: height * 0.02,
  },
  barangayCaptainText: {
    fontFamily: "Montserrat-Bold",
    top: height * 0.02,
  },
  barangayDateEnd: {
    fontFamily: "Montserrat-Regular",
    top: height * 0.04,
  },
  voteButton: {
    top: height * 0.06,
  },
  voteNowText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 17,
    color: "#111B56",
    textDecorationLine: "underline",
  },
  noElectionsText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 20,
  },
});
