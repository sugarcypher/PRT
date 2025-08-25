import { Tabs } from "expo-router";
import { MessageSquare, History, GraduationCap } from "lucide-react-native";
import React from "react";
import Colors from "../../constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Evaluate",
          headerTitle: "T.H.I.N.K.",
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerTitle: "History",
          tabBarIcon: ({ color }) => <History size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: "Learn",
          headerTitle: "T.H.I.N.K. Education",
          tabBarIcon: ({ color }) => <GraduationCap size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}