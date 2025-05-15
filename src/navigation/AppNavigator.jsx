



// // src_3/navigation/AppNavigator.jsx
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Screens
// import HomeScreen from '../screens/HomeScreen';
// import ListNoteScreen from '../screens/ListNoteScreen';
// import DrawingScreen from '../screens/DrawingScreen';
// import DeletedScreen from '../screens/DeletedScreen';
// import ArchivedScreen from '../screens/ArchivedScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import HelpFeedbackScreen from '../screens/HelpFeedbackScreen';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Text"
//         component={ListNoteScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Drawing"
//         component={DrawingScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Deleted"
//         component={DeletedScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Archived"
//         component={ArchivedScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="HelpFeedback"
//         component={HelpFeedbackScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;











// src_3/navigation/AppNavigator.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ListNoteScreen from '../screens/ListNoteScreen';
import DrawingScreen from '../screens/DrawingScreen';
import DeletedScreen from '../screens/DeletedScreen';
import ArchivedScreen from '../screens/ArchivedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpFeedbackScreen from '../screens/HelpFeedbackScreen';
import RemindersScreen from '../screens/RemindersScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Text" component={ListNoteScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Drawing" component={DrawingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Deleted" component={DeletedScreen} options={{ headerShown: false }} />
      <Stack.Screen
     name="Reminders"
     component={RemindersScreen}
     options={{ headerShown: false }}
   />
      <Stack.Screen name="Archived" component={ArchivedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HelpFeedback" component={HelpFeedbackScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
