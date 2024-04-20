import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './src/navigation/AuthNavigation';
import MainNavigation from './src/navigation/MainNavigation';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LocationProvider } from './src/context/useLocationContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {
        isAuthenticated ? 
        <>
          <LocationProvider>
            <MainNavigation /> 
          </LocationProvider>
        </>
        : <AuthNavigation />
      }
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}