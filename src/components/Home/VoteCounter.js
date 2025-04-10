import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { homeStyles as styles } from "../../styles/HomeStyles";

const VoteCounter = ({ voteCount, totalElections }) => (
  <View style={styles.voteCounterContainer}>
    <Text style={styles.voteText}>
      {voteCount === totalElections
        ? "You have voted in all ongoing elections."
        : "You haven't voted in some ongoing elections."}
    </Text>
    <View style={styles.countVote}>
      <Text style={styles.votedText}>{voteCount}</Text>
      <Text style={styles.overVotedText}> / {totalElections}</Text>
    </View>
    <TouchableOpacity style={styles.viewDetailsContainer}>
      <Text style={styles.detailsText}>View Details</Text>
    </TouchableOpacity>
  </View>
);

export default VoteCounter;
