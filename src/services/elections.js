import { API_BASE_URL } from "../config/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchElections = async (cityId, barangayId) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  console.log("Fetching city elections from:", `${API_BASE_URL}/elections/getByLocation/${cityId}`);
  const cityElectionsResponse = await fetch(
    `${API_BASE_URL}/elections/getByLocation/${cityId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log("Fetching barangay elections from:", `${API_BASE_URL}/elections/getByLocation/${cityId}/${barangayId}`);
  const barangayElectionsResponse = await fetch(
    `${API_BASE_URL}/elections/getByLocation/${cityId}/${barangayId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!cityElectionsResponse.ok) {
    console.error("City elections response:", cityElectionsResponse.status, await cityElectionsResponse.text());
    throw new Error(`Failed to fetch city elections: ${cityElectionsResponse.status}`);
  }

  if (!barangayElectionsResponse.ok) {
    console.error("Barangay elections response:", barangayElectionsResponse.status, await barangayElectionsResponse.text());
    throw new Error(`Failed to fetch barangay elections: ${barangayElectionsResponse.status}`);
  }

  const cityElections = await cityElectionsResponse.json();
  const barangayElections = await barangayElectionsResponse.json();

  console.log("City elections data:", cityElections);
  console.log("Barangay elections data:", barangayElections);

  return [...cityElections, ...barangayElections];
};