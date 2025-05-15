



// src_3/screens/ArchivedScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../App';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  updateDoc,
  addDoc,
  getDoc,
} from '@react-native-firebase/firestore';

const ArchivedScreen = ({ navigation }) => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Real-time fetch of archived notes (archived == true, deleted == false)
  useEffect(() => {
    let unsubscribe;
    try {
      const q = query(
        collection(db, 'notes'),
        where('archived', '==', true),
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
            setArchivedNotes(notesArray);
          } else {
            console.warn('Received invalid snapshot in ArchivedScreen');
          }
        },
        (error) => {
          console.error('Error fetching archived notes in real time:', error);
        }
      );
    } catch (error) {
      console.error('Error setting up archived notes listener:', error);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Toggle selection on long press
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

  // Unarchive selected notes
  const unarchiveSelectedNotes = async () => {
    try {
      const promises = selectedNoteIds.map(async (id) => {
        const noteRef = doc(db, 'notes', id);
        await updateDoc(noteRef, { archived: false });
      });
      await Promise.all(promises);
      setSelectedNoteIds([]);
      setModalVisible(false);
    } catch (error) {
      console.log('Error unarchiving notes: ', error);
    }
  };

  // Delete selected notes (move to Deleted)
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

  // Make a copy
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
            archived: false, // new copy not archived
            deleted: false,  // new copy not deleted
            createdAt: data.createdAt,
          });
        }
      });
      await Promise.all(promises);
      setSelectedNoteIds([]);
      setModalVisible(false);
    } catch (error) {
      console.log('Error making a copy of archived notes:', error);
    }
  };

  // Send (placeholder)
  const sendSelectedNotes = () => {
    setModalVisible(false);
    setSelectedNoteIds([]);
    console.log('Send is clicked (placeholder)');
  };

  // Copy to Google Docs (placeholder)
  const copyToGoogleDocsSelectedNotes = () => {
    setModalVisible(false);
    setSelectedNoteIds([]);
    console.log('Copy to Google Docs is clicked (placeholder)');
  };

  const renderArchivedNotes = () => {
    if (archivedNotes.length === 0) {
      // Empty state
      return (
        <View style={styles.emptyContainer}>
          <Icon name="archive" size={80} color="#666" style={styles.emptyIcon} />
          <Text style={styles.emptyText}>Your archived notes appear here</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={archivedNotes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 10 }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onLongPress={() => handleCardLongPress(item)}
              style={[
                styles.noteCard,
                selectedNoteIds.includes(item.id) && { borderColor: 'green', borderWidth: 2 },
              ]}
            >
              {item.drawingPath ? (
                <View style={{ flex: 1 }}>
                  <Icon name="gesture" size={24} color="#fff" style={{ marginBottom: 8 }} />
                  <Text style={{ color: '#aaa', fontSize: 12 }}>
                    (Drawing preview could go here)
                  </Text>
                </View>
              ) : (
                <>
                  {item.title ? (
                    <Text style={styles.noteTitle}>{item.title}</Text>
                  ) : null}
                  {item.description ? (
                    <Text style={styles.noteDescription}>{item.description}</Text>
                  ) : null}
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
      {/* Top Bar */}
      {selectedNoteIds.length > 0 ? (
        // Selection Top Bar
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
        // Normal Top Bar
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="#fff" style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Archive</Text>
          <View style={{ flex: 1 }} />
          <Icon name="search" size={24} color="#fff" style={{ marginRight: 16 }} />
          <Icon name="view-agenda" size={24} color="#fff" />
        </View>
      )}

      {/* Archived Notes List */}
      {renderArchivedNotes()}

      {/* Modal for Overflow Menu */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButton} onPress={unarchiveSelectedNotes}>
              <Text style={styles.modalButtonText}>Unarchive</Text>
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

export default ArchivedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuIcon: { marginRight: 16 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: { marginBottom: 16 },
  emptyText: { color: '#fff', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
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
