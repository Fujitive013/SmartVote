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
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import axios from "axios"; // Make sure axios is installed

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();
    const API_KEY = Constants.expoConfig?.extra?.API_KEY;

    const handleSignUp = async () => {
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            // Make API request to register the user
            const response = await axios.post(`${API_KEY}/auth/register`, {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            });

            // Handle successful response
            if (response.status === 201) {
                Alert.alert("User created successfully!", "Please login.");
                navigation.navigate("Login"); // Redirect to login screen after successful signup
            }
        } catch (error) {
            // Handle error response
            console.error("Error during signup:", error);
            Alert.alert(
                "Error",
                "An error occurred while creating the account."
            );
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleViewResults = () => {
        Alert.alert("Error", "Under Construction.");
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
            <View style={styles.signUpCard}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    placeholder="First Name"
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    placeholder="Last Name"
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />
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
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={handleSignUp}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.signUpCardFooter}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBack}
                    >
                        <Ionicons
                            name="arrow-back-outline"
                            size={20}
                            color="#333"
                        />
                    </TouchableOpacity>
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

export default SignUp;

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
        width: 150,
        height: 150,
    },
    signUpCard: {
        width: "90%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: "relative",
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 0,
        color: "#333",
    },
    input: {
        fontSize: 20,
        height: 50,
        borderColor: "#007bff",
        borderBottomWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    signUpButton: {
        backgroundColor: "#007bff",
        marginTop: 15,
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    signUpCardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    backButton: {
        backgroundColor: "#f0f0f0",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    backText: {
        color: "#007bff",
        fontSize: 12,
        fontWeight: "bold",
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
