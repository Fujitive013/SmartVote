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