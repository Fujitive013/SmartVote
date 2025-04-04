import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ElectionList from "../../../../components/ElectionList";
import { homeStyles as styles } from "../../../../styles/HomeStyles";

const OngoingElections = ({ elections, navigation }) => (
  <View>
    <View style={styles.ongoingElectionsContainer}>
      <Text style={styles.ongoingElectionsText}>Ongoing Elections</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("View Candidate", { elections })
        }
      >
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
    </View>
    <ElectionList elections={elections} emptyMessage="No ongoing elections available." />
  </View>
);

export default OngoingElections;
