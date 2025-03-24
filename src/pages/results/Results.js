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

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            const elections = [
                {
                    id: "1",
                    name: "Presidential Election 2025",
                    candidates: [
                        { id: "a1", name: "Maria Dela Cruz" },
                        { id: "b2", name: "Juan Dela Cruz" },
                    ],
                },
                {
                    id: "2",
                    name: "Local Barangay Election",
                    candidates: [
                        { id: "c3", name: "Diana Penduko" },
                        { id: "d4", name: "Pedro Penduko" },
                    ],
                },
            ];

            const resultsData = [];

            for (const election of elections) {
                const storedVotes = await AsyncStorage.getItem(
                    `voteCounts_${election.id}`
                );
                const voteCounts = storedVotes ? JSON.parse(storedVotes) : {};

                const electionResults = {
                    name: election.name,
                    candidates: election.candidates.map((candidate) => ({
                        name: candidate.name,
                        votes: voteCounts[candidate.id] || 0,
                    })),
                };

                resultsData.push(electionResults);
            }

            setResults(resultsData);
            setLoading(false);
        };

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
            {results.map((election, index) => (
                <View key={index} style={styles.electionContainer}>
                    <Text style={styles.electionTitle}>{election.name}</Text>
                    {election.candidates.map((candidate, idx) => (
                        <View key={idx} style={styles.candidateItem}>
                            <Text style={styles.candidateName}>
                                {candidate.name}
                            </Text>
                            <Text style={styles.voteCount}>
                                {candidate.votes} votes
                            </Text>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

export default Results;

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
