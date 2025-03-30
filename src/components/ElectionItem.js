import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { homeStyles as styles } from '../styles/HomeStyles';

const ElectionItem = ({ item }) => {
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View style={styles.candidateContainer}>
      <TouchableOpacity
        style={styles.voteButton}
        onPress={() => navigation.navigate("Election Details", { electionId: item._id })}
      >
        <View style={styles.barangayCaptainContainer}>
          <Text style={styles.barangayCaptainText}>{item.name}</Text>
          <Text style={styles.barangayDateEnd}>{`End: ${formatDate(item.end_date)}`}</Text>
          <Image
            source={require("../../assets/images/voteImage/vote.png")}
            style={styles.voteImage}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ElectionItem;