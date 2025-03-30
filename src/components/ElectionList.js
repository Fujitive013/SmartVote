import React from 'react';
import { FlatList, View, Text } from 'react-native';
import ElectionItem from './ElectionItem';
import { homeStyles as styles } from '../styles/HomeStyles';

const ElectionList = ({ elections, emptyMessage = "No elections available" }) => {
  return (
    <FlatList
      data={elections}
      renderItem={({ item }) => <ElectionItem item={item} />}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.electionList}
      ListEmptyComponent={
        <Text style={styles.noElectionsText}>{emptyMessage}</Text>
      }
    />
  );
};

export default ElectionList;