import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./Screens/OnBoarding";
import Login from "./Screens/Auth/Login";
import WelcomeScreen from "./Screens/Auth/WelcomeScreen"
import Register from "./Screens/Auth/Register";
import Home from "./Screens/Dashboard/Home";
import ElectionDetails from "./Screens/ElectionDetails";
import Results from "./Screens/Results";
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="OnBoarding">
                <Stack.Screen
                    name="OnBoarding"
                    component={OnBoarding}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="LoginNew"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="SignUpNew"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Election Details"
                    component={ElectionDetails}
                    options={{
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name="Results"
                    component={Results}
                    options={{
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
