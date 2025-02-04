import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    ImageBackground,
    ScrollView,
    Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ElectionDetails = ({ route }) => {
    const { electionId } = route.params;
    const [election, setElection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [voteCounts, setVoteCounts] = useState({});

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
                            name: "Maria Dela Cruz",
                            party: "Progressive Party",
                            image: require("../assets/user.png"),
                        },
                        {
                            id: "b2",
                            name: "Juan Dela Cruz",
                            party: "Liberty Party",
                            image: require("../assets/user.png"),
                        },
                    ],
                },
                2: {
                    id: "2",
                    name: "Local Barangay Election",
                    deadline: "Feb 15, 2025",
                    description: "Vote for your local Barangay Captain.",
                    candidates: [
                        {
                            id: "c3",
                            name: "Diana Penduko",
                            party: "Community First",
                            image: require("../assets/user.png"),
                        },
                        {
                            id: "d4",
                            name: "Pedro Penduko",
                            party: "People's Voice",
                            image: require("../assets/user.png"),
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
                <Text style={styles.loadingText}>
                    Loading election details...
                </Text>
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
            <ScrollView>
                {election.candidates.map((candidate) => (
                    <View key={candidate.id} style={styles.candidateItem}>
                        <Image
                            source={candidate.image}
                            style={styles.candidateImage}
                        />
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
            </ScrollView>
        </View>
    );
};

export default ElectionDetails;

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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#333",
        marginTop: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
        textAlign: "center",
    },
    deadline: {
        fontSize: 16,
        color: "#dc3545",
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: "#555",
        textAlign: "center",
    },
    candidateTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    candidateItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    candidateImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    candidateInfo: {
        flex: 1,
    },
    candidateName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    candidateParty: {
        fontSize: 14,
        color: "#6c757d",
        marginBottom: 5,
    },
    voteCountText: {
        fontSize: 14,
        color: "#28a745",
    },
    voteButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
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
