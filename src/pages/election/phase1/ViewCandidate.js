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

const ViewCandidate = ({ route, cityId, barangayId }) => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("city");

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

    // Use cityId and barangayId from props, route.params, or userData
    if (!cityId && !barangayId && (!userCityId || !userBarangayId)) {
      fetchUserData();
    } else {
      fetchElections("city");
    }
  }, [cityId, barangayId, userCityId, userBarangayId]);

  const fetchElections = async (filterType) => {
    try {
      setLoading(true); // Start loading
      setSelectedFilter(filterType); // Update the selected filter

      // Prioritize cityId and barangayId from props, then route.params, then userData
      const finalCityId = cityId || userCityId || userData?.city_id;
      const finalBarangayId =
        barangayId || userBarangayId || userData?.baranggay_id;

      if (!finalCityId || !finalBarangayId) {
        throw new Error("City ID or Barangay ID is missing.");
      }

      const data = await fetchElectionsService(
        finalCityId,
        finalBarangayId,
        filterType
      );
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
              style={[
                styles.cityContainer,
                selectedFilter === "city" && styles.selectedButton, // Apply selected style if "City" is selected
              ]}
              onPress={() => fetchElections("city")}
            >
              <Text
                style={[
                  styles.cityText,
                  selectedFilter === "city" && styles.selectedText, // Apply selected text style
                ]}
              >
                City
              </Text>
            </TouchableOpacity>

            {/* Barangay Button */}
            <TouchableOpacity
              style={[
                styles.barangayContainer,
                selectedFilter === "barangay" && styles.selectedButton, // Apply selected style if "Barangay" is selected
              ]}
              onPress={() => fetchElections("barangay")}
            >
              <Text
                style={[
                  styles.barangayText,
                  selectedFilter === "barangay" && styles.selectedText, // Apply selected text style
                ]}
              >
                Barangay
              </Text>
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
