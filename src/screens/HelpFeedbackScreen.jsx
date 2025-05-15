






// src_3/screens/HelpFeedbackScreen.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const HelpFeedbackScreen = () => {
  const navigation = useNavigation();

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
        <Text style={styles.title}>Help</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="#aaa" style={{ marginLeft: 10 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Popular help resources */}
        <Text style={styles.sectionHeader}>Popular help resources</Text>

        <TouchableOpacity style={styles.helpItem}>
          <Icon name="description" size={24} color="#bbb" style={styles.helpIcon} />
          <Text style={styles.helpText}>Archive notes and lists</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem}>
          <Icon name="lock-outline" size={24} color="#bbb" style={styles.helpIcon} />
          <Text style={styles.helpText}>
            Use Keep to protect your privacy and stay in control
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem}>
          <Icon name="list" size={24} color="#bbb" style={styles.helpIcon} />
          <Text style={styles.helpText}>
            Change list, reminder and sharing settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem}>
          <Icon name="help-outline" size={24} color="#bbb" style={styles.helpIcon} />
          <Text style={styles.helpText}>How to use Google Keep</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem}>
          <Icon name="home" size={24} color="#bbb" style={styles.helpIcon} />
          <Text style={styles.helpText}>
            Get notes on your Android home screen
          </Text>
        </TouchableOpacity>

        {/* Need more help? */}
        <Text style={styles.sectionHeader}>Need more help?</Text>
        <TouchableOpacity style={styles.communityContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="group" size={24} color="#1e88e5" style={{ marginRight: 10 }} />
            <View>
              <Text style={styles.communityTitle}>Post to the Help Community</Text>
              <Text style={styles.communitySubtitle}>
                Get answers from community members
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Send Feedback */}
        <TouchableOpacity style={styles.sendFeedbackContainer}>
          <Icon name="feedback" size={24} color="#1e88e5" style={{ marginRight: 10 }} />
          <Text style={styles.sendFeedbackText}>Send Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HelpFeedbackScreen;

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
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 20,
    height: 48,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sectionHeader: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 4,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  helpIcon: {
    marginRight: 16,
  },
  helpText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
  communityContainer: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  communityTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  communitySubtitle: {
    color: '#aaa',
    fontSize: 14,
  },
  sendFeedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sendFeedbackText: {
    color: '#1e88e5',
    fontSize: 16,
  },
});
