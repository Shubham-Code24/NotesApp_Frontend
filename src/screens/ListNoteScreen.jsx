/* eslint-disable react-hooks/exhaustive-deps */














// // src_3/screens/ListNoteScreen.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   BackHandler,
//   Alert
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { db } from '../../App';
// import {
//   collection,
//   addDoc,
//   doc,
//   getDoc,
//   updateDoc,
//   serverTimestamp,
// } from '@react-native-firebase/firestore';
// import EditReminderModal from '../components/EditReminderModal';
// import { notifeeService } from '../notifeeService';

// const ListNoteScreen = ({ navigation, route }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const [hasReminder, setHasReminder] = useState(false);
//   const [reminderTime, setReminderTime] = useState(null);
//   const [reminderPlace, setReminderPlace] = useState(null);
//   const [reminderModalVisible, setReminderModalVisible] = useState(false);

//   const noteId = route.params?.noteId || null;
//   const isEdit = !!noteId;
//   const fromReminders = route.params?.fromReminders || false;

//   useEffect(() => {
//     if (isEdit) {
//       fetchNoteForEdit(noteId);
//     } else if (fromReminders) {
//       // If user came from Reminders FAB -> set a default reminder (e.g. tomorrow at 8:00)
//       setHasReminder(true);
//       const tomorrow = new Date();
//       tomorrow.setDate(tomorrow.getDate() + 1);
//       tomorrow.setHours(8, 0, 0, 0);
//       setReminderTime(tomorrow);
//       setReminderPlace('Home');
//     }
//   }, [noteId, isEdit, fromReminders]);

//   const fetchNoteForEdit = async (id) => {
//     try {
//       const docRef = doc(db, 'notes', id);
//       const snapshot = await getDoc(docRef);
//       if (snapshot.exists) {
//         const data = snapshot.data();
//         setTitle(data.title || '');
//         setDescription(data.description || '');
//         if (data.hasReminder) {
//           setHasReminder(true);
//           setReminderTime(data.reminderTime ? data.reminderTime.toDate() : null);
//           setReminderPlace(data.reminderPlace || null);
//         }
//       }
//     } catch (error) {
//       console.log('Error fetching note:', error);
//     }
//   };

//   useEffect(() => {
//     const onBackPress = () => {
//       handleSave();
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     return () => backHandler.remove();
//   }, [title, description, noteId, hasReminder, reminderTime, reminderPlace]);

//   const handleSave = async () => {
//     if (title.trim() !== '' || description.trim() !== '') {
//       try {
//         let docRef;
//         if (isEdit) {
//           docRef = doc(db, 'notes', noteId);
//           await updateDoc(docRef, {
//             title,
//             description,
//             updatedAt: serverTimestamp(),
//             hasReminder,
//             reminderTime: reminderTime || null,
//             reminderPlace: reminderPlace || null,
//           });
//           Alert.alert('Saved successfully');
//         } else {
//           const newDocRef = await addDoc(collection(db, 'notes'), {
//             title,
//             description,
//             createdAt: serverTimestamp(),
//             deleted: false,
//             archived: false,
//             hasReminder,
//             reminderTime: reminderTime || null,
//             reminderPlace: reminderPlace || null,
//           });
//           docRef = newDocRef;
//           Alert.alert('Saved successfully');
//         }

//         // If reminder is set and reminderTime is in future, schedule local notification
//         if (hasReminder && reminderTime && reminderTime > new Date()) {
//           const docId = isEdit ? noteId : docRef.id;
//           await notifeeService.scheduleReminder(docId, title, description, reminderTime);
//         }

//       } catch (error) {
//         console.log('Error saving note: ', error);
//         Alert.alert('Error', 'Failed to save note');
//       }
//     }
//     // Clear fields
//     setTitle('');
//     setDescription('');
//     setHasReminder(false);
//     setReminderTime(null);
//     setReminderPlace(null);

//     navigation.goBack();
//   };

//   const handleReminderSave = (date, place) => {
//     setHasReminder(true);
//     setReminderTime(date);
//     setReminderPlace(place);
//   };

