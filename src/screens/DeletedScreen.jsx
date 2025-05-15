




// src_3/screens/DeletedScreen.jsx
import React, { useState, useEffect } from 'react';
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
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
} from '@react-native-firebase/firestore';

const DeletedScreen = ({ navigation }) => {
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Real-time fetch of deleted notes (deleted == true)
  useEffect(() => {
    let unsubscribe;
    try {
      const q = query(
        collection(db, 'notes'),
        where('deleted', '==', true),
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
            setDeletedNotes(notesArray);
          } else {
            console.warn('Received invalid snapshot in DeletedScreen');
          }
        },
        (error) => {
          console.error('Error fetching deleted notes:', error);
        }
      );
    } catch (error) {
      console.error('Error setting up real-time listener for deleted notes:', error);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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

  // Permanently delete
  const permanentlyDeleteNotes = async () => {
    try {
      const promises = selectedNoteIds.map(async (id) => {
        await deleteDoc(doc(db, 'notes', id));
      });
      await Promise.all(promises);
      setSelectedNoteIds([]);
      setModalVisible(false);
    } catch (error) {
      console.log('Error permanently deleting notes:', error);
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
          // New copy => not deleted or archived
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
      console.log('Error making copy of deleted notes:', error);
    }
  };

  // Send (placeholder)
  const sendSelectedNotes = () => {
    setSelectedNoteIds([]);
    setModalVisible(false);
    console.log('Send is clicked (placeholder)');
  };

  // Copy to Google Docs (placeholder)
  const copyToGoogleDocsSelectedNotes = () => {
    setSelectedNoteIds([]);
    setModalVisible(false);
    console.log('Copy to Google Docs is clicked (placeholder)');
  };

  const renderDeletedNotes = () => {
    if (deletedNotes.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No deleted notes</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={deletedNotes}
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
                  {item.title ? <Text style={styles.noteTitle}>{item.title}</Text> : null}
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
        // Selection bar
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
        // Normal bar
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="#fff" style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Deleted Notes</Text>
        </View>
      )}

      {renderDeletedNotes()}

      {/* Overflow menu for selected items */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            {/* Permanently Delete */}
            <TouchableOpacity style={styles.modalButton} onPress={permanentlyDeleteNotes}>
              <Text style={styles.modalButtonText}>Permanently Delete</Text>
            </TouchableOpacity>
            {/* Make a copy */}
            <TouchableOpacity style={styles.modalButton} onPress={makeCopySelectedNotes}>
              <Text style={styles.modalButtonText}>Make a copy</Text>
            </TouchableOpacity>
            {/* Send */}
            <TouchableOpacity style={styles.modalButton} onPress={sendSelectedNotes}>
              <Text style={styles.modalButtonText}>Send</Text>
            </TouchableOpacity>
            {/* Copy to Google Docs */}
            <TouchableOpacity style={styles.modalButton} onPress={copyToGoogleDocsSelectedNotes}>
              <Text style={styles.modalButtonText}>Copy to Google Docs</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DeletedScreen;

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
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: { paddingVertical: 10, width: '100%', alignItems: 'center' },
  modalButtonText: { fontSize: 16, color: 'red', fontWeight: 'bold' },
});
