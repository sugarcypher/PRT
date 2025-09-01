import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThinkProvider, useThink } from "../hooks/think-store";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

function AppContent() {
  const { appState, isLoading } = useThink();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
      
      // Navigate based on onboarding status
      if (!appState.hasCompletedOnboarding) {
        router.replace('/splash');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [isLoading, appState.hasCompletedOnboarding]);

  if (isLoading) {
    return null;
  }

  return <RootLayoutNav />;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThinkProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppContent />
        </GestureHandlerRootView>
      </ThinkProvider>
    </QueryClientProvider>
  );
}