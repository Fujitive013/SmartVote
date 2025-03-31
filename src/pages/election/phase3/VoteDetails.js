import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { voteDetailsStyles as styles } from "../../../styles/voteDetailStyles";

const VoteDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <TouchableOpacity>
              <Image
                source={require("../../../../assets/images/electionImages/back.png")}
                style={styles.backImage}
              />
            </TouchableOpacity>
            <Text style={styles.subHeaderText}>Vote Confirmation</Text>
            <View style={styles.phasesContainer}>
              <View style={styles.phaseOne} />
              <View style={styles.phaseTwo} />
              <View>
                <View style={styles.phaseThree} />
                <View style={styles.subPhaseOne}>
                  <Text style={styles.subPhaseTwoText}>Confirm vote</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <Image
              source={require("../../../../assets/images/search.png")}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search for an ongoing election"
              style={styles.inputSearch}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default VoteDetails;
