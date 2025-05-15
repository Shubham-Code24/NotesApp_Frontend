



// src_3/screens/SettingsScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  // Local states for toggles (purely UI)
  const [addItemsBottom, setAddItemsBottom] = useState(true);
  const [moveTickedBottom, setMoveTickedBottom] = useState(true);
  const [richLinkPreviews, setRichLinkPreviews] = useState(false);
  const [enableSharing, setEnableSharing] = useState(true);

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
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Display Options */}
        <Text style={styles.sectionHeader}>Display options</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Add new items to bottom</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#3d3d3d' }}
            thumbColor={addItemsBottom ? '#1e88e5' : '#f4f3f4'}
            onValueChange={() => setAddItemsBottom(!addItemsBottom)}
            value={addItemsBottom}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Move ticked items to bottom</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#3d3d3d' }}
            thumbColor={moveTickedBottom ? '#1e88e5' : '#f4f3f4'}
            onValueChange={() => setMoveTickedBottom(!moveTickedBottom)}
            value={moveTickedBottom}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Display rich link previews</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#3d3d3d' }}
            thumbColor={richLinkPreviews ? '#1e88e5' : '#f4f3f4'}
            onValueChange={() => setRichLinkPreviews(!richLinkPreviews)}
            value={richLinkPreviews}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Theme</Text>
          <Text style={styles.subText}>System default</Text>
        </View>

        {/* Reminder Defaults */}
        <Text style={styles.sectionHeader}>Reminder defaults</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Morning</Text>
          <Text style={styles.subText}>08:00</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Afternoon</Text>
          <Text style={styles.subText}>13:00</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Evening</Text>
          <Text style={styles.subText}>18:00</Text>
        </View>

        {/* Sharing */}
        <Text style={styles.sectionHeader}>Sharing</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Enable sharing</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#3d3d3d' }}
            thumbColor={enableSharing ? '#1e88e5' : '#f4f3f4'}
            onValueChange={() => setEnableSharing(!enableSharing)}
            value={enableSharing}
          />
        </View>

        {/* Reload my account */}
        <TouchableOpacity style={styles.reloadContainer}>
          <Text style={styles.reloadText}>Reload my account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconStyle: {
    marginRight: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowText: {
    color: '#fff',
    fontSize: 16,
  },
  subText: {
    color: '#aaa',
    fontSize: 16,
  },
  reloadContainer: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  reloadText: {
    color: '#1e88e5',
    fontSize: 16,
  },
});
