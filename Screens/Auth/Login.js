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
import axios from "axios";

const API_KEY =
    "https://1a375a1c-18b6-4b77-9e8a-41c734e72a13-00-2fwb4xgi46an6.pike.replit.dev";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleLogin = async () => {
        // if no email or password is provided
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        try {
            // make a POST request to the server
            const response = await axios.post(`${API_KEY}/auth/login`, {
                email,
                password,
            });
            // if the response is successful, save the user data in the async storage
            if (response?.data?.message === "Login successful") {
                await AsyncStorage.setItem(
                    "userData",
                    JSON.stringify(response?.data?.user)
                );
                Alert.alert("Success", "Login successful!");
                navigation.navigate("Home");
            } else {
                Alert.alert(
                    "Login failed",
                    response?.data?.error || "Invalid credentials."
                );
            }
            // if an error occurs, show an alert
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert(
                "Login failed",
                error.response?.data?.error || "An unexpected error occurred."
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/icon.png")}
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
                    onPress={() => navigation.navigate("SignUp")}
                >
                    <Text style={styles.signUpText}>
                        New User? Register Now
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.guestButton}
                    onPress={() => navigation.navigate("Results")}
                >
                    <Text style={styles.guestText}>View Results</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        paddingTop: "20%",
    },
    header: {
        alignItems: "center",
        marginBottom: 10,
    },
    appName: {
        fontSize: 30,
        fontWeight: "bold",
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
        borderBottomWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderColor: "#007bff",
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
        alignItems: "center",
    },
    signUpText: {
        color: "#007bff",
        fontSize: 16,
        fontWeight: "bold",
    },
    guestButton: {
        marginTop: 20,
        alignItems: "center",
    },
    guestText: {
        color: "#007bff",
        fontSize: 12,
        fontWeight: "bold",
    },
});
