import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../pages/onboarding/OnBoarding";
import Login from "../pages/auth/Login";
import WelcomeScreen from "../pages/auth/WelcomeScreen";
import Register from "../pages/auth/Register";
import Home from "../pages/dashboards/Home";
import ElectionDetails from "../pages/election/phase2/ElectionDetails";
import Results from "../pages/results/Results";
import DashboardScreen from "../pages/dashboardScreen/DashboardScreen";
import ViewCandidate from "../pages/election/phase1/ViewCandidate";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="OnBoarding">
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard Screen"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginNew"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpNew"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Election Details"
        component={ElectionDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View Candidate"
        component={ViewCandidate}
        options= {{ headerShown: false }}
      />
      <Stack.Screen
        name="Results"
        component={Results}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
