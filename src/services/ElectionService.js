import { API_BASE_URL } from "../config/ApiConfig";

export const fetchElectionDetailsById = async (electionId, token) => {
  const response = await fetch(`${API_BASE_URL}/elections/${electionId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch election details by electionId");
  }

  return response.json();
};

export const fetchElectionDetailsByLocation = async (
  cityId,
  baranggayId,
  token
) => {
  const locationUrl = baranggayId
    ? `${API_BASE_URL}/elections/getByLocation/${cityId}/${baranggayId}`
    : `${API_BASE_URL}/elections/getByLocation/${cityId}`;

  const response = await fetch(locationUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch election details by location");
  }

  return response.json();
};

export const fetchVotingStatus = async (userId, electionId, token) => {
  const response = await fetch(
    `${API_BASE_URL}/votes/status?voter_id=${userId}&election_id=${electionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch voting status");
  }

  return response.json();
};
