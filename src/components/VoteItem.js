import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { voteStyles as styles } from "../styles/voteStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/ApiConfig";

const VoteItem = ({
  item,
  electionId,
  electionName,
  onVote,
  hasVoted,
  selectedCandidate,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false); // State for success modal
  const [loading, setLoading] = useState(false); // State for loading during API call

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  const handleVote = async () => {
    setLoading(true); // Start loading
    setModalVisible(false); // Close the confirmation modal

    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("userData");
      const user = JSON.parse(userData);

      if (!token || !user) {
        Alert.alert("Error", "You are not authorized to vote. Please log in.");
        setLoading(false);
        return;
      }

      // Prepare the payload for the API
      const payload = {
        voter_id: user.id,
        voter_first_name: user.first_name,
        voter_last_name: user.last_name,
        election_id: electionId,
        election_name: electionName,
        candidate_id: item._id,
        candidate_name: item.name,
      };

      console.log("Submitting vote with payload:", payload);

      // Call the API to cast the vote
      const response = await fetch(`${API_BASE_URL}/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 201) {
        // Show the success modal
        setSuccessModalVisible(true);

        // Call the onVote callback to update the parent component
        onVote(item._id);

        // Navigate to Vote Details after a short delay
        setTimeout(() => {
          setSuccessModalVisible(false); // Close the success modal
          navigation.navigate("Election Details", {
            candidateId: item._id,
            electionId: electionId,
            electionName: electionName,
            candidateName: item.name,
            candidateParty: item.party,
          });
        }, 50000000000000); // Delay for 2 seconds
      } else if (response.status === 400) {
        Alert.alert(
          "Error",
          result.error || "You have already voted in this election."
        );
      } else {
        Alert.alert(
          "Error",
          result.error || "An error occurred while casting your vote."
        );
      }
    } catch (error) {
      console.error("Error during voting:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleVoteAgain = () => {
    navigation.navigate("Home")
  }

  return (
    <View style={styles.candidateContainer}>
      <View style={styles.candidateInfo}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>{getInitial(item.name)}</Text>
          </View>
        </View>

        <View style={styles.candidateSubContainer}>
          <Text style={styles.candidateText}>{item.name}</Text>
          <View style={styles.candidatePartyContainer}>
            <Text style={styles.candidateParty}>{item.party}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.voteNowButton,
          hasVoted ? styles.disabledButton : styles.activeButton, // Apply disabled style to all buttons if user has voted
        ]}
        onPress={() => setModalVisible(true)} // Show the confirmation modal
        disabled={hasVoted || loading} // Disable all buttons if user has voted
      >
        <Text style={styles.voteNowButtonText}>
          {loading ? "Submitting..." : "Vote Now"}
        </Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={require("../../assets/images/voteImage/warning.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>WARNING</Text>
            <Text style={styles.modalMessage}>
              Do you confirm to vote{" "}
              <Text style={styles.boldText}>{item.name}</Text> under{" "}
              <Text style={styles.boldText}>{item.party}</Text> as the{" "}
              <Text style={styles.boldText}>{electionName}</Text>?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={handleVote} // Handle "Yes" action
              >
                <Text style={styles.buttonText}>Yes, I confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setModalVisible(false)} // Close modal on "No"
              >
                <Text style={styles.buttonText}>No, take me back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <Image
              source={require("../../assets/images/voteImage/success.png")}
              style={styles.successModalImage}
            />
            <Text style={styles.successModalTitle}>CONGRATS</Text>
            <Text style={styles.successModalMessage}>
              You have successfully voted{" "}
              <Text style={styles.boldText}>{item.name}</Text> as the{" "}
              <Text style={styles.boldText}>{electionName}</Text>
            </Text>
            <TouchableOpacity style={styles.voteAgainButton} onPress={handleVoteAgain}>
              <Text style={styles.voteAgainText}>Vote Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VoteItem;
