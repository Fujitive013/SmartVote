import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Results = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserData = async () => {
        try {
            const user = await AsyncStorage.getItem("userData");
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Error retrieving user data:", error);
            return null;
        }
    };

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            return token;
        } catch (error) {
            console.error("Error getting token:", error);
            return null;
        }
    };

    const fetchResults = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const user = await getUserData();

            if (!token || !user) {
                console.warn("Missing token or user data.");
                setLoading(false);
                return;
            }

            const { baranggay_id, city_id } = user;

            const electionsRes = await fetch("https://smart-vote-backend.vercel.app/elections", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const elections = await electionsRes.json();

            // ✅ Updated logic: include barangay-specific and city-wide elections
            const filteredElections = elections.filter(
                (e) =>
                    e.city_id === city_id &&
                    (e.baranggay_id === baranggay_id || e.baranggay_id === null || e.baranggay_id === undefined)
            );

            const resultsData = [];

            for (const election of filteredElections) {
                const res = await fetch(
                    `https://smart-vote-backend.vercel.app/elections/results/${election._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await res.json();

                resultsData.push({
                    name: election.name,
                    candidates: result.candidates || [],
                });
            }

            setResults(resultsData);
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Loading results...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Election Results</Text>
            {results.length === 0 ? (
                <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
                    No results available for your city and barangay.
                </Text>
            ) : (
                results.map((election, index) => (
                    <View key={index} style={styles.electionContainer}>
                        <Text style={styles.electionTitle}>{election.name}</Text>
                        {election.candidates.map((candidate, idx) => (
                            <View key={idx} style={styles.candidateItem}>
                                <Text style={styles.candidateName}>{candidate.name}</Text>
                                <Text style={styles.voteCount}>{candidate.votes} votes</Text>
                            </View>
                        ))}
                    </View>
                ))
            )}
        </ScrollView>
    );
};

export default Results;

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f4f6f9",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#1a1a2e",
    },
    electionContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    electionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#007bff",
    },
    candidateItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    candidateName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    voteCount: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#28a745",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f9",
    },
    loadingText: {
        fontSize: 16,
        color: "#333",
        marginTop: 10,
    },
});