//   const renderReminderButton = () => {
//     if (!hasReminder) {
//       return (
//         <TouchableOpacity
//           style={styles.reminderBtn}
//           onPress={() => setReminderModalVisible(true)}
//         >
//           <Icon name="add-alert" size={20} color="#fff" style={{ marginRight: 6 }} />
//           <Text style={{ color: '#fff' }}>Add reminder</Text>
//         </TouchableOpacity>
//       );
//     } else {
//       const dateStr = reminderTime
//         ? reminderTime.toDateString() + ', ' + reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         : 'No time';
//       return (
//         <TouchableOpacity
//           style={styles.reminderBtnActive}
//           onPress={() => setReminderModalVisible(true)}
//         >
//           <Icon name="alarm" size={20} color="#fff" style={{ marginRight: 6 }} />
//           <Text style={{ color: '#fff' }}>{dateStr}</Text>
//           {reminderPlace && (
//             <Text style={{ color: '#fff', marginLeft: 10 }}>@ {reminderPlace}</Text>
//           )}
//         </TouchableOpacity>
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={handleSave}>
//           <Icon name="arrow-back" size={28} color="#fff" style={styles.iconStyle} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{isEdit ? 'Edit Note' : 'New Note'}</Text>
//         <TouchableOpacity onPress={handleSave}>
//           <Icon name="save" size={28} color="#fff" style={styles.iconStyle} />
//         </TouchableOpacity>
//       </View>

//       {/* Note Inputs */}
//       <View style={styles.noteContainer}>
//         <TextInput
//           style={styles.titleInput}
//           placeholder="Title"
//           placeholderTextColor="#aaa"
//           value={title}
//           onChangeText={setTitle}
//         />
//         <TextInput
//           style={styles.noteInput}
//           placeholder="Note"
//           placeholderTextColor="#555"
//           multiline
//           value={description}
//           onChangeText={setDescription}
//         />
//         {(fromReminders || hasReminder) && (
//           <View style={{ marginTop: 16 }}>
//             {renderReminderButton()}
//           </View>
//         )}
//       </View>

//       {/* Bottom Bar */}
//       <View style={styles.bottomBar}>
//         <View style={styles.bottomLeftIcons}>
//           <TouchableOpacity style={styles.bottomIconContainer}>
//             <Icon name="add" size={24} color="#fff" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.bottomIconContainer}>
//             <Icon name="checklist" size={24} color="#fff" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.bottomIconContainer}>
//             <Icon name="text-fields" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.editedText}>
//           {isEdit ? 'Edited' : 'Created'} just now
//         </Text>
//       </View>

//       <EditReminderModal
//         visible={reminderModalVisible}
//         onClose={() => setReminderModalVisible(false)}
//         onSave={handleReminderSave}
//         initialDate={reminderTime}
//         initialPlace={reminderPlace}
//       />
//     </View>
//   );
// };

// export default ListNoteScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#121212' },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     backgroundColor: '#1e1e1e',
//   },
//   iconStyle: { marginHorizontal: 10 },
//   headerTitle: { flex: 1, color: '#fff', fontSize: 18, textAlign: 'center' },
//   noteContainer: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
//   titleInput: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 8,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#444',
//   },
//   noteInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#fff',
//     textAlignVertical: 'top',
//   },
//   bottomBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#333',
//     justifyContent: 'space-between',
//   },
//   bottomLeftIcons: { flexDirection: 'row', alignItems: 'center' },
//   bottomIconContainer: { marginRight: 16 },
//   editedText: { color: '#aaa', fontSize: 14 },
//   reminderBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1e88e5',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
//   reminderBtnActive: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#3d7eea',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
// });








// src_3/screens/ListNoteScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Alert,
 Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../App';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import EditReminderModal from '../components/EditReminderModal';
import { notifeeService } from '../notifeeService';

const ListNoteScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [hasReminder, setHasReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState(null);
  const [reminderPlace, setReminderPlace] = useState(null);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
 const [imageUri, setImageUri] = useState(null);

  const noteId = route.params?.noteId || null;
  const isEdit = !!noteId;
  const fromReminders = route.params?.fromReminders || false;

  useEffect(() => {
    if (isEdit) {
      fetchNoteForEdit(noteId);
    } else if (fromReminders) {
      setHasReminder(true);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(8, 0, 0, 0);
      setReminderTime(tomorrow);
      setReminderPlace('Home');
    }

   // If user came from FAB image pick
   if (route.params?.imageUri) {
     setImageUri(route.params.imageUri);
   }
  }, [noteId, isEdit, fromReminders, route.params?.imageUri]);

  const fetchNoteForEdit = async (id) => {
    try {
      const docRef = doc(db, 'notes', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists) {
        const data = snapshot.data();
        setTitle(data.title || '');
        setDescription(data.description || '');
        if (data.hasReminder) {
          setHasReminder(true);
          setReminderTime(data.reminderTime ? data.reminderTime.toDate() : null);
          setReminderPlace(data.reminderPlace || null);
        }
       if (data.imageUri) {
         setImageUri(data.imageUri);
       }
      }
    } catch (error) {
      console.log('Error fetching note:', error);
    }
  };

  useEffect(() => {
    const onBackPress = () => {
      handleSave();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [title, description, noteId, hasReminder, reminderTime, reminderPlace, imageUri]);

  const handleSave = async () => {
    if (title.trim() !== '' || description.trim() !== '' || imageUri) {
      try {
        let docRef;
        if (isEdit) {
          docRef = doc(db, 'notes', noteId);
          await updateDoc(docRef, {
            title,
            description,
            updatedAt: serverTimestamp(),
            hasReminder,
            reminderTime: reminderTime || null,
            reminderPlace: reminderPlace || null,
           imageUri: imageUri || null,
          });
          Alert.alert('Saved successfully');
        } else {
          const newDocRef = await addDoc(collection(db, 'notes'), {
            title,
            description,
            createdAt: serverTimestamp(),
            deleted: false,
            archived: false,
            hasReminder,
            reminderTime: reminderTime || null,
            reminderPlace: reminderPlace || null,
           imageUri: imageUri || null,
          });
          docRef = newDocRef;
          Alert.alert('Saved successfully');
        }

        // If reminder is set and reminderTime is in future, schedule local notification
        if (hasReminder && reminderTime && reminderTime > new Date()) {
          const docId = isEdit ? noteId : docRef.id;
          await notifeeService.scheduleReminder(docId, title, description, reminderTime);
        }
      } catch (error) {
        console.log('Error saving note: ', error);
        Alert.alert('Error', 'Failed to save note');
      }
    }
    // Clear fields
    setTitle('');
    setDescription('');
    setHasReminder(false);
    setReminderTime(null);
    setReminderPlace(null);
   setImageUri(null);

    navigation.goBack();
  };

  const handleReminderSave = (date, place) => {
    setHasReminder(true);
    setReminderTime(date);
    setReminderPlace(place);
  };

  const renderReminderButton = () => {
    if (!hasReminder) {
      return (
        <TouchableOpacity
          style={styles.reminderBtn}
          onPress={() => setReminderModalVisible(true)}
        >
          <Icon name="add-alert" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={{ color: '#fff' }}>Add reminder</Text>
        </TouchableOpacity>
      );
    } else {
      const dateStr = reminderTime
        ? reminderTime.toDateString() + ', ' + reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'No time';
      return (
        <TouchableOpacity
          style={styles.reminderBtnActive}
          onPress={() => setReminderModalVisible(true)}
        >
          <Icon name="alarm" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={{ color: '#fff' }}>{dateStr}</Text>
          {reminderPlace && (
            <Text style={{ color: '#fff', marginLeft: 10 }}>@ {reminderPlace}</Text>
          )}
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleSave}>
          <Icon name="arrow-back" size={28} color="#fff" style={styles.iconStyle} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEdit ? 'Edit Note' : 'New Note'}</Text>
        <TouchableOpacity onPress={handleSave}>
          <Icon name="save" size={28} color="#fff" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>

      {/* Note Inputs */}
      <View style={styles.noteContainer}>
       {imageUri && (
         <Image
           source={{ uri: imageUri }}
           style={{ width: '100%', height: 200, marginBottom: 10, borderRadius: 6 }}
           resizeMode="cover"
         />
       )}
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.noteInput}
          placeholder="Note"
          placeholderTextColor="#555"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {(fromReminders || hasReminder) && (
          <View style={{ marginTop: 16 }}>
            {renderReminderButton()}
          </View>
        )}
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomLeftIcons}>
          <TouchableOpacity style={styles.bottomIconContainer}>
            <Icon name="add" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIconContainer}>
            <Icon name="checklist" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIconContainer}>
            <Icon name="text-fields" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.editedText}>
          {isEdit ? 'Edited' : 'Created'} just now
        </Text>
      </View>

      <EditReminderModal
        visible={reminderModalVisible}
        onClose={() => setReminderModalVisible(false)}
        onSave={handleReminderSave}
        initialDate={reminderTime}
        initialPlace={reminderPlace}
      />
    </View>
  );
};

export default ListNoteScreen;





const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#1e1e1e',
  },
  iconStyle: { marginHorizontal: 10 },
  headerTitle: { flex: 1, color: '#fff', fontSize: 18, textAlign: 'center' },
  noteContainer: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#444',
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    textAlignVertical: 'top',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
    justifyContent: 'space-between',
  },
  bottomLeftIcons: { flexDirection: 'row', alignItems: 'center' },
  bottomIconContainer: { marginRight: 16 },
  editedText: { color: '#aaa', fontSize: 14 },
  reminderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e88e5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  reminderBtnActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3d7eea',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
});
