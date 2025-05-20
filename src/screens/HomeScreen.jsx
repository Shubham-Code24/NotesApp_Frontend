






// // src_3/screens/HomeScreen.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   Pressable,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Svg, { Path } from 'react-native-svg';
// import FABMenu from '../components/FABMenu';
// import CustomDrawer from '../components/CustomDrawer';
// import { db } from '../../App';
// import {
//   collection,
//   onSnapshot,
//   query,
//   orderBy,
//   where,
//   doc,
//   updateDoc,
// } from '@react-native-firebase/firestore';

// const HomeScreen = ({ navigation }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const [selectedNoteIds, setSelectedNoteIds] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [lastTap, setLastTap] = useState(0);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   useEffect(() => {
//     const q = query(
//       collection(db, 'notes'),
//       where('deleted', '==', false),
//       where('archived', '==', false),
//       orderBy('createdAt', 'desc')
//     );
//     const unsubscribe = onSnapshot(
//       q,
//       (querySnapshot) => {
//         if (querySnapshot && typeof querySnapshot.forEach === 'function') {
//           const notesArray = [];
//           querySnapshot.forEach((docSnap) => {
//             notesArray.push({ id: docSnap.id, ...docSnap.data() });
//           });
//           setNotes(notesArray);
//         } else {
//           console.warn('Received invalid snapshot in HomeScreen');
//         }
//       },
//       (error) => {
//         console.error('Error fetching notes in real time:', error);
//       }
//     );
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, []);

//   const handleCardPress = (item) => {
//     const now = Date.now();
//     if (now - lastTap < 300) {
//       navigation.navigate('Text', { noteId: item.id });
//     }
//     setLastTap(now);
//   };

//   const handleCardLongPress = (item) => {
//     if (selectedNoteIds.includes(item.id)) {
//       setSelectedNoteIds((prev) => prev.filter((id) => id !== item.id));
//     } else {
//       setSelectedNoteIds((prev) => [...prev, item.id]);
//     }
//   };

//   const renderNotes = () => {
//     if (notes.length === 0) {
//       return (
//         <View style={styles.centerContent}>
//           <Icon
//             name="lightbulb-outline"
//             size={80}
//             color="#fff"
//             style={styles.lightBulbIcon}
//           />
//           <Text style={styles.centerText}>Notes you add appear here</Text>
//         </View>
//       );
//     }
//     return (
//       <FlatList
//         data={notes}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ padding: 10 }}
//         numColumns={2}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         renderItem={({ item }) => {
//           let dateStr = '';
//           if (item.hasReminder && item.reminderTime) {
//             const d = item.reminderTime.toDate
//               ? item.reminderTime.toDate()
//               : new Date(item.reminderTime);
//             dateStr =
//               d.toDateString() +
//               ', ' +
//               d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//           }
//           return (
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => {
//                 if (selectedNoteIds.length > 0) {
//                   handleCardLongPress(item);
//                 } else {
//                   handleCardPress(item);
//                 }
//               }}
//               onLongPress={() => handleCardLongPress(item)}
//               style={[
//                 styles.noteCard,
//                 selectedNoteIds.includes(item.id) && {
//                   borderColor: 'green',
//                   borderWidth: 2,
//                 },
//               ]}
//             >
//               {item.title ? (
//                 <Text style={styles.noteTitle}>{item.title}</Text>
//               ) : null}
//               {item.description ? (
//                 <Text style={styles.noteDescription}>{item.description}</Text>
//               ) : null}

//               {/* Reminder container */}
//               {item.hasReminder && dateStr ? (
//                 <View style={styles.reminderLabel}>
//                   <Icon
//                     name="alarm"
//                     size={16}
//                     color="#fff"
//                     style={{ marginRight: 4 }}
//                   />
//                   <Text style={{ color: '#fff', fontSize: 12 }}>{dateStr}</Text>
//                 </View>
//               ) : null}
//             </TouchableOpacity>
//           );
//         }}
//       />
//     );
//   };

//   // Overflow menu actions (Archive/Delete) same as before
//   const deleteSelectedNotes = async () => {
//     try {
//       const promises = selectedNoteIds.map(async (id) => {
//         const noteRef = doc(db, 'notes', id);
//         await updateDoc(noteRef, { deleted: true });
//       });
//       await Promise.all(promises);
//       setSelectedNoteIds([]);
//       setModalVisible(false);
//     } catch (error) {
//       console.log('Error deleting notes:', error);
//     }
//   };

//   const archiveSelectedNotes = async () => {
//     try {
//       const promises = selectedNoteIds.map(async (id) => {
//         const noteRef = doc(db, 'notes', id);
//         await updateDoc(noteRef, { archived: true });
//       });
//       await Promise.all(promises);
//       setSelectedNoteIds([]);
//       setModalVisible(false);
//     } catch (error) {
//       console.log('Error archiving notes:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <CustomDrawer visible={drawerOpen} onClose={toggleDrawer} />

//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={toggleDrawer}>
//           <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
//         </TouchableOpacity>
//         <View style={styles.searchContainer}>
//           <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search your notes"
//             placeholderTextColor="#aaa"
//           />
//         </View>
//         <TouchableOpacity style={styles.profileIconContainer}>
//           <Text style={styles.profileText}>S</Text>
//         </TouchableOpacity>
//         {selectedNoteIds.length > 0 && (
//           <TouchableOpacity
//             onPress={() => setModalVisible(true)}
//             style={{ marginLeft: 10 }}
//           >
//             <Icon name="more-vert" size={28} color="#fff" />
//           </TouchableOpacity>
//         )}
//       </View>

//       {renderNotes()}

//       <FABMenu onTextPress={() => navigation.navigate('Text')} />

//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <Pressable
//           style={styles.modalOverlay}
//           onPress={() => setModalVisible(false)}
//         >
//           <View style={styles.modalView}>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={archiveSelectedNotes}
//             >
//               <Text style={styles.modalButtonText}>Archive</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={deleteSelectedNotes}
//             >
//               <Text style={styles.modalButtonText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         </Pressable>
//       </Modal>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#121212' },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   menuIcon: { marginRight: 16 },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#1e1e1e',
//     borderRadius: 8,
//     alignItems: 'center',
//     paddingHorizontal: 8,
//   },
//   searchIcon: { marginRight: 8 },
//   searchInput: { flex: 1, color: '#fff' },
//   profileIconContainer: {
//     marginLeft: 16,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#1e1e1e',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileText: { color: '#fff', fontWeight: 'bold' },
//   centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   lightBulbIcon: { marginBottom: 16 },
//   centerText: { color: '#fff', fontSize: 16 },
//   noteCard: {
//     backgroundColor: '#1e1e1e',
//     borderRadius: 8,
//     padding: 10,
//     margin: 5,
//     flex: 1,
//     minHeight: 100,
//   },
//   noteTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
//   noteDescription: { color: '#ccc', fontSize: 14 },
//   reminderLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     backgroundColor: '#333',
//     borderRadius: 4,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     alignSelf: 'flex-start',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 20,
//     width: '70%',
//     alignItems: 'center',
//   },
//   modalButton: { paddingVertical: 10, width: '100%', alignItems: 'center' },
//   modalButtonText: { fontSize: 16, color: '#000', fontWeight: 'bold' },
// });













































// // src_3/screens/HomeScreen.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   Pressable,
//   Image
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Svg, { Path } from 'react-native-svg';
// import FABMenu from '../components/FABMenu';
// import CustomDrawer from '../components/CustomDrawer';
// import { db } from '../../App';
// import {
//   collection,
//   onSnapshot,
//   query,
//   orderBy,
//   where,
//   updateDoc,
//   doc,
//   addDoc,
//   getDoc,
// } from '@react-native-firebase/firestore';

// const HomeScreen = ({ navigation }) => {
//   // Drawer
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   // Notes data
//   const [notes, setNotes] = useState([]);
//   // Multi-selection
//   const [selectedNoteIds, setSelectedNoteIds] = useState([]);
//   // Overflow menu modal
//   const [modalVisible, setModalVisible] = useState(false);
//   // For double-tap detection on text notes
//   const [lastTap, setLastTap] = useState(0);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   useEffect(() => {
//     let unsubscribe;
//     try {
//       const q = query(
//         collection(db, 'notes'),
//         where('archived', '==', false),
//         where('deleted', '==', false),
//         orderBy('createdAt', 'desc')
//       );
//       unsubscribe = onSnapshot(
//         q,
//         (querySnapshot) => {
//           if (querySnapshot && typeof querySnapshot.forEach === 'function') {
//             const notesArray = [];
//             querySnapshot.forEach((docSnap) => {
//               notesArray.push({ id: docSnap.id, ...docSnap.data() });
//             });
//             setNotes(notesArray);
//           } else {
//             console.warn('Received invalid snapshot in HomeScreen');
//           }
//         },
//         (error) => {
//           console.error('Error fetching notes in real time:', error);
//         }
//       );
//     } catch (error) {
//       console.error('Error setting up real-time listener in HomeScreen:', error);
//     }
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, []);

