



// GoogleKeep/src/components/EditReminderModal.jsx

import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// DateTimePicker library
import DateTimePicker from '@react-native-community/datetimepicker';

const EditReminderModal = ({
  visible,
  onClose,
  onSave,
  initialDate,
  initialPlace,
}) => {
  const [date, setDate] = useState(initialDate || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [place, setPlace] = useState(initialPlace || 'Home'); // or 'Work'

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  const handleSavePress = () => {
    onSave(date, place);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit reminder</Text>

          {/* Time tab */}
          <View style={styles.row}>
            <Text style={styles.label}>Date & Time:</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setShowDatePicker(true)}
            >
              <Icon name="event" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setShowTimePicker(true)}
            >
              <Icon name="access-time" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 8, color: '#000' }}>
              {date.toDateString()}, {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>

          {/* Place tab */}
          <View style={styles.row}>
            <Text style={styles.label}>Place:</Text>
            <TouchableOpacity style={styles.placeBtn} onPress={() => setPlace('Home')}>
              <Icon name={place === 'Home' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#000" />
              <Text style={{ marginLeft: 6 }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.placeBtn} onPress={() => setPlace('Work')}>
              <Icon name={place === 'Work' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#000" />
              <Text style={{ marginLeft: 6 }}>Work</Text>
            </TouchableOpacity>
            {/* Optionally add an 'Edit location' if you want custom location */}
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'red' }]} onPress={() => { /* handle delete if needed */ }}>
              <Text style={{ color: '#fff' }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#ccc' }]} onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#1e88e5' }]} onPress={handleSavePress}>
              <Text style={{ color: '#fff' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* DateTimePickers */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
    </Modal>
  );
};

export default EditReminderModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff', borderRadius: 8, padding: 16, width: '80%'
  },
  modalTitle: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 16
  },
  row: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap'
  },
  label: { marginRight: 8, fontWeight: 'bold', color: '#000' },
  btn: {
    marginHorizontal: 6, padding: 6, backgroundColor: '#ddd', borderRadius: 6
  },
  placeBtn: {
    flexDirection: 'row', alignItems: 'center', marginLeft: 10
  },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20
  },
  actionBtn: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, marginLeft: 10
  },
});
