import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
} from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL =
    "https://1a375a1c-18b6-4b77-9e8a-41c734e72a13-00-2fwb4xgi46an6.pike.replit.dev";

const ElectionDetails = ({ route }) => {
    const navigation = useNavigation();
    const { electionId } = route.params;
    const [election, setElection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [user, setUser] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        fetchUserData();
        fetchElectionDetails();
    }, [electionId]);

    const fetchElectionDetails = async () => {
        setLoading(true);
        try {
            console.log("Fetching election details...");
            const response = await axios.get(
                `${API_BASE_URL}/elections/${electionId}`
            );
            console.log("Election data received:", response.data);

            // Fetch vote count for each candidate
            const candidatesWithVotes = await Promise.all(
                response.data.candidates.map(async (candidate) => {
                    const voteCountResponse = await axios.get(
                        `${API_BASE_URL}/votes/count/${candidate._id}`
                    );
                    return {
                        ...candidate,
                        voteCount: voteCountResponse.data.voteCount,
                    };
                })
            );

            setElection({
                ...response.data,
                candidates: candidatesWithVotes,
            });
        } catch (error) {
            console.error("Error fetching election details:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            if (userData) {
                const parsedData = JSON.parse(userData);
                setUser(parsedData);

                // Check if the user has already voted
                checkUserVote(parsedData.id);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const checkUserVote = async (voterId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/votes/check?voter_id=${voterId}&election_id=${electionId}`
            );
            if (response.data && response.data.hasVoted) {
                setHasVoted(true);
                setSelectedCandidate(response.data.candidate_id);
            }
        } catch (error) {
            console.error("Error checking vote status:", error);
        }
    };

    const handleVote = async (candidateName, candidateId) => {
        if (hasVoted) {
            Alert.alert("Error", "You have already voted in this election.");
            return;
        }

        if (!user || !election) {
            Alert.alert("Error", "User or election data is missing.");
            return;
        }

        const { first_name, last_name, id: voterId } = user;
        const { _id: electionId, name: electionName } = election;
        // Payload for submitting the vote
        const payload = {
            voter_id: voterId,
            voter_first_name: first_name,
            voter_last_name: last_name,
            election_id: electionId,
            election_name: electionName,
            candidate_id: candidateId,
            candidate_name: candidateName,
        };

        console.log("Submitting vote:", payload);

        try {
            const response = await axios.post(`${API_BASE_URL}/votes`, payload);

            if (response.status === 201) {
                // If the vote is successful, update the state and navigate to Home
                setHasVoted(true);
                setSelectedCandidate(candidateId);
                Alert.alert(
                    "Vote Successful",
                    `You voted for ${candidateName}`
                );
                navigation.navigate("Home");
            } else {
                Alert.alert(
                    "Error",
                    response.data.error || "Voting failed. Try again."
                );
            }
        } catch (error) {
            console.error("Error during voting:", error);
            Alert.alert(
                "Error",
                "There was an issue casting your vote. Try again."
            );
        }
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
            <Text style={styles.deadline}>
                Deadline: {new Date(election.end_date).toDateString()}
            </Text>
            <Text style={styles.description}>{election.description}</Text>

            <Text style={styles.candidateTitle}>Candidates:</Text>
            <ScrollView>
                {election.candidates && election.candidates.length > 0 ? (
                    election.candidates.map((candidate) => (
                        <View key={candidate._id} style={styles.candidateItem}>
                            <Image
                                source={require("../assets/user.png")}
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
                                    Votes: {candidate.voteCount || 0}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.voteButton,
                                    hasVoted
                                        ? styles.disabledButton
                                        : styles.activeButton,
                                ]}
                                onPress={() =>
                                    handleVote(candidate.name, candidate._id)
                                }
                                disabled={hasVoted}
                            >
                                <Text style={styles.voteButtonText}>
                                    {selectedCandidate === candidate._id
                                        ? "Voted"
                                        : "Vote"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noCandidatesText}>
                        No candidates available.
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

export default ElectionDetails;

const styles = StyleSheet.create({
    candidateInfo: { flex: 1, justifyContent: "center", marginRight: 10 },
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: { fontSize: 16, color: "#333", marginTop: 10 },
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
        justifyContent: "space-between",
        backgroundColor: "#fff",
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
    voteButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    activeButton: { backgroundColor: "#007bff" },
    disabledButton: { backgroundColor: "#ccc" },
    voteButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
    noCandidatesText: {
        textAlign: "center",
        fontSize: 16,
        color: "#777",
        marginTop: 20,
    },
});
