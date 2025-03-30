import ElectionList from "../../../components/ElectionList";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { candidateStyles as styles } from "../../../styles/candidateStyles";
import { getUserData } from "../../../utils/Storage";
import React, { useState, useEffect } from "react";
import { fetchElectionsService } from "../../../services/elections";

const ViewCandidate = ({ route }) => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const { userCityId, userBarangayId } = route.params || {};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        setUserData(user);

        if (user) {
          await fetchElections("city");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      }
    };

    if (!userCityId || !userBarangayId) {
      fetchUserData();
    } else {
      fetchElections("city");
    }
  }, []); // Empty dependency array ensures this runs only once

  const fetchElections = async (filterType) => {
    try {
      const cityId = userCityId || userData.city_id;
      const barangayId = userBarangayId || userData.baranggay_id;
  
      const data = await fetchElectionsService(cityId, barangayId, filterType);
      setElections(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <Text style={styles.subHeaderText}> 2025 Ongoing Elections </Text>
            <View style={styles.phasesContainer}>
              <View>
                <View style={styles.phaseOne} />
                <View style={styles.subPhaseOne}>
                  <Text style={styles.subPhaseOneText}>
                    Select an going elections
                  </Text>
                </View>
              </View>
              <View style={styles.phaseTwo} />
              <View style={styles.phaseThree} />
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
          <View style={styles.filterLocation}>
            <TouchableOpacity
              style={styles.cityContainer}
              onPress={() => fetchElections("city")}
            >
              <Text style={styles.cityText}>City</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.barangayContainer}
              onPress={() => fetchElections("barangay")}
            >
              <Text style={styles.barangayText}>Barangay</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoElections}>
            {loading ? (
              <ActivityIndicator size="large" color="#c1c2c4" />
            ) : error ? (
              <Text style={styles.errorIndicator}>{error}</Text>
            ) : (
              <ElectionList elections={elections} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewCandidate;
