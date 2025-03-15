import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack 
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#14213D' } // Dark blue background
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}