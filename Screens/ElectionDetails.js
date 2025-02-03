import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ElectionDetails = ({ route }) => {
    const { electionId } = route.params;
    const [election, setElection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [voteCounts, setVoteCounts] = useState({}); // Track vote counts for each candidate

    useEffect(() => {
        const fetchElectionDetails = async () => {
            setLoading(true);
            const electionData = {
                1: {
                    id: "1",
                    name: "Presidential Election 2025",
                    deadline: "Jan 30, 2025",
                    description: "Vote for the next President.",
                    candidates: [
                        {
                            id: "a1",
                            name: "John Smith",
                            party: "Progressive Party",
                        },
                        {
                            id: "b2",
                            name: "Sarah Johnson",
                            party: "Liberty Party",
                        },
                    ],
                },
                2: {
                    id: "2",
                    name: "Local Council Election",
                    deadline: "Feb 15, 2025",
                    description: "Vote for your local council representative.",
                    candidates: [
                        {
                            id: "c3",
                            name: "Emily Davis",
                            party: "Community First",
                        },
                        {
                            id: "d4",
                            name: "Michael Brown",
                            party: "People's Voice",
                        },
                    ],
                },
            };

            const election = electionData[electionId] || null;
            setElection(election);
            setLoading(false);

            // Initialize mocked vote counts if no data exists in AsyncStorage
            if (election) {
                const savedVoteCounts = await AsyncStorage.getItem(
                    `voteCounts_${electionId}`
                );
                if (!savedVoteCounts) {
                    const initialVoteCounts = {};
                    election.candidates.forEach((candidate, index) => {
                        // Mocked vote counts: First candidate gets 2 votes, second gets 3, etc.
                        initialVoteCounts[candidate.id] = index === 0 ? 2 : 3;
                    });
                    await AsyncStorage.setItem(
                        `voteCounts_${electionId}`,
                        JSON.stringify(initialVoteCounts)
                    );
                    setVoteCounts(initialVoteCounts);
                } else {
                    setVoteCounts(JSON.parse(savedVoteCounts));
                }
            }
        };

        fetchElectionDetails();
        loadVote(); // Load user's vote when the screen opens
    }, [electionId]);

    // Load saved vote from AsyncStorage
    const loadVote = async () => {
        try {
            const savedVote = await AsyncStorage.getItem(`vote_${electionId}`);
            if (savedVote) {
                setSelectedCandidate(JSON.parse(savedVote));
            }
        } catch (error) {
            console.error("Error loading vote:", error);
        }
    };

    // Save the vote to AsyncStorage
    const saveVote = async (candidate) => {
        try {
            await AsyncStorage.setItem(
                `vote_${electionId}`,
                JSON.stringify(candidate)
            );
            // Update vote count for the selected candidate
            const updatedVoteCounts = { ...voteCounts };
            updatedVoteCounts[candidate.id] =
                (updatedVoteCounts[candidate.id] || 0) + 1;
            setVoteCounts(updatedVoteCounts);
            await AsyncStorage.setItem(
                `voteCounts_${electionId}`,
                JSON.stringify(updatedVoteCounts)
            );
        } catch (error) {
            console.error("Error saving vote:", error);
        }
    };

    const handleVote = (candidate) => {
        if (selectedCandidate) {
            Alert.alert(
                "Already Voted",
                "You have already voted for a candidate."
            );
            return;
        }

        Alert.alert(
            "Confirm Vote",
            `Are you sure you want to vote for ${candidate.name}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Vote",
                    onPress: () => {
                        setSelectedCandidate(candidate);
                        saveVote(candidate); // Save the vote to AsyncStorage
                        Alert.alert(
                            "Vote Successful",
                            `You voted for ${candidate.name}.`
                        );
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text>Loading election details...</Text>
            </View>
        );
    }

    if (!election) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>
                    Election details not found.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{election.name}</Text>
            <Text style={styles.deadline}>Deadline: {election.deadline}</Text>
            <Text style={styles.description}>{election.description}</Text>

            <Text style={styles.candidateTitle}>Candidates:</Text>
            {election.candidates.map((candidate) => (
                <View key={candidate.id} style={styles.candidateItem}>
                    <View style={styles.candidateInfo}>
                        <Text style={styles.candidateName}>
                            {candidate.name}
                        </Text>
                        <Text style={styles.candidateParty}>
                            {candidate.party}
                        </Text>
                        <Text style={styles.voteCountText}>
                            Votes: {voteCounts[candidate.id] || 0}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.voteButton,
                            selectedCandidate
                                ? styles.disabledButton
                                : styles.activeButton,
                        ]}
                        onPress={() => handleVote(candidate)}
                        disabled={!!selectedCandidate}
                    >
                        <Text style={styles.voteButtonText}>
                            {selectedCandidate?.id === candidate.id
                                ? "Voted"
                                : "Vote"}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default ElectionDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    deadline: {
        fontSize: 16,
        color: "#dc3545",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 15,
    },
    candidateTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    candidateItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    candidateInfo: {
        flex: 1,
    },
    candidateName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    candidateParty: {
        fontSize: 14,
        color: "#6c757d",
    },
    voteCountText: {
        fontSize: 14,
        color: "#28a745",
    },
    voteButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    activeButton: {
        backgroundColor: "#007bff",
    },
    disabledButton: {
        backgroundColor: "#6c757d",
    },
    voteButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold",
    },
    errorText: {
        fontSize: 18,
        color: "#dc3545",
        textAlign: "center",
    },
});
