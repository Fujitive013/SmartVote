import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { homeStyles as styles } from "../../styles/HomeStyles";
import VoteCounter from "../../components/Home/VoteCounter";
import QuickAccess from "../../components/Home/QuickAccess";
import OngoingElections from "../../components/Home/OngoingElections";
import { fetchElections } from "../../services/elections";
import getGreeting from "../../utils/greetings";
import formatCurrentDate from "../../utils/dateUtils";

const Home = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [elections, setElections] = useState([]);
    const [user, setUser] = useState(null);
    const [voteCount, setVoteCount] = useState(0);
    const [totalElections, setTotalElections] = useState(0);
    const navigation = useNavigation();
    const [filteredElections, setFilteredElections] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => true // Prevent default back navigation
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            await fetchUserData();
        };
        loadData();
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

            // ✅ Deduplicate elections by _id
            const uniqueElections = Array.from(
                new Map(combinedElections.map((e) => [e._id, e])).values()
            );

            setElections(uniqueElections);
            setFilteredElections(uniqueElections);
            setTotalElections(uniqueElections.length);
        } catch (error) {
            console.log("Error fetching elections:", error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredElections(elections);
        } else {
            const lowerQuery = query.toLowerCase();
            const filtered = elections.filter((election) =>
                election.name?.toLowerCase().startsWith(lowerQuery)
            );
            setFilteredElections(filtered);
        }
    };

    useEffect(() => {
        setCurrentDate(formatCurrentDate());
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.textWrapper}>
                    <Text style={styles.date}>{currentDate}</Text>
                    <Text style={styles.greetingsText}>
                        {getGreeting()}, {user?.first_name}!
                    </Text>
                </View>
                <VoteCounter
                    voteCount={voteCount}
                    totalElections={totalElections}
                />
            </View>

            <View style={styles.searchContainer}>
                <Image
                    source={require("../../../assets/images/search.png")}
                    style={styles.searchIcon}
                />
                <TextInput
                    placeholder="Search for ongoing elections"
                    style={styles.inputSearch}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    autoCapitalize="none"
                />
            </View>

            <QuickAccess />

            <OngoingElections
                elections={filteredElections}
                navigation={navigation}
                user={user}
            />
        </View>
    );
};

export default Home;