//   const handleCardPress = (item) => {
//     const now = Date.now();
//     if (now - lastTap < 300) {
//       navigation.navigate('Text', { noteId: item.id });
//     }
//     setLastTap(now);
//   };

//   const handleCardLongPress = (item) => {
//     if (selectedNoteIds.includes(item.id)) {
//       setSelectedNoteIds((prev) => prev.filter((id) => id !== item.id));
//     } else {
//       setSelectedNoteIds((prev) => [...prev, item.id]);
//     }
//   };

//   const handleCancelSelection = () => {
//     setSelectedNoteIds([]);
//   };

//   const renderNotes = () => {
//     if (notes.length === 0) {
//       return (
//         <View style={styles.centerContent}>
//           <Icon
//             name="lightbulb-outline"
//             size={80}
//             color="#fff"
//             style={styles.lightBulbIcon}
//           />
//           <Text style={styles.centerText}>Notes you add appear here</Text>
//         </View>
//       );
//     } else {
//       return (
//         <FlatList
//           data={notes}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ padding: 10 }}
//           numColumns={2}
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//           renderItem={({ item }) => {
//             let dateStr = '';
//             if (item.hasReminder && item.reminderTime) {
//               const d = item.reminderTime.toDate
//                 ? item.reminderTime.toDate()
//                 : new Date(item.reminderTime);
//               dateStr =
//                 d.toDateString() +
//                 ', ' +
//                 d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//             }
//             return (
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => {
//                   if (selectedNoteIds.length > 0) {
//                     handleCardLongPress(item);
//                   } else {
//                     handleCardPress(item);
//                   }
//                 }}
//                 onLongPress={() => handleCardLongPress(item)}
//                 style={[
//                   styles.noteCard,
//                   selectedNoteIds.includes(item.id) && {
//                     borderColor: 'green',
//                     borderWidth: 2,
//                   },
//                 ]}
//               >
//                 {item.drawingPath ? (
//                   <View style={{ flex: 1 }}>
//                     <Svg style={{ width: '100%', height: 80 }}>
//                       <Path
//                         d={item.drawingPath}
//                         stroke="#fff"
//                         strokeWidth={1.5}
//                         fill="none"
//                       />
//                     </Svg>
//                   </View>
//                 ) : (
//                   <>
//                   +   {item.imageUri ? (
//      <Image
//        source={{ uri: item.imageUri }}
//        style={{ width: '100%', height: 120, marginBottom: 8, borderRadius: 6 }}
//        resizeMode="cover"
//      />
//    ) : null}
//                     {item.title ? (
//                       <Text style={styles.noteTitle}>{item.title}</Text>
//                     ) : null}
//                     {item.description ? (
//                       <Text style={styles.noteDescription}>{item.description}</Text>
//                     ) : null}
//                   </>
//                 )}
//                 {item.hasReminder && dateStr ? (
//                   <View style={styles.reminderLabel}>
//                     <Icon
//                       name="alarm"
//                       size={16}
//                       color="#fff"
//                       style={{ marginRight: 4 }}
//                     />
//                     <Text style={{ color: '#fff', fontSize: 12 }}>{dateStr}</Text>
//                   </View>
//                 ) : null}
//               </TouchableOpacity>
//             );
//           }}
//         />
//       );
//     }
//   };

//   const deleteSelectedNotes = async () => {
//     try {
//       const promises = selectedNoteIds.map(async (id) => {
//         const noteRef = doc(db, 'notes', id);
//         await updateDoc(noteRef, { deleted: true });
//       });
//       await Promise.all(promises);
//       setSelectedNoteIds([]);
//       setModalVisible(false);
//     } catch (error) {
//       console.log('Error deleting notes:', error);
//     }
//   };

//   const archiveSelectedNotes = async () => {
//     try {
//       const promises = selectedNoteIds.map(async (id) => {
//         const noteRef = doc(db, 'notes', id);
//         await updateDoc(noteRef, { archived: true });
//       });
//       await Promise.all(promises);
//       setSelectedNoteIds([]);
//       setModalVisible(false);
//     } catch (error) {
//       console.log('Error archiving notes:', error);
//     }
//   };

//   const makeCopySelectedNotes = async () => {
//     try {
//       const promises = selectedNoteIds.map(async (id) => {
//         const noteRef = doc(db, 'notes', id);
//         const docSnap = await getDoc(noteRef);
//         if (docSnap.exists) {
//           const data = docSnap.data();
//           await addDoc(collection(db, 'notes'), {
//             title: data.title || '',
//             description: data.description || '',
//             drawingPath: data.drawingPath || '',
//             archived: false,
//             deleted: false,
//             createdAt: data.createdAt,
//           });
//         }
//       });
//       await Promise.all(promises);
//       setSelectedNoteIds([]);
//       setModalVisible(false);
//     } catch (error) {
//       console.log('Error making copy of notes:', error);
//     }
//   };

//   const sendSelectedNotes = () => {
//     setSelectedNoteIds([]);
//     setModalVisible(false);
//     console.log('Send is clicked (placeholder)');
//   };

//   const copyToGoogleDocsSelectedNotes = () => {
//     setSelectedNoteIds([]);
//     setModalVisible(false);
//     console.log('Copy to Google Docs is clicked (placeholder)');
//   };

//   return (
//     <View style={styles.container}>
//       <CustomDrawer visible={drawerOpen} onClose={toggleDrawer} />

//       {selectedNoteIds.length > 0 ? (
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={handleCancelSelection}>
//             <Icon
//               name="close"
//               size={28}
//               color="#fff"
//               style={styles.menuIcon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>{selectedNoteIds.length}</Text>
//           <View style={{ flex: 1 }} />
//           <TouchableOpacity onPress={() => setModalVisible(true)}>
//             <Icon name="more-vert" size={28} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={toggleDrawer}>
//             <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
//           </TouchableOpacity>
//           <View style={styles.searchContainer}>
//             <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search your notes"
//               placeholderTextColor="#aaa"
//             />
//           </View>
//           <TouchableOpacity style={styles.profileIconContainer}>
//             <Text style={styles.profileText}>S</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {renderNotes()}

//       <FABMenu
//         onTextPress={() => {
//           navigation.navigate('Text');
//         }}
//       />

//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <Pressable
//           style={styles.modalOverlay}
//           onPress={() => setModalVisible(false)}
//         >
//           <View style={styles.modalView}>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={archiveSelectedNotes}
//             >
//               <Text style={styles.modalButtonText}>Archive</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={deleteSelectedNotes}
//             >
//               <Text style={styles.modalButtonText}>Delete</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={makeCopySelectedNotes}
//             >
//               <Text style={styles.modalButtonText}>Make a copy</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={sendSelectedNotes}
//             >
//               <Text style={styles.modalButtonText}>Send</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={copyToGoogleDocsSelectedNotes}
//             >
//               <Text style={styles.modalButtonText}>Copy to Google Docs</Text>
//             </TouchableOpacity>
//           </View>
//         </Pressable>
//       </Modal>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#121212' },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   menuIcon: { marginRight: 16 },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#1e1e1e',
//     borderRadius: 8,
//     alignItems: 'center',
//     paddingHorizontal: 8,
//   },
//   searchIcon: { marginRight: 8 },
//   searchInput: { flex: 1, color: '#fff' },
//   profileIconContainer: {
//     marginLeft: 16,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#1e1e1e',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileText: { color: '#fff', fontWeight: 'bold' },
//   headerTitle: { color: '#fff', fontSize: 18, marginLeft: 8 },
//   centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   lightBulbIcon: { marginBottom: 16 },
//   centerText: { color: '#fff', fontSize: 16 },
//   noteCard: {
//     backgroundColor: '#1e1e1e',
//     borderRadius: 8,
//     padding: 10,
//     margin: 5,
//     flex: 1,
//     minHeight: 100,
//   },
//   noteTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
//   noteDescription: { color: '#ccc', fontSize: 14 },
//   reminderLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     marginHorizontal: 8,
//     marginRight : 22,
//     backgroundColor: '#333',
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     alignSelf: 'flex-start',
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 20,
//     width: '70%',
//     alignItems: 'center',
//   },
//   modalButton: { paddingVertical: 10, width: '100%', alignItems: 'center' },
//   modalButtonText: { fontSize: 16, color: '#000', fontWeight: 'bold' },
// });








































// // src_3/screens/HomeScreen.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   Pressable,
//   Image
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Svg, { Path } from 'react-native-svg';
// import FABMenu from '../components/FABMenu';
// import CustomDrawer from '../components/CustomDrawer';
// import { db } from '../../App';
// import {
//   collection,
//   onSnapshot,
//   query,
//   orderBy,
//   where,
//   updateDoc,
//   doc,
//   addDoc,
//   getDoc,
// } from '@react-native-firebase/firestore';

// const HomeScreen = ({ navigation }) => {
//   // Drawer
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   // Notes data
//   const [notes, setNotes] = useState([]);
//   // Multi-selection
//   const [selectedNoteIds, setSelectedNoteIds] = useState([]);
//   // Overflow menu modal
//   const [modalVisible, setModalVisible] = useState(false);
//   // For double-tap detection on text notes
//   const [lastTap, setLastTap] = useState(0);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   useEffect(() => {
//     let unsubscribe;
//     try {
//       const q = query(
//         collection(db, 'notes'),
//         where('archived', '==', false),
//         where('deleted', '==', false),
//         orderBy('createdAt', 'desc')
//       );
//       unsubscribe = onSnapshot(
//         q,
//         (querySnapshot) => {
//           if (querySnapshot && typeof querySnapshot.forEach === 'function') {
//             const notesArray = [];
//             querySnapshot.forEach((docSnap) => {
//               notesArray.push({ id: docSnap.id, ...docSnap.data() });
//             });
//             setNotes(notesArray);
//           } else {
//             console.warn('Received invalid snapshot in HomeScreen');
//           }
//         },
//         (error) => {
//           console.error('Error fetching notes in real time:', error);
//         }
//       );
//     } catch (error) {
//       console.error('Error setting up real-time listener in HomeScreen:', error);
//     }
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, []);

