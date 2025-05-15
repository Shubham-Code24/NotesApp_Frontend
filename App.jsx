





import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';

// Firebase: react-native-firebase setup
import firestore from '@react-native-firebase/firestore';

// Export db as firestore instance
export const db = firestore();

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};




 export default App;