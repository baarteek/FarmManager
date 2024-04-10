import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './src/navigation/AuthNavigation';
import MainNavigation from './src/navigation/MainNavigation';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {
        isAuthenticated ? <MainNavigation /> : <AuthNavigation />
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