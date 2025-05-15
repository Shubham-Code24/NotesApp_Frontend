






// GoogleKeep/src/screens/RemindersScreen.jsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDrawer from '../components/CustomDrawer';
import FABMenu from '../components/FABMenu';
import { db } from '../../App';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from '@react-native-firebase/firestore';

const RemindersScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    const q = query(
      collection(db, 'notes'),
      where('hasReminder', '==', true),
      where('deleted', '==', false),
      where('archived', '==', false),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot) {
        console.log('Reminders snapshot is null');
        setNotes([]);
        return;
      }
      let reminderNotes = [];
      snapshot.forEach((docSnap) => {
        reminderNotes.push({ id: docSnap.id, ...docSnap.data() });
      });
      setNotes(reminderNotes);
    }, (error) => {
      console.log('onSnapshot error in RemindersScreen:', error);
      setNotes([]);
    });
    return () => unsubscribe();
  }, []);

  const renderNotes = () => {
    if (notes.length === 0) {
      return (
        <View style={styles.centerContent}>
          <Icon name="notifications-none" size={80} color="#fff" style={styles.bellIcon} />
          <Text style={styles.centerText}>Notes with upcoming reminders appear here</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => {
            let dateStr = '';
            if (item.reminderTime) {
              const d = item.reminderTime.toDate ? item.reminderTime.toDate() : new Date(item.reminderTime);
              dateStr = d.toDateString() + ', ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            return (
              <View style={styles.noteCard}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteDescription}>{item.description}</Text>
                {dateStr ? (
                  <View style={styles.reminderLabel}>
                    <Icon name="alarm" size={16} color="#fff" style={{ marginRight: 4 }} />
                    <Text style={{ color: '#fff', fontSize: 13 }}>{dateStr}</Text>
                    {item.reminderPlace && (
                      <Text style={{ color: '#fff', marginLeft: 6, fontSize: 13 }}>@ {item.reminderPlace}</Text>
                    )}
                  </View>
                ) : null}
              </View>
            );
          }}
        />
      );
    }
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
          <Text style={styles.profileText}>N</Text>
        </TouchableOpacity>
      </View>

      {renderNotes()}

      <FABMenu 
        onTextPress={() => {
          // Navigate to ListNoteScreen with fromReminders param
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
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  menuIcon: { marginRight: 16 },
  headerTitle: { flex: 1, color: '#fff', fontSize: 18, fontWeight: 'bold' },
  iconStyle: { marginRight: 16 },
  profileIconContainer: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#1e1e1e', justifyContent: 'center', alignItems: 'center',
  },
  profileText: { color: '#fff', fontWeight: 'bold' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bellIcon: { marginBottom: 16 },
  centerText: { color: '#fff', fontSize: 16 },
  noteCard: {
    backgroundColor: '#1e1e1e', borderRadius: 8,
    padding: 10, marginBottom: 10,
  },
  noteTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  noteDescription: { color: '#ccc', fontSize: 14, marginBottom: 6 },
  reminderLabel: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#333', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 3,
    alignSelf: 'flex-start',
  },
});
