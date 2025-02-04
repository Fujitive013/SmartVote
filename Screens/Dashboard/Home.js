import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Home = ({ route }) => {
    const navigation = useNavigation();
    const { userName } = route.params;
    const [elections, setElections] = useState([
        {
            id: "1",
            name: "Presidential Election 2025",
            deadline: "Jan 30, 2025",
        },
        {
            id: "2",
            name: "Local Barangay Election",
            deadline: "Feb 15, 2025",
        },
    ]);

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return "Good Morning";
        } else if (currentHour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log("AsyncStorage cleared successfully!");
        } catch (error) {
            console.error("Error clearing AsyncStorage:", error);
        }
    };

    //  logout function
    const handleLogout = () => {
        clearStorage(); // remove this before deploying
        Alert.alert("Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", onPress: () => navigation.replace("Login") },
        ]);
    };

    const renderElectionItem = ({ item }) => (
        <TouchableOpacity
            style={styles.electionItem}
            onPress={() =>
                navigation.navigate("Election Details", { electionId: item.id })
            }
        >
            <View style={styles.electionContent}>
                <Text style={styles.electionName}>{item.name}</Text>
                <Text style={styles.electionDeadline}>
                    Deadline: {item.deadline}
                </Text>
            </View>
            <View style={styles.voteNowContainer}>
                <Text style={styles.voteNow}>Vote Now</Text>
                <Icon name="arrow-forward" size={20} color="#007bff" />
            </View>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={require("../../assets/background.jpg")} // Add your background image
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.welcomeText}>
                    {getGreeting()}, {userName}!
                </Text>

                <Text style={styles.sectionTitle}>Ongoing Elections</Text>
                <FlatList
                    data={elections}
                    renderItem={renderElectionItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.electionList}
                />

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Home;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
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
        marginBottom: 5,
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
