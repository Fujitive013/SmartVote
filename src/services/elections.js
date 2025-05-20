import { API_BASE_URL } from "../config/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchElectionsService = async (cityId, barangayId, filterType) => {
  let url = `${API_BASE_URL}/elections/getByLocation/${cityId}`;
  if (filterType === "barangay" && barangayId) {
    url += `/${barangayId}`;
  } else {
    url += `/null`;
  }

  const token = await AsyncStorage.getItem("token");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
};

export const fetchElections = async (cityId, barangayId) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const cityElectionsResponse = await fetch(
    `${API_BASE_URL}/elections/getByLocation/${cityId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const barangayElectionsResponse = await fetch(
    `${API_BASE_URL}/elections/getByLocation/${cityId}/${barangayId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!cityElectionsResponse.ok || !barangayElectionsResponse.ok) {
    throw new Error("Failed to fetch elections");
  }

  const cityElections = await cityElectionsResponse.json();
  const barangayElections = await barangayElectionsResponse.json();

  return [...cityElections, ...barangayElections];
};