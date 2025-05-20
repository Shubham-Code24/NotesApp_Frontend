







import React from 'react';
import {
  Modal,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';


import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePickerModal = ({ visible, onClose }) => {
  // to open camera
  const handleTakePhoto = async () => {
    onClose(); // Modal बंद
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true, // save photo in gallery
    });
    if (!result.didCancel && !result.errorCode) {
      console.log('Camera Image URI:', result.assets[0].uri);
      // is URI ko apne note ke saath store kar sakte hai, ya Firestore me upload kar sakte ho
    }
  };

  // to open gallery

  const handleChooseImage = async () => {
    onClose(); // Modal बंद
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (!result.didCancel && !result.errorCode) {
      console.log('Gallery Image URI:', result.assets[0].uri);
      // Aap is URI ko note ke saath store kar sakte ho, ya Firestore me upload kar sakte ho
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose} // Android back press par modal band ho
    >
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add image</Text>

          {/* Take photo */}
          <TouchableOpacity style={styles.option} onPress={handleTakePhoto}>
            <Icon name="photo-camera" size={24} color="#000" style={{ marginRight: 10 }} />
            <Text style={styles.optionText}>Take photo</Text>
          </TouchableOpacity>

          {/* Choose image */}
          <TouchableOpacity style={styles.option} onPress={handleChooseImage}>
            <Icon name="image" size={24} color="#000" style={{ marginRight: 10 }} />
            <Text style={styles.optionText}>Choose image</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    color: '#000',
    fontSize: 15,
  },
});
