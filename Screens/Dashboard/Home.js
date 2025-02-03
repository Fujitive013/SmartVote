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

const Home = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState("John Doe!");
    const [elections, setElections] = useState([
        // Replace with data fetched from the backend
        {
            id: "1",
            name: "Presidential Election 2025",
            deadline: "Jan 30, 2025",
        },
        { id: "2", name: "Local Council Election", deadline: "Feb 15, 2025" },
    ]);
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
                navigation.navigate("ElectionDetails", { electionId: item.id })
            }
        >
            <Text style={styles.electionName}>{item.name}</Text>
            <Text style={styles.electionDeadline}>
                Deadline: {item.deadline}
            </Text>
            <Text style={styles.voteNow}>Vote Now</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome back, {userName}!</Text>

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
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    electionList: {
        paddingBottom: 20,
    },
    electionItem: {
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    electionName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    electionDeadline: {
        fontSize: 14,
        color: "#6c757d",
    },
    voteNow: {
        fontSize: 14,
        color: "#007bff",
        marginTop: 5,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    logoutText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
