import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import { StatusBar } from 'react-native';
import { LocationProvider } from './src/context/LocationProvider';

const AppContent = () => {
  return (
    <NavigationContainer>
      <LocationProvider>
        <MainNavigation />
      </LocationProvider>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="dark-content" />
      <AppContent />
    </>
  );
}