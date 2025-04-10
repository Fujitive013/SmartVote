import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import ElectionList from "../../components/ElectionList";
import { homeStyles as styles } from "../../styles/HomeStyles";

const { height, width } = Dimensions.get("window");

const OngoingElections = ({ elections, navigation, user }) => (
  <View>
    <View style={styles.ongoingElectionsContainer}>
      <Text style={styles.ongoingElectionsText}>Ongoing Elections</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("View Candidate", {
            elections,
            cityId: user?.city_id,
            barangayId: user?.baranggay_id,
          })
        }
      >
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
    </View>
    <View style={{ maxHeight: height * 0.21 }}>
      <ElectionList
        elections={elections}
        emptyMessage="No ongoing elections available."
      />
    </View>
  </View>
);

export default OngoingElections;
