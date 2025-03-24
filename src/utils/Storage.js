import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserData = async (user, token) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    await AsyncStorage.setItem("userToken", token);
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
