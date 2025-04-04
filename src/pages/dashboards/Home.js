import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../../config/ApiConfig";
import { homeStyles as styles } from "../../styles/HomeStyles";
import VoteCounter from "./components/VoteCounter";
import QuickAccess from "./components/QuickAccess";
import OngoingElections from "./components/OngoingElections";
import { fetchElections } from "../../services/elections";

const Home = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [elections, setElections] = useState([]);
  const [user, setUser] = useState(null);
  const [voteCount, setVoteCount] = useState(0);
  const [totalElections, setTotalElections] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user?.city_id && user?.baranggay_id) {
      fetchElectionsData(user.city_id, user.baranggay_id);
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
        setVoteCount(parsedData.voted_elections?.length || 0);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchElectionsData = async (cityId, barangayId) => {
    try {
      const combinedElections = await fetchElections(cityId, barangayId);
      setElections(combinedElections);
      setTotalElections(combinedElections.length);
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  useEffect(() => {
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(now.toLocaleDateString("en-US", options));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.date}>{currentDate}</Text>
        <Text style={styles.greetingsText}>Hello, {user?.first_name}!</Text>
        <VoteCounter voteCount={voteCount} totalElections={totalElections} />
      </View>
      <View style={styles.searchContainer}>
        <Image source={require("../../../assets/images/search.png")} style={styles.searchIcon} />
        <TextInput placeholder="Search for a candidate" style={styles.inputSearch} />
      </View>
      <QuickAccess />
      <OngoingElections elections={elections} navigation={navigation} />
    </View>
  );
};

export default Home;
