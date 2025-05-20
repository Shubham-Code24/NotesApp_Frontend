







// src_3/screens/EditLabelsScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

/**
 * EditLabelsScreen
 * - Top Bar: arrow-back (close), title: "Edit labels", check icon (optional)
 * - Below that: an input row to create new label
 * - Below that: list of existing labels, each with an edit icon
 */
const EditLabelsScreen = () => {
  const navigation = useNavigation();
  const [newLabel, setNewLabel] = useState('');
  const [labels, setLabels] = useState([]);

  // 1) Real-time fetch of all labels
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('labels')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          if (!snapshot) {
            setLabels([]);
            return;
          }
          const labelsArr = [];
          snapshot.forEach((docSnap) => {
            labelsArr.push({ id: docSnap.id, ...docSnap.data() });
          });
          setLabels(labelsArr);
        },
        (error) => {
          console.log('Error fetching labels:', error);
          setLabels([]);
        }
      );
    return () => unsubscribe && unsubscribe();
  }, []);

  // 2) Create new label
  const handleCreateLabel = async () => {
    if (newLabel.trim() === '') {
      return;
    }
    try {
      await firestore().collection('labels').add({
        name: newLabel.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setNewLabel('');
    } catch (error) {
      console.log('Error creating label:', error);
      Alert.alert('Error', 'Failed to create label');
    }
  };

  // 3) Optionally rename or delete label
  const handleDeleteLabel = async (labelId) => {
    try {
      await firestore().collection('labels').doc(labelId).delete();
    } catch (error) {
      console.log('Error deleting label:', error);
      Alert.alert('Error', 'Failed to delete label');
    }
  };

  // Top bar back
  const handleBack = () => {
    navigation.goBack();
  };

  // Render a single label row
  const renderLabelItem = ({ item }) => {
    return (
      <View style={styles.labelRow}>
        <Icon name="label" size={24} color="#ccc" style={{ marginRight: 8 }} />
        <Text style={styles.labelText}>{item.name}</Text>

        {/* Delete icon on right */}
        <TouchableOpacity
          style={{ marginLeft: 'auto' }}
          onPress={() => handleDeleteLabel(item.id)}
        >
          <Icon name="delete" size={22} color="#bbb" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={28} color="#fff" style={{ marginRight: 16 }} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit labels</Text>
      </View>

      {/* Create new label row */}
      <View style={styles.createRow}>
        <Icon name="add" size={24} color="#fff" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.createInput}
          placeholder="Create new label"
          placeholderTextColor="#888"
          value={newLabel}
          onChangeText={setNewLabel}
        />
        <TouchableOpacity onPress={handleCreateLabel}>
          <Icon name="check" size={24} color="#fff" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      {/* Labels list */}
      {labels.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{ color: '#aaa', fontSize: 16 }}>No labels found</Text>
        </View>
      ) : (
        <FlatList
          data={labels}
          keyExtractor={(item) => item.id}
          renderItem={renderLabelItem}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}
    </View>
  );
};

export default EditLabelsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e1e1e',
  },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  createInput: {
    flex: 1,
    color: '#fff',
    borderBottomWidth: 0,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  labelText: {
    color: '#fff',
    fontSize: 16,
  },
});
