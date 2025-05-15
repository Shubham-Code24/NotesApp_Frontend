




// src_3/screens/DrawingScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg';
import { db } from '../../App';
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
  getDoc,
} from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const DrawingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // If editing an existing drawing
  const editingNoteId = route.params?.noteId || null;
  const initialDrawing = route.params?.drawingPath || '';

  // Keep track of the complete path data
  const [pathData, setPathData] = useState(initialDrawing);
  const pathRef = useRef(initialDrawing);

  // PanResponder to accumulate strokes
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart: (evt, gestureState) => {
        // Append a new sub-path with "M"
        const newStroke = ` M${gestureState.x0},${gestureState.y0}`;
        pathRef.current += newStroke;
        setPathData(pathRef.current);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Append line segments with "L"
        const newLine = ` L${gestureState.moveX},${gestureState.moveY}`;
        pathRef.current += newLine;
        setPathData(pathRef.current);
      },
      onPanResponderRelease: () => {
        // Do nothing special here
      },
    })
  ).current;

  useEffect(() => {
    // If editing, optionally fetch the latest note data again
  }, [editingNoteId]);

  const handleSave = async () => {
    if (!pathData.trim()) {
      Alert.alert('No drawing', 'Please draw something before saving.');
      return;
    }
    try {
      if (editingNoteId) {
        // Update existing drawing
        await updateDoc(doc(db, 'notes', editingNoteId), {
          drawingPath: pathData,
          updatedAt: serverTimestamp(),
        });
        Alert.alert('Success', 'Drawing updated successfully!');
      } else {
        // Create a new drawing note
        await addDoc(collection(db, 'notes'), {
          drawingPath: pathData,
          createdAt: serverTimestamp(),
          archived: false,
          deleted: false,
        });
        Alert.alert('Success', 'Drawing saved successfully!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving drawing:', error);
      Alert.alert('Error', 'Failed to save drawing');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={28} color="#fff" style={styles.iconStyle} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Drawing</Text>
        <TouchableOpacity onPress={handleSave}>
          <Icon name="save" size={28} color="#fff" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>

      {/* Drawing Canvas */}
      <View style={styles.drawingArea} {...panResponder.panHandlers}>
        <Svg style={{ flex: 1 }}>
          <Path d={pathData} stroke="#fff" strokeWidth={2} fill="none" />
        </Svg>
      </View>
    </View>
  );
};

export default DrawingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#1e1e1e',
  },
  iconStyle: {
    marginHorizontal: 10,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  drawingArea: {
    flex: 1,
  },
});
