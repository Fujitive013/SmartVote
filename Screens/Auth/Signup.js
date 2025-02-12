import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigation = useNavigation();

    const API_URL = "https://smart-vote-backend.vercel.app";

    const handleSignUp = async () => {
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });

            if (response.status === 201) {
                Alert.alert("Success", "Account created successfully!");
                navigation.navigate("Login");
            }
        } catch (error) {
            console.error(
                "Signup Error:",
                error.response?.data || error.message
            );
            Alert.alert(
                "Error",
                error.response?.data?.message ||
                    "Signup failed. Please try again."
            );
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/icon.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.appName}>SmartVote</Text>
                </View>

                <View style={styles.signUpCard}>
                    {[
                        "First Name",
                        "Last Name",
                        "Email",
                        "Password",
                        "Confirm Password",
                    ].map((label, index) => (
                        <View key={index}>
                            <Text style={styles.label}>{label}</Text>
                            <TextInput
                                placeholder={label}
                                style={styles.input}
                                value={
                                    label === "First Name"
                                        ? firstName
                                        : label === "Last Name"
                                        ? lastName
                                        : label === "Email"
                                        ? email
                                        : label === "Password"
                                        ? password
                                        : confirmPassword
                                }
                                onChangeText={
                                    label === "First Name"
                                        ? setFirstName
                                        : label === "Last Name"
                                        ? setLastName
                                        : label === "Email"
                                        ? setEmail
                                        : label === "Password"
                                        ? setPassword
                                        : setConfirmPassword
                                }
                                secureTextEntry={label.includes("Password")}
                                keyboardType={
                                    label === "Email"
                                        ? "email-address"
                                        : "default"
                                }
                                autoCapitalize={
                                    label === "Email" ? "none" : "words"
                                }
                            />
                        </View>
                    ))}

                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons
                                name="arrow-back-outline"
                                size={20}
                                color="#333"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(
                                    "Info",
                                    "Feature under development."
                                )
                            }
                        >
                            <Text style={styles.guestText}>View Results</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    scrollContainer: {
        alignItems: "center",
        paddingVertical: 30,
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
    logo: {
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
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        height: 50,
        borderBottomWidth: 2,
        borderColor: "#007bff",
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    signUpButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    iconButton: {
        backgroundColor: "#f0f0f0",
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
