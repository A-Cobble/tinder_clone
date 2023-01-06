import { NavigationContainer } from '@react-navigation/native';
import tw from "twrnc"
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';

// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs(); // Ignore log notification by message

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Componenet */}
      {/* Passes down the auth stuff to children... */}
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}