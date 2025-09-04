import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ReactNativeKeycloakProvider } from '@react-keycloak/native';
import keycloak from './keycloak';

import Landing from './src/components/Landing';
import Dashboard from './src/components/Dashboard';

const Stack = createNativeStackNavigator({});

export default function App() {
  return (
    <ReactNativeKeycloakProvider
      authClient={keycloak}
    >
      <NavigationContainer style={{ backgroundColor: 'transparent' }}>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReactNativeKeycloakProvider>
  );
}
