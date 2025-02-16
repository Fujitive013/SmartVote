import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const API_KEY = Constants.expoConfig?.extra?.API_KEY; // Add a fallback API URL

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post(`${API_KEY}/auth/login`, {
                email,
                password,
            });

            console.log("Login response:", response.data);

            if (response.data?.message === "Login successful") {
                // Store only the user object
                await AsyncStorage.setItem(
                    "userData",
                    JSON.stringify(response.data.user)
                );

                Alert.alert("Success", "Login successful!");
                navigation.navigate("Home"); // Ensure "Home" exists in navigator
            } else {
                Alert.alert(
                    "Login failed",
                    response.data?.error || "Invalid credentials."
                );
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert(
                "Login failed",
                error.response?.data?.error || "An unexpected error occurred."
            );
        }
    };

    const handleSignUp = () => {
        navigation.navigate("SignUp");
    };

    const handleViewResults = () => {
        navigation.navigate("Results");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/icon.png")} // Ensure this file exists
                    style={styles.backgroundImage}
                    resizeMode="contain"
                />
                <Text style={styles.appName}>SmartVote</Text>
            </View>
            <View style={styles.loginCard}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="example@email.com"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={handleSignUp}
                >
                    <Text style={styles.signUpText}>
                        New User? Register Now
                    </Text>
                </TouchableOpacity>
                <View style={styles.loginCardFooter}>
                    <TouchableOpacity
                        style={styles.guestButton}
                        onPress={handleViewResults}
                    >
                        <Text style={styles.guestText}>View Results</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        paddingVertical: 10,
        paddingTop: "20%",
    },
    header: {
        alignItems: "center",
        marginBottom: 10,
    },
    appName: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: -10,
        color: "black",
    },
    backgroundImage: {
        width: 250,
        height: 250,
    },
    loginCard: {
        width: "90%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        fontSize: 16,
        height: 45,
        borderColor: "#007bff",
        borderBottomWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#007bff",
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    signUpButton: {
        marginTop: 15,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    signUpText: {
        color: "#007bff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginCardFooter: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
    },
    guestButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    guestText: {
        color: "#007bff",
        fontSize: 12,
        fontWeight: "bold",
    },
});
