import ElectionList from "../../../components/ElectionList";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { candidateStyles as styles } from "../../../styles/candidateStyles";
import { getUserData } from "../../../utils/Storage";
import React, { useState, useEffect } from "react";
import { fetchElectionsService } from "../../../services/elections";
import LoadingScreen from "../../../components/LoadingScreen";

const ViewCandidate = ({
  route,
  navigation,
  cityId: propsCityId,
  barangayId: propsBarangayId,
}) => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("city");
  const [filteredElections, setFilteredElections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Get cityId and barangayId from either props or route.params
  const routeParams = route?.params || {};
  const cityId = propsCityId || routeParams.cityId;
  const barangayId = propsBarangayId || routeParams.barangayId;

  useEffect(() => {
    console.log("✅ Received cityId:", cityId);
    console.log("✅ Received barangayId:", barangayId);
  }, [cityId, barangayId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        setUserData(user);

        if (user) {
          await fetchElectionsData("city", user.city_id, user.baranggay_id);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      }
    };

    if (!cityId && !barangayId) {
      fetchUserData();
    } else {
      fetchElectionsData("city", cityId, barangayId);
    }
  }, [cityId, barangayId]);

  const fetchElectionsData = async (
    filterType,
    finalCityId,
    finalBarangayId
  ) => {
    try {
      setLoading(true);
      setSelectedFilter(filterType);

      if (!finalCityId) {
        throw new Error("City ID is missing.");
      }

      const data = await fetchElectionsService(
        finalCityId,
        filterType === "barangay" ? finalBarangayId : null,
        filterType
      );

      setElections(data);
      setFilteredElections(data);
    } catch (err) {
      console.error("Election fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredElections(elections);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = elections.filter((election) =>
        election.name?.toLowerCase().startsWith(lowerQuery)
      );
      setFilteredElections(filtered);
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
          <View style={styles.mainContainer}>
            <View style={styles.searchContainer}>
              <Image
                source={require("../../../../assets/images/search.png")}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search for an ongoing election"
                style={styles.inputSearch}
                value={searchQuery}
                onChangeText={handleSearch}
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.filterLocation}>
            <TouchableOpacity
              style={[
                styles.cityContainer,
                selectedFilter === "city" && styles.selectedButton, // Apply selected style if "City" is selected
              ]}
              onPress={() => fetchElectionsData("city", cityId, barangayId)}
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
              onPress={() => fetchElectionsData("barangay", cityId, barangayId)}
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
              <LoadingScreen />
            ) : error ? (
              <Text style={styles.errorIndicator}>{error}</Text>
            ) : (
              <View style={{ maxHeight: 350 }}>
                <ElectionList elections={filteredElections} />
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewCandidate;
