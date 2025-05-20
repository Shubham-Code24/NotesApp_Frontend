






// // GoogleKeep/src/screens/RemindersScreen.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import CustomDrawer from '../components/CustomDrawer';
// import FABMenu from '../components/FABMenu';
// import { db } from '../../App';
// import {
//   collection,
//   onSnapshot,
//   query,
//   where,
//   orderBy
// } from '@react-native-firebase/firestore';

// const RemindersScreen = ({ navigation }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [notes, setNotes] = useState([]);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   useEffect(() => {
//     const q = query(
//       collection(db, 'notes'),
//       where('hasReminder', '==', true),
//       where('deleted', '==', false),
//       where('archived', '==', false),
//       orderBy('createdAt', 'desc')
//     );
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       if (!snapshot) {
//         console.log('Reminders snapshot is null');
//         setNotes([]);
//         return;
//       }
//       let reminderNotes = [];
//       snapshot.forEach((docSnap) => {
//         reminderNotes.push({ id: docSnap.id, ...docSnap.data() });
//       });
//       setNotes(reminderNotes);
//     }, (error) => {
//       console.log('onSnapshot error in RemindersScreen:', error);
//       setNotes([]);
//     });
//     return () => unsubscribe();
//   }, []);

//   const renderNotes = () => {
//     if (notes.length === 0) {
//       return (
//         <View style={styles.centerContent}>
//           <Icon name="notifications-none" size={80} color="#fff" style={styles.bellIcon} />
//           <Text style={styles.centerText}>Notes with upcoming reminders appear here</Text>
//         </View>
//       );
//     } else {
//       return (
//         <FlatList
//           data={notes}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ padding: 10 }}
//           renderItem={({ item }) => {
//             let dateStr = '';
//             if (item.reminderTime) {
//               const d = item.reminderTime.toDate ? item.reminderTime.toDate() : new Date(item.reminderTime);
//               dateStr = d.toDateString() + ', ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//             }
//             return (
//               <View style={styles.noteCard}>
//                 <Text style={styles.noteTitle}>{item.title}</Text>
//                 <Text style={styles.noteDescription}>{item.description}</Text>
//                 {dateStr ? (
//                   <View style={styles.reminderLabel}>
//                     <Icon name="alarm" size={16} color="#fff" style={{ marginRight: 4 }} />
//                     <Text style={{ color: '#fff', fontSize: 13 }}>{dateStr}</Text>
//                     {item.reminderPlace && (
//                       <Text style={{ color: '#fff', marginLeft: 6, fontSize: 13 }}>@ {item.reminderPlace}</Text>
//                     )}
//                   </View>
//                 ) : null}
//               </View>
//             );
//           }}
//         />
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <CustomDrawer visible={drawerOpen} onClose={toggleDrawer} />

//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={toggleDrawer}>
//           <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Reminders</Text>
//         <Icon name="search" size={24} color="#fff" style={styles.iconStyle} />
//         <TouchableOpacity style={styles.profileIconContainer}>
//           <Text style={styles.profileText}>N</Text>
//         </TouchableOpacity>
//       </View>

//       {renderNotes()}

//       <FABMenu 
//         onTextPress={() => {
//           // Navigate to ListNoteScreen with fromReminders param
//           navigation.navigate('Text', { fromReminders: true });
//         }}
//       />
//     </View>
//   );
// };

// export default RemindersScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#121212' },
//   topBar: {
//     flexDirection: 'row', alignItems: 'center',
//     paddingHorizontal: 16, paddingVertical: 12,
//   },
//   menuIcon: { marginRight: 16 },
//   headerTitle: { flex: 1, color: '#fff', fontSize: 18, fontWeight: 'bold' },
//   iconStyle: { marginRight: 16 },
//   profileIconContainer: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: '#1e1e1e', justifyContent: 'center', alignItems: 'center',
//   },
//   profileText: { color: '#fff', fontWeight: 'bold' },
//   centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   bellIcon: { marginBottom: 16 },
//   centerText: { color: '#fff', fontSize: 16 },
//   noteCard: {
//     backgroundColor: '#1e1e1e', borderRadius: 8,
//     padding: 10, marginBottom: 10,
//   },
//   noteTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
//   noteDescription: { color: '#ccc', fontSize: 14, marginBottom: 6 },
//   reminderLabel: {
//     flexDirection: 'row', alignItems: 'center',
//     backgroundColor: '#333', borderRadius: 6,
//     paddingHorizontal: 6, paddingVertical: 3,
//     alignSelf: 'flex-start',
//   },
// });






































// // RemindersScreen.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, StyleSheet, TouchableOpacity, FlatList
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import CustomDrawer from '../components/CustomDrawer';
// import FABMenu from '../components/FABMenu';
// import { db } from '../../App';
// import {
//   collection, onSnapshot, query,
//   where, orderBy
// } from '@react-native-firebase/firestore';

// const RemindersScreen = ({ navigation }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [allNotes, setAllNotes] = useState([]);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   useEffect(() => {
//     const q = query(
//       collection(db, 'notes'),
//       where('hasReminder', '==', true),
//       where('deleted', '==', false),
//       where('archived', '==', false),
//       orderBy('createdAt', 'desc')
//     );
//     const unsubscribe = onSnapshot(
//       q,
//       (querySnapshot) => {
//         if (!querySnapshot) {
//           setAllNotes([]);
//           return;
//         }
//         let notesArr = [];
//         querySnapshot.forEach((docSnap) => {
//           notesArr.push({ id: docSnap.id, ...docSnap.data() });
//         });
//         setAllNotes(notesArr);
//       },
//       (error) => {
//         console.log('RemindersScreen error:', error);
//         setAllNotes([]);
//       }
//     );
//     return () => unsubscribe && unsubscribe();
//   }, []);

//   // Separate upcoming vs sent
//   const now = new Date();
//   const upcomingNotes = allNotes.filter((n) => {
//     if (!n.reminderTime) return false;
//     const d = n.reminderTime.toDate ? n.reminderTime.toDate() : new Date(n.reminderTime);
//     return d > now; // future => upcoming
//   });
//   const sentNotes = allNotes.filter((n) => {
//     if (!n.reminderTime) return false;
//     const d = n.reminderTime.toDate ? n.reminderTime.toDate() : new Date(n.reminderTime);
//     return d <= now; // past => sent
//   });

//   const renderNoteItem = ({ item }) => {
//     let dateStr = '';
//     if (item.reminderTime) {
//       const d = item.reminderTime.toDate ? item.reminderTime.toDate() : new Date(item.reminderTime);
//       dateStr = d.toDateString() + ', ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     }
//     return (
//       <View style={styles.noteCard}>
//         <Text style={styles.noteTitle}>{item.title}</Text>
//         {item.description ? (
//           <Text style={styles.noteDescription}>{item.description}</Text>
//         ) : null}
//         {dateStr ? (
//           <View style={styles.reminderLabel}>
//             <Icon name="alarm" size={16} color="#fff" style={{ marginRight: 4 }} />
//             <Text style={{ color: '#fff', fontSize: 12 }}>{dateStr}</Text>
//           </View>
//         ) : null}
//       </View>
//     );
//   };

//   const renderSection = (sectionTitle, dataArr) => {
//     if (dataArr.length === 0) return null;
//     return (
//       <View style={{ marginBottom: 20 }}>
//         <Text style={styles.sectionHeader}>{sectionTitle}</Text>
//         <FlatList
//           data={dataArr}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ paddingVertical: 5 }}
//           renderItem={renderNoteItem}
//         />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <CustomDrawer visible={drawerOpen} onClose={toggleDrawer} />

//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={toggleDrawer}>
//           <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Reminders</Text>
//         <Icon name="search" size={24} color="#fff" style={styles.iconStyle} />
//         <TouchableOpacity style={styles.profileIconContainer}>
//           <Text style={styles.profileText}>S</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ flex: 1, paddingHorizontal: 10 }}>
//         {renderSection('Upcoming', upcomingNotes)}
//         {renderSection('Sent', sentNotes)}
//         {/* Agar sentNotes.length==0 ho, to 'Sent' section skip ho jaega */}
//       </View>

//       <FABMenu
//         onTextPress={() => {
//           // Navigate to ListNoteScreen with fromReminders param
//           navigation.navigate('Text', { fromReminders: true });
//         }}
//       />
//     </View>
//   );
// };

// export default RemindersScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#121212' },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   menuIcon: { marginRight: 16 },
//   headerTitle: { flex: 1, color: '#fff', fontSize: 18, fontWeight: 'bold' },
//   iconStyle: { marginRight: 16 },
//   profileIconContainer: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: '#1e1e1e', justifyContent: 'center', alignItems: 'center',
//   },
//   profileText: { color: '#fff', fontWeight: 'bold' },
//   sectionHeader: {
//     color: '#fff', fontSize: 16,
//     marginVertical: 8, fontWeight: 'bold',
//   },
//   noteCard: {
//     backgroundColor: '#1e1e1e', borderRadius: 8,
//     padding: 10, marginBottom: 10,
//   },
//   noteTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   noteDescription: { color: '#ccc', fontSize: 14, marginVertical: 4 },
//   reminderLabel: {
//     flexDirection: 'row', alignItems: 'center',
//     backgroundColor: '#333', borderRadius: 4,
//     paddingHorizontal: 6, paddingVertical: 2,
//     marginTop: 6, alignSelf: 'flex-start',
//   },
// });




















// src_3/screens/RemindersScreen.jsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDrawer from '../components/CustomDrawer';
import FABMenu from '../components/FABMenu';
import firestore from '@react-native-firebase/firestore';

const RemindersScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reminders, setReminders] = useState([]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    // Query: hasReminder == true, deleted == false, archived == false
    // Order by createdAt desc
    const unsubscribe = firestore()
      .collection('notes')
      .where('hasReminder', '==', true)
      .where('deleted', '==', false)
      .where('archived', '==', false)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          if (!snapshot) {
            setReminders([]);
            return;
          }
          const notesArray = [];
          snapshot.forEach((docSnap) => {
            notesArray.push({ id: docSnap.id, ...docSnap.data() });
          });
          setReminders(notesArray);
        },
        (error) => {
          console.log('RemindersScreen error:', error);
          setReminders([]);
        }
      );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Render each reminder card
  const renderReminderCard = ({ item }) => {
    let dateStr = '';
    if (item.reminderTime) {
      // Firestore Timestamp -> JS Date
      const d = item.reminderTime.toDate
        ? item.reminderTime.toDate()
        : new Date(item.reminderTime);
      dateStr =
        d.toDateString() +
        ', ' +
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return (
      <View style={styles.noteCard}>
        {/* Title */}
        {item.title ? (
          <Text style={styles.noteTitle}>{item.title}</Text>
        ) : null}

        {/* Description */}
        {item.description ? (
          <Text style={styles.noteDescription}>{item.description}</Text>
        ) : null}

        {/* Reminder date/time container */}
        {dateStr ? (
          <View style={styles.reminderLabel}>
            <Icon name="alarm" size={16} color="#fff" style={{ marginRight: 4 }} />
            <Text style={{ color: '#fff', fontSize: 12 }}>{dateStr}</Text>
          </View>
        ) : null}
      </View>
    );
  };

  const renderRemindersList = () => {
    if (reminders.length === 0) {
      return (
        <View style={styles.centerContent}>
          <Icon
            name="notifications-none"
            size={80}
            color="#666"
            style={{ marginBottom: 16 }}
          />
          <Text style={{ color: '#fff', fontSize: 16 }}>No reminders yet</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderReminderCard}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomDrawer visible={drawerOpen} onClose={toggleDrawer} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminders</Text>
        <Icon name="search" size={24} color="#fff" style={styles.iconStyle} />
        <TouchableOpacity style={styles.profileIconContainer}>
          <Text style={styles.profileText}>S</Text>
        </TouchableOpacity>
      </View>

      {/* Render the reminder notes in a 2-column grid */}
      {renderRemindersList()}

      {/* Floating Action Button -> Create new reminder note */}
      <FABMenu
        onTextPress={() => {
          navigation.navigate('Text', { fromReminders: true });
        }}
      />
    </View>
  );
};

export default RemindersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuIcon: { marginRight: 16 },
  headerTitle: { flex: 1, color: '#fff', fontSize: 18, fontWeight: 'bold' },
  iconStyle: { marginRight: 16 },
  profileIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: { color: '#fff', fontWeight: 'bold' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noteCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    flex: 1,
    minHeight: 100,
  },
  noteTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noteDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  // reminderLabel: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#333',
  //   borderRadius: 4,
  //   paddingHorizontal: 6,
  //   paddingVertical: 2,
  //   alignSelf: 'flex-start',
  // },

  reminderLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 8,
    marginRight : 22,
    backgroundColor: '#333',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },

});
