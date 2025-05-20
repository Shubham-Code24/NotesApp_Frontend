











// src_3/screens/CheckListScreen.jsx

import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, FlatList, Alert, BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const CheckListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const noteId = route.params?.noteId || null;
  const isEdit = !!noteId;

  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]); // [{ text, checked }, ...]

  useEffect(() => {
    if (isEdit) {
      fetchNoteForEdit(noteId);
    }
  }, [isEdit, noteId]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleSave);
    return () => backHandler.remove();
  }, [title, items]);

  const fetchNoteForEdit = async (id) => {
    try {
      const docRef = firestore().collection('notes').doc(id);
      const snapshot = await docRef.get();
      if (snapshot.exists) {
        const data = snapshot.data();
        setTitle(data.title || '');
        if (data.items && Array.isArray(data.items)) {
          setItems(data.items);
        }
      }
    } catch (error) {
      console.log('Error fetching note:', error);
    }
  };

  const handleSave = () => {
    saveNote();
    return true; // prevent default back
  };

  const saveNote = async () => {
    if (title.trim() === '' && items.length === 0) {
      navigation.goBack();
      return;
    }
    try {
      if (isEdit) {
        // Update existing doc
        await firestore().collection('notes').doc(noteId).update({
          title,
          items,
          isList: true,
          updatedAt: firestore.FieldValue.serverTimestamp(),
          // keep other fields (deleted=false, archived=false) as they were
        });
      } else {
        // Create new doc
        await firestore().collection('notes').add({
          title,
          items,
          isList: true,
          createdAt: firestore.FieldValue.serverTimestamp(),
          deleted: false,
          archived: false,
        });
      }
      Alert.alert('Saved successfully');
    } catch (error) {
      console.log('Error saving checklist note:', error);
      Alert.alert('Error', 'Failed to save note');
    }
    navigation.goBack();
  };

  const addNewItem = () => {
    setItems([...items, { text: '', checked: false }]);
  };

  const toggleCheck = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const updateItemText = (index, newText) => {
    const newItems = [...items];
    newItems[index].text = newText;
    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemRow}>
        <TouchableOpacity onPress={() => toggleCheck(index)}>
          <Icon
            name={item.checked ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color="#fff"
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.itemText, item.checked && { textDecorationLine: 'line-through', color: '#aaa' }]}
          placeholder="List item"
          placeholderTextColor="#555"
          value={item.text}
          onChangeText={(txt) => updateItemText(index, txt)}
        />
        <TouchableOpacity onPress={() => removeItem(index)} style={{ marginLeft: 'auto' }}>
          <Icon name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleSave}>
          <Icon name="arrow-back" size={28} color="#fff" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>List Item Note</Text>
        <TouchableOpacity onPress={saveNote}>
          <Icon name="save" size={28} color="#fff" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.noteContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
        />
        {/* Items List */}
        <FlatList
          data={items}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderItem}
        />

        <TouchableOpacity style={styles.addItemBtn} onPress={addNewItem}>
          <Icon name="add" size={24} color="#fff" style={{ marginRight: 6 }} />
          <Text style={{ color: '#fff', fontSize: 16 }}>List item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
  },
  noteContainer: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#444',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  addItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e88e5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 12,
  },
});

