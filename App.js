import { NavigationContainer } from '@react-navigation/native';
import tw from "twrnc"
// import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Componenet */}
      {/* <AuthProvider> */}
        {/* Passes down the auth stuff to children... */}
        <StackNavigator />
      {/* </AuthProvider> */}
    </NavigationContainer>
  );
}