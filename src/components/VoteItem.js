import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { voteStyles as styles } from "../styles/voteStyles";

const VoteItem = ({ item }) => {
  const navigation = useNavigation();

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

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
        style={styles.voteNowButton}
        onPress={() =>
          navigation.navigate("Vote Details", { voteId: item._id })
        }
      >
        <Text style={styles.voteNowButtonText}>Vote Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoteItem;
