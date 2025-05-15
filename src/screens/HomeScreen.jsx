




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
  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Notes data
  const [notes, setNotes] = useState([]);
  // Multi-selection
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  // Overflow menu
  const [modalVisible, setModalVisible] = useState(false);
  // For double-tap detection on text notes
  const [lastTap, setLastTap] = useState(0);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  // 1) Real-time fetch: archived == false, deleted == false
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
        (snapshot) => {
          if (snapshot && typeof snapshot.forEach === 'function') {
            const notesArray = [];
            snapshot.forEach((docSnap) => {
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

  // 2) Multi-select: Long press toggles selection
  const handleCardLongPress = (item) => {
    if (selectedNoteIds.includes(item.id)) {
      setSelectedNoteIds((prev) => prev.filter((id) => id !== item.id));
    } else {
      setSelectedNoteIds((prev) => [...prev, item.id]);
    }
  };

  // Cancel selection
  const handleCancelSelection = () => {
    setSelectedNoteIds([]);
  };

  // 3) Single/double tap logic:
  // - If drawingPath exists => single tap opens Drawing screen
  // - If text note => double tap opens ListNote screen
  const handleCardPress = (item) => {
    if (item.drawingPath) {
      // Single tap for drawing notes
      navigation.navigate('Drawing', { noteId: item.id, drawingPath: item.drawingPath });
    } else {
      // Double tap for text notes
      const now = Date.now();
      if (now - lastTap < 300) {
        navigation.navigate('Text', { noteId: item.id });
      }
      setLastTap(now);
    }
  };

  // 4) Overflow menu actions

  // (a) Archive
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
      console.log('Error archiving notes: ', error);
    }
  };

  // (b) Delete (moves notes to Deleted)
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
      console.log('Error deleting notes: ', error);
    }
  };

  // (c) Make a copy
  const makeCopySelectedNotes = async () => {
    try {
      const promises = selectedNoteIds.map(async (id) => {
        const noteRef = doc(db, 'notes', id);
        const docSnap = await getDoc(noteRef);
        if (docSnap.exists) {
          const data = docSnap.data();
          // Create a new note with the same content
          await addDoc(collection(db, 'notes'), {
            title: data.title || '',
            description: data.description || '',
            drawingPath: data.drawingPath || '',
            archived: false, // new copy is not archived
            deleted: false,  // new copy is not deleted
            createdAt: data.createdAt, // or serverTimestamp() if you prefer
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

  // (d) Send (placeholder)
  const sendSelectedNotes = () => {
    setSelectedNoteIds([]);
    setModalVisible(false);
    console.log('Send is clicked (placeholder)');
  };

  // (e) Copy to Google Docs (placeholder)
  const copyToGoogleDocsSelectedNotes = () => {
    setSelectedNoteIds([]);
    setModalVisible(false);
    console.log('Copy to Google Docs is clicked (placeholder)');
  };

  // 5) Render notes (text or drawing)
  const renderNotes = () => {
    if (notes.length === 0) {
      return (
        <View style={styles.centerContent}>
          <Icon name="lightbulb-outline" size={80} color="#fff" style={styles.lightBulbIcon} />
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
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (selectedNoteIds.length > 0) {
                  // If we already have selection, a normal tap toggles selection
                  handleCardLongPress(item);
                } else {
                  // Otherwise handle single/double tap logic
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
                // Drawing note => Show a small preview
                <View style={{ flex: 1 }}>
                  <Svg style={{ width: '100%', height: 80 }}>
                    <Path d={item.drawingPath} stroke="#fff" strokeWidth={1.5} fill="none" />
                  </Svg>
                </View>
              ) : (
                // Text note => Title + Description
                <>
                  {item.title ? <Text style={styles.noteTitle}>{item.title}</Text> : null}
                  {item.description ? <Text style={styles.noteDescription}>{item.description}</Text> : null}
                </>
              )}
            </TouchableOpacity>
          )}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Drawer */}
      <CustomDrawer visible={drawerOpen} onClose={toggleDrawer} />

      {/* Top Bar: either selection bar or normal bar */}
      {selectedNoteIds.length > 0 ? (
        // Selection Top Bar
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleCancelSelection}>
            <Icon name="close" size={28} color="#fff" style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedNoteIds.length}</Text>
          <View style={{ flex: 1 }} />
          {/* 3-dot menu for multi-select actions */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="more-vert" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        // Normal Top Bar
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

      {/* Notes List */}
      {renderNotes()}

      {/* FAB for new note */}
      <FABMenu
        onTextPress={() => {
          navigation.navigate('Text');
        }}
      />

      {/* Modal for multi-select overflow menu */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButton} onPress={archiveSelectedNotes}>
              <Text style={styles.modalButtonText}>Archive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={deleteSelectedNotes}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={makeCopySelectedNotes}>
              <Text style={styles.modalButtonText}>Make a copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={sendSelectedNotes}>
              <Text style={styles.modalButtonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={copyToGoogleDocsSelectedNotes}>
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
  noteTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  noteDescription: {
    color: '#ccc',
    fontSize: 14,
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
    paddingVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#000',
  },
});
