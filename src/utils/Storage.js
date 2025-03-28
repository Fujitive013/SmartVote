import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserData = async (user, token) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    // Remove "Bearer " prefix before storing
    const rawToken = token.replace("Bearer ", "").trim();
    await AsyncStorage.setItem("token", rawToken);
    console.log("Data stored successfully");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const getUserData = async () => {
  try {
    const user = await AsyncStorage.getItem("userData");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};
