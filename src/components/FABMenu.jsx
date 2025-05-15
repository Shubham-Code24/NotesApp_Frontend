

// src_3/components/FABMenu.jsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const FABMenu = ({ onTextPress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const toggleMenu = () => {
    if (isOpen) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const menuItems = [
    {
      icon: 'image',
      label: 'Image',
      onPress: () => {
        console.log('Image pressed');
        toggleMenu();
      },
    },
    {
      icon: 'format-list-bulleted',
      label: 'List',
      onPress: () => {
        console.log('List pressed');
        toggleMenu();
      },
    },
    {
      icon: 'edit',
      label: 'Drawing',
      onPress: () => {
        toggleMenu();
        // Navigate to the "Drawing" screen
        navigation.navigate('Drawing');
      },
    },
    {
      icon: 'title',
      label: 'Text',
      onPress: () => {
        toggleMenu();
        onTextPress && onTextPress();
      },
    },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => {
        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -((menuItems.length - index) * 70)],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.menuItem,
              { transform: [{ translateY }], opacity: animation },
            ]}
            pointerEvents={isOpen ? 'auto' : 'none'}
          >
            <TouchableOpacity style={styles.menuButton} onPress={item.onPress}>
              <Icon name={item.icon} size={24} color="#fff" />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <Icon name={isOpen ? 'close' : 'add'} size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default FABMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'center',
  },
  menuItem: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#1e3a8a',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    minWidth: 110,
    maxWidth: 150,
    justifyContent: 'flex-start',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 15,
  },
  fab: {
    backgroundColor: '#1e88e5',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
});
