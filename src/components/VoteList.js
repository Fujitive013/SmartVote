import React from "react";
import { FlatList, View, Text } from "react-native";
import VoteItem from "./VoteItem";
import { homeStyles as styles } from "../styles/HomeStyles";

const VoteList = ({
  votes,
  onVote,
  electionId,
  electionName,
  hasVoted, // Receive hasVoted prop
  selectedCandidate,
  emptyMessage = "No votes available",
}) => {
  return (
    <FlatList
      data={votes}
      renderItem={({ item }) => (
        <VoteItem
          item={item}
          onVote={onVote}
          electionId={electionId}
          electionName={electionName}
          hasVoted={hasVoted} // Pass hasVoted to VoteItem
          selectedCandidate={selectedCandidate} // Pass selectedCandidate to VoteItem
        />
      )}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.electionList}
      ListEmptyComponent={
        <Text style={styles.noElectionsText}>{emptyMessage}</Text>
      }
    />
  );
};

export default VoteList;
