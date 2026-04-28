import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PointsScreen from './src/screens/PointsScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import { AppProvider } from './src/state/AppContext';
import type { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Points" component={PointsScreen} />
            <Stack.Screen name="Rewards" component={RewardsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </ApplicationProvider>
  );
}