//   const handleCardPress = (item) => {
//     // If note is a drawing note, navigate directly to Drawing screen
//     if (item.drawingPath) {
//       navigation.navigate('Drawing', { noteId: item.id, drawingPath: item.drawingPath });
//     } else {
//       // For text notes, double tap to open edit screen
//       const now = Date.now();
//       if (now - lastTap < 300) {
//         navigation.navigate('Text', { noteId: item.id });
//       }
//       setLastTap(now);
//     }
//   };

//   const handleCardLongPress = (item) => {
//     if (selectedNoteIds.includes(item.id)) {
//       setSelectedNoteIds((prev) => prev.filter((id) => id !== item.id));
//     } else {
//       setSelectedNoteIds((prev) => [...prev, item.id]);
//     }
//   };

//   const handleCancelSelection = () => {
//     setSelectedNoteIds([]);
//   };

//   const renderNotes = () => {
//     if (notes.length === 0) {
//       return (
//         <View style={styles.centerContent}>
//           <Icon
//             name="lightbulb-outline"
//             size={80}
//             color="#fff"
//             style={styles.lightBulbIcon}
//           />
//           <Text style={styles.centerText}>Notes you add appear here</Text>
//         </View>
//       );
//     } else {
//       return (
//         <FlatList
//           data={notes}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ padding: 10 }}
//           numColumns={2}
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//           renderItem={({ item }) => {
//             let dateStr = '';
//             if (item.hasReminder && item.reminderTime) {
//               const d = item.reminderTime.toDate
//                 ? item.reminderTime.toDate()
//                 : new Date(item.reminderTime);
//               dateStr =
//                 d.toDateString() +
//                 ', ' +
//                 d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//             }
//             return (
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => {
//                   if (selectedNoteIds.length > 0) {
//                     handleCardLongPress(item);
//                   } else {
//                     handleCardPress(item);
//                   }
//                 }}
//                 onLongPress={() => handleCardLongPress(item)}
//                 style={[
//                   styles.noteCard,
//                   selectedNoteIds.includes(item.id) && { borderColor: 'green', borderWidth: 2 },
//                 ]}
//               >
//                 {item.drawingPath ? (
//                   <View style={{ flex: 1 }}>
//                     <Svg style={{ width: '100%', height: 80 }}>
//                       <Path
//                         d={item.drawingPath}
//                         stroke="#fff"
//                         strokeWidth={1.5}
//                         fill="none"
//                       />
//                     </Svg>
//                   </View>
//                 ) : (
//                   <>
//                     {item.imageUri ? (
//                       <Image
//                         source={{ uri: item.imageUri }}
//                         style={{ width: '100%', height: 120, marginBottom: 8, borderRadius: 6 }}
//                         resizeMode="cover"
//                       />
//                     ) : null}
//                     {item.title ? <Text style={styles.noteTitle}>{item.title}</Text> : null}
//                     {item.description ? <Text style={styles.noteDescription}>{item.description}</Text> : null}
//                   </>
//                 )}
//                 {item.hasReminder && dateStr ? (
//                   <View style={styles.reminderLabel}>
//                     <Icon name="alarm" size={16} color="#fff" style={{ marginRight: 4 }} />
//                     <Text style={{ color: '#fff', fontSize: 12 }}>{dateStr}</Text>
//                   </View>
//                 ) : null}
//               </TouchableOpacity>
//             );
//           }}
//         />
//       );
//     }
//   };




//     const deleteSelectedNotes = async () => {
//     try {
//       const promises = selectedNoteIds.map(async (id) => {
//         const noteRef = doc(db, 'notes', id);
//         await updateDoc(noteRef, { deleted: true });
//       });
//       await Promise.all(promises);
//       setSelectedNoteIds([]);
//       setModalVisible(false);
//     } catch (error) {
//       console.log('Error deleting notes:', error);
//     }
//   };

//   const archiveSelectedNotes = async () => {
//     try {
//       const promises = selectedNoteIds.map(async (id) => {
//         const noteRef = doc(db, 'notes', id);
//         await updateDoc(noteRef, { archived: true });
//       });
//       await Promise.all(promises);
//       setSelectedNoteIds([]);
//       setModalVisible(false);
//     } catch (error) {
//       console.log('Error archiving notes:', error);
//     }
//   };

//   const makeCopySelectedNotes = async () => {
//     try {
//       const promises = selectedNoteIds.map(async (id) => {
//         const noteRef = doc(db, 'notes', id);
//         const docSnap = await getDoc(noteRef);
//         if (docSnap.exists) {
//           const data = docSnap.data();
//           await addDoc(collection(db, 'notes'), {
//             title: data.title || '',
//             description: data.description || '',
//             drawingPath: data.drawingPath || '',
//             archived: false,
//             deleted: false,
//             createdAt: data.createdAt,
//           });
//         }
//       });
//       await Promise.all(promises);
//       setSelectedNoteIds([]);
//       setModalVisible(false);
//     } catch (error) {
//       console.log('Error making copy of notes:', error);
//     }
//   };

//   const sendSelectedNotes = () => {
//     setSelectedNoteIds([]);
//     setModalVisible(false);
//     console.log('Send is clicked (placeholder)');
//   };

//   const copyToGoogleDocsSelectedNotes = () => {
//     setSelectedNoteIds([]);
//     setModalVisible(false);
//     console.log('Copy to Google Docs is clicked (placeholder)');
//   };

//   return (
//     <View style={styles.container}>
//       <CustomDrawer visible={drawerOpen} onClose={toggleDrawer} />

//       {selectedNoteIds.length > 0 ? (
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={handleCancelSelection}>
//             <Icon name="close" size={28} color="#fff" style={styles.menuIcon} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>{selectedNoteIds.length}</Text>
//           <View style={{ flex: 1 }} />
//           <TouchableOpacity onPress={() => setModalVisible(true)}>
//             <Icon name="more-vert" size={28} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={toggleDrawer}>
//             <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
//           </TouchableOpacity>
//           <View style={styles.searchContainer}>
//             <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search your notes"
//               placeholderTextColor="#aaa"
//             />
//           </View>
//           <TouchableOpacity style={styles.profileIconContainer}>
//             <Text style={styles.profileText}>S</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {renderNotes()}

//       <FABMenu onTextPress={() => navigation.navigate('Text')} />

//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
//           <View style={styles.modalView}>
//             <TouchableOpacity style={styles.modalButton} onPress={() => archiveSelectedNotes()}>
//               <Text style={styles.modalButtonText}>Archive</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalButton} onPress={() => deleteSelectedNotes()}>
//               <Text style={styles.modalButtonText}>Delete</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalButton} onPress={() => makeCopySelectedNotes()}>
//               <Text style={styles.modalButtonText}>Make a copy</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalButton} onPress={() => sendSelectedNotes()}>
//               <Text style={styles.modalButtonText}>Send</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalButton} onPress={() => copyToGoogleDocsSelectedNotes()}>
//               <Text style={styles.modalButtonText}>Copy to Google Docs</Text>
//             </TouchableOpacity>
//           </View>
//         </Pressable>
//       </Modal>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#121212' },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   menuIcon: { marginRight: 16 },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#1e1e1e',
//     borderRadius: 8,
//     alignItems: 'center',
//     paddingHorizontal: 8,
//   },
//   searchIcon: { marginRight: 8 },
//   searchInput: { flex: 1, color: '#fff' },
//   profileIconContainer: {
//     marginLeft: 16,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#1e1e1e',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileText: { color: '#fff', fontWeight: 'bold' },
//   headerTitle: { color: '#fff', fontSize: 18, marginLeft: 8 },
//   centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   lightBulbIcon: { marginBottom: 16 },
//   centerText: { color: '#fff', fontSize: 16 },
//   noteCard: {
//     backgroundColor: '#1e1e1e',
//     borderRadius: 8,
//     padding: 10,
//     margin: 5,
//     flex: 1,
//     minHeight: 100,
//   },
//   noteTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
//   noteDescription: { color: '#ccc', fontSize: 14 },
//   reminderLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     marginHorizontal: 8,
//     marginRight: 22,
//     backgroundColor: '#333',
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     alignSelf: 'flex-start',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 20,
//     width: '70%',
//     alignItems: 'center',
//   },
//   modalButton: { paddingVertical: 10, width: '100%', alignItems: 'center' },
//   modalButtonText: { fontSize: 16, color: '#000', fontWeight: 'bold' },
// });

































// src_3/screens/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg';
import FABMenu from '../components/FABMenu';
import CustomDrawer from '../components/CustomDrawer';
import { db } from '../../App';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  updateDoc,
  doc,
  addDoc,
  getDoc,
} from '@react-native-firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    let unsubscribe;
    try {
      const q = query(
        collection(db, 'notes'),
        where('archived', '==', false),
        where('deleted', '==', false),
        orderBy('createdAt', 'desc')
      );
      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (querySnapshot && typeof querySnapshot.forEach === 'function') {
            const notesArray = [];
            querySnapshot.forEach((docSnap) => {
              notesArray.push({ id: docSnap.id, ...docSnap.data() });
            });
            setNotes(notesArray);
          } else {
            console.warn('Received invalid snapshot in HomeScreen');
          }
        },
        (error) => {
          console.error('Error fetching notes in real time:', error);
        }
      );
    } catch (error) {
      console.error('Error setting up real-time listener in HomeScreen:', error);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleCardPress = (item) => {
    // If note is a drawing note, navigate directly to Drawing screen
    if (item.drawingPath) {
      navigation.navigate('Drawing', { noteId: item.id, drawingPath: item.drawingPath });
    } else if (item.isList) {
      // For list notes, navigate to CheckListScreen (if implemented)
      const now = Date.now();
      if (now - lastTap < 300) {
        navigation.navigate('CheckList', { noteId: item.id });
      }
      setLastTap(now);
    } else {
      // For text notes, double tap to open edit screen
      const now = Date.now();
      if (now - lastTap < 300) {
        navigation.navigate('Text', { noteId: item.id });
      }
      setLastTap(now);
    }
  };

  const handleCardLongPress = (item) => {
    if (selectedNoteIds.includes(item.id)) {
      setSelectedNoteIds((prev) => prev.filter((id) => id !== item.id));
    } else {
      setSelectedNoteIds((prev) => [...prev, item.id]);
    }
  };

  const handleCancelSelection = () => {
    setSelectedNoteIds([]);
  };

  const renderNotes = () => {
    if (notes.length === 0) {
      return (
        <View style={styles.centerContent}>
          <Icon
            name="lightbulb-outline"
            size={80}
            color="#fff"
            style={styles.lightBulbIcon}
          />
          <Text style={styles.centerText}>Notes you add appear here</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 10 }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => {
            let dateStr = '';
            if (item.hasReminder && item.reminderTime) {
              const d = item.reminderTime.toDate
                ? item.reminderTime.toDate()
                : new Date(item.reminderTime);
              dateStr =
                d.toDateString() +
                ', ' +
                d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (selectedNoteIds.length > 0) {
                    handleCardLongPress(item);
                  } else {
                    handleCardPress(item);
                  }
                }}
                onLongPress={() => handleCardLongPress(item)}
                style={[
                  styles.noteCard,
                  selectedNoteIds.includes(item.id) && { borderColor: 'green', borderWidth: 2 },
                ]}
              >
                {item.drawingPath ? (
                  <View style={{ flex: 1 }}>
                    <Svg style={{ width: '100%', height: 80 }}>
                      <Path
                        d={item.drawingPath}
                        stroke="#fff"
                        strokeWidth={1.5}
                        fill="none"
                      />
                    </Svg>
                  </View>
                ) : (
                  <>
                    {item.imageUri ? (
                      <Image
                        source={{ uri: item.imageUri }}
                        style={{ width: '100%', height: 120, marginBottom: 8, borderRadius: 6 }}
                        resizeMode="cover"
                      />
                    ) : null}
                    {item.title ? <Text style={styles.noteTitle}>{item.title}</Text> : null}
                    {item.description ? <Text style={styles.noteDescription}>{item.description}</Text> : null}
                  </>
                )}
                {item.hasReminder && dateStr ? (
                  <View style={styles.reminderLabel}>
                    <Icon name="alarm" size={16} color="#fff" style={{ marginRight: 4 }} />
                    <Text style={{ color: '#fff', fontSize: 12 }}>{dateStr}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
      );
    }
  };

  // Functions for multi-select actions (archive, delete, make copy, send, copy to Google Docs)
  const deleteSelectedNotes = async () => {
    try {
      const promises = selectedNoteIds.map(async (id) => {
        const noteRef = doc(db, 'notes', id);
        await updateDoc(noteRef, { deleted: true });
      });
      await Promise.all(promises);
      setSelectedNoteIds([]);
      setModalVisible(false);
    } catch (error) {
      console.log('Error deleting notes:', error);
    }
  };

  const archiveSelectedNotes = async () => {
    try {
      const promises = selectedNoteIds.map(async (id) => {
        const noteRef = doc(db, 'notes', id);
        await updateDoc(noteRef, { archived: true });
      });
      await Promise.all(promises);
      setSelectedNoteIds([]);
      setModalVisible(false);
    } catch (error) {
      console.log('Error archiving notes:', error);
    }
  };

  const makeCopySelectedNotes = async () => {
    try {
      const promises = selectedNoteIds.map(async (id) => {
        const noteRef = doc(db, 'notes', id);
        const docSnap = await getDoc(noteRef);
        if (docSnap.exists) {
          const data = docSnap.data();
          await addDoc(collection(db, 'notes'), {
            title: data.title || '',
            description: data.description || '',
            drawingPath: data.drawingPath || '',
            archived: false,
            deleted: false,
            createdAt: data.createdAt,
          });
        }
      });
      await Promise.all(promises);
      setSelectedNoteIds([]);
      setModalVisible(false);
    } catch (error) {
      console.log('Error making copy of notes:', error);
    }
  };

  const sendSelectedNotes = () => {
    setSelectedNoteIds([]);
    setModalVisible(false);
    console.log('Send is clicked (placeholder)');
  };

  const copyToGoogleDocsSelectedNotes = () => {
    setSelectedNoteIds([]);
    setModalVisible(false);
    console.log('Copy to Google Docs is clicked (placeholder)');
  };

  return (
    <View style={styles.container}>
      <CustomDrawer visible={drawerOpen} onClose={toggleDrawer} />

      {selectedNoteIds.length > 0 ? (
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleCancelSelection}>
            <Icon name="close" size={28} color="#fff" style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedNoteIds.length}</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="more-vert" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Icon name="menu" size={28} color="#fff" style={styles.menuIcon} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your notes"
              placeholderTextColor="#aaa"
            />
          </View>
          <TouchableOpacity style={styles.profileIconContainer}>
            <Text style={styles.profileText}>S</Text>
          </TouchableOpacity>
        </View>
      )}

      {renderNotes()}

      <FABMenu onTextPress={() => navigation.navigate('Text')} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButton} onPress={() => archiveSelectedNotes()}>
              <Text style={styles.modalButtonText}>Archive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => deleteSelectedNotes()}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => makeCopySelectedNotes()}>
              <Text style={styles.modalButtonText}>Make a copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => sendSelectedNotes()}>
              <Text style={styles.modalButtonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => copyToGoogleDocsSelectedNotes()}>
              <Text style={styles.modalButtonText}>Copy to Google Docs</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuIcon: { marginRight: 16 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#fff' },
  profileIconContainer: {
    marginLeft: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: { color: '#fff', fontWeight: 'bold' },
  headerTitle: { color: '#fff', fontSize: 18, marginLeft: 8 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lightBulbIcon: { marginBottom: 16 },
  centerText: { color: '#fff', fontSize: 16 },
  noteCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    flex: 1,
    minHeight: 100,
  },
  noteTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  noteDescription: { color: '#ccc', fontSize: 14 },
  reminderLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 8,
    marginRight: 22,
    backgroundColor: '#333',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '70%',
    alignItems: 'center',
  },
  modalButton: { paddingVertical: 10, width: '100%', alignItems: 'center' },
  modalButtonText: { fontSize: 16, color: '#000', fontWeight: 'bold' },
});
