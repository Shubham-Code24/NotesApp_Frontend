



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
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ListNoteScreen from '../screens/ListNoteScreen';
import DrawingScreen from '../screens/DrawingScreen';
import DeletedScreen from '../screens/DeletedScreen';
import ArchivedScreen from '../screens/ArchivedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpFeedbackScreen from '../screens/HelpFeedbackScreen';
import RemindersScreen from '../screens/RemindersScreen';
import EditLabelsScreen from '../screens/EditLabelsScreen';
import CheckListScreen from '../screens/CheckListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen name="EditLabels" component={EditLabelsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CheckList" component={CheckListScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
