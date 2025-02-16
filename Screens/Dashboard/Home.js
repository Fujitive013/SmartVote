import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import Constants from "expo-constants";

const Home = () => {
    const navigation = useNavigation();
    const [elections, setElections] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_KEY = Constants.expoConfig?.extra?.API_KEY;
    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log("AsyncStorage cleared successfully!");
        } catch (error) {
            console.error("Error clearing AsyncStorage:", error);
        }
    };
    useEffect(() => {
        fetchElections();
        fetchUserData();
    }, []);

    const fetchElections = async () => {
        try {
            const response = await axios.get(`${API_KEY}/elections`);
            setElections(response.data);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    };

    const fetchUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            if (userData) {
                const parsedData = JSON.parse(userData);
                setUser(parsedData);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) return "Good Morning";
        if (currentHour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                onPress: async () => {
                    await AsyncStorage.removeItem("userData");
                    navigation.replace("Login");
                },
            },
        ]);
        clearStorage(); // remove this before deploying
    };

    const renderElectionItem = ({ item }) => (
        <TouchableOpacity
            style={styles.electionItem}
            onPress={() =>
                navigation.navigate("Election Details", {
                    electionId: item._id,
                })
            }
        >
            <View style={styles.electionContent}>
                <Text style={styles.electionName}>{item.name}</Text>
                <Text style={styles.electionDeadline}>
                    {`End: ${formatDate(item.end_date)}`}
                </Text>
            </View>
            <View style={styles.voteNowContainer}>
                <Text style={styles.voteNow}>Vote Now</Text>
                <Icon name="arrow-forward" size={20} color="#007bff" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.welcomeText}>Loading...</Text>
            ) : (
                <Text style={styles.welcomeText}>
                    {getGreeting()}, {user?.first_name}!
                </Text>
            )}

            <Text style={styles.sectionTitle}>Ongoing Elections</Text>
            {elections.length === 0 ? (
                <Text style={styles.noElectionsText}>
                    No ongoing elections available.
                </Text>
            ) : (
                <FlatList
                    data={elections}
                    renderItem={renderElectionItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.electionList}
                />
            )}

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    noElectionsText: {
        fontSize: 16,
        color: "#6c757d",
        textAlign: "center",
        marginTop: 20,
    },
    electionList: {
        paddingBottom: 20,
    },
    electionItem: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    electionContent: {
        flex: 1,
    },
    electionName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    electionDeadline: {
        fontSize: 14,
        color: "#6c757d",
    },
    voteNowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    voteNow: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007bff",
        marginRight: 5,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: "#dc3545",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    logoutText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
