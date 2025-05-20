





// // // src_3/components/CustomDrawer.jsx
// // import 'react-native-gesture-handler';
// // import React, { useEffect, useRef } from 'react';
// // import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import { useNavigation } from '@react-navigation/native';

// // const CustomDrawer = ({ visible, onClose }) => {
// //   const navigation = useNavigation();
// //   const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen

// //   useEffect(() => {
// //     if (visible) {
// //       Animated.timing(slideAnim, {
// //         toValue: 0,
// //         duration: 300,
// //         useNativeDriver: false,
// //       }).start();
// //     } else {
// //       Animated.timing(slideAnim, {
// //         toValue: -300,
// //         duration: 300,
// //         useNativeDriver: false,
// //       }).start();
// //     }
// //   }, [visible, slideAnim]);

// //   const drawerItems = [
// //     { icon: 'lightbulb-outline', label: 'Notes' },
// //     { icon: 'notifications-none', label: 'Reminders' },
// //     { icon: 'label-outline', label: 'Create new label' },
// //     { icon: 'archive', label: 'Archive' },
// //     { icon: 'delete-outline', label: 'Deleted' },
// //     { icon: 'settings', label: 'Settings' },
// //     { icon: 'help-outline', label: 'Help & feedback' },
// //   ];

// //   const handleItemPress = (item) => {
// //     onClose();
// //     if (item.label === 'Notes') {
// //       navigation.navigate('Home');
// //     } else if (item.label === 'Archive') {
// //       navigation.navigate('Archived');
// //     } else if (item.label === 'Deleted') {
// //       navigation.navigate('Deleted');
// //     } else if (item.label === 'Settings') {
// //       navigation.navigate('Settings');
// //     } else if (item.label === 'Help & feedback') {
// //       navigation.navigate('HelpFeedback');
// //     } else {
// //       console.log('Clicked:', item.label);
// //     }
// //   };

  

// //   return (
// //     <>
// //       {visible && (
// //         <TouchableWithoutFeedback onPress={onClose}>
// //           <View style={styles.overlay} />
// //         </TouchableWithoutFeedback>
// //       )}
// //       <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
// //         <View style={styles.drawerHeader}>
// //           <Text style={styles.drawerHeaderText}>Fundoo Notes</Text>
// //         </View>
// //         {drawerItems.map((item, index) => (
// //           <TouchableOpacity
// //             key={index}
// //             style={styles.drawerItem}
// //             onPress={() => handleItemPress(item)}
// //           >
// //             <Icon name={item.icon} size={24} color="#000000" style={styles.drawerItemIcon} />
// //             <Text style={styles.drawerItemText}>{item.label}</Text>
// //           </TouchableOpacity>
// //         ))}
// //       </Animated.View>
// //     </>
// //   );
// // };

// // export default CustomDrawer;

// // const styles = StyleSheet.create({
// //   overlay: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     backgroundColor: 'rgb(2, 3, 3)',
// //   },
// //   drawerContainer: {
// //     position: 'absolute',
// //     top: 0,
// //     bottom: 0,
// //     width: 280,
// //     backgroundColor: 'rgba(242, 241, 241, 0.9)',
// //     paddingTop: 40,
// //     zIndex: 1,
// //   },
// //   drawerHeader: {
// //     paddingHorizontal: 16,
// //     paddingVertical: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#333',
// //   },
// //   drawerHeaderText: {
// //     color: '#000000',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   drawerItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: 16,
// //     paddingVertical: 14,
// //   },
// //   drawerItemIcon: {
// //     marginRight: 20,
// //   },
// //   drawerItemText: {
// //     color: '#000000',
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },
// // });
















// // src_3/components/CustomDrawer.jsx
// import 'react-native-gesture-handler';
// import React, { useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';

// const CustomDrawer = ({ visible, onClose }) => {
//   const navigation = useNavigation();
//   const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen

//   useEffect(() => {
//     if (visible) {
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: false,
//       }).start();
//     } else {
//       Animated.timing(slideAnim, {
//         toValue: -300,
//         duration: 300,
//         useNativeDriver: false,
//       }).start();
//     }
//   }, [visible, slideAnim]);

//   const drawerItems = [
//     { icon: 'lightbulb-outline', label: 'Notes' },
//     { icon: 'notifications-none', label: 'Reminders' },
//     { icon: 'label-outline', label: 'Create new label' },
//     { icon: 'archive', label: 'Archive' },
//     { icon: 'delete-outline', label: 'Deleted' },
//     { icon: 'settings', label: 'Settings' },
//     { icon: 'help-outline', label: 'Help & feedback' },
//   ];

//   const handleItemPress = (item) => {
//     onClose();
//     if (item.label === 'Notes') {
//       navigation.navigate('Home');
//     } else if (item.label === 'Archive') {
//       navigation.navigate('Archived');
//     } else if (item.label === 'Reminders') {
//       navigation.navigate('Reminders');
//     } else if (item.label === 'Deleted') {
//       navigation.navigate('Deleted');
//     } else if (item.label === 'Settings') {
//       navigation.navigate('Settings');
//     } else if (item.label === 'Help & feedback') {
//       navigation.navigate('HelpFeedback');
//     } else {
//       console.log('Clicked:', item.label);
//     }
//   };

  

//   return (
//     <>
//       {visible && (
//         <TouchableWithoutFeedback onPress={onClose}>
//           <View style={styles.overlay} />
//         </TouchableWithoutFeedback>
//       )}
//       <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
//         <View style={styles.drawerHeader}>
//           <Text style={styles.drawerHeaderText}>Fundoo Notes</Text>
//         </View>
//         {drawerItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.drawerItem}
//             onPress={() => handleItemPress(item)}
//           >
//             <Icon name={item.icon} size={24} color="#000000" style={styles.drawerItemIcon} />
//             <Text style={styles.drawerItemText}>{item.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </Animated.View>
//     </>
//   );
// };

// export default CustomDrawer;

// const styles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgb(2, 3, 3)',
//   },
//   drawerContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     width: 280,
//     backgroundColor: 'rgba(242, 241, 241, 0.9)',
//     paddingTop: 40,
//     zIndex: 1,
//   },
//   drawerHeader: {
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   drawerHeaderText: {
//     color: '#000000',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   drawerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//   },
//   drawerItemIcon: {
//     marginRight: 20,
//   },
//   drawerItemText: {
//     color: '#000000',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });








// src_3/components/CustomDrawer.jsx
import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const CustomDrawer = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen

  // 1) We keep an array of labels from Firestore
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, slideAnim]);

  // 2) Real-time fetch labels
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
          const arr = [];
          snapshot.forEach((docSnap) => {
            arr.push({ id: docSnap.id, ...docSnap.data() });
          });
          setLabels(arr);
        },
        (error) => {
          console.log('Error fetching labels in drawer:', error);
          setLabels([]);
        }
      );
    return () => unsubscribe && unsubscribe();
  }, []);

  const drawerItems = [
    { icon: 'lightbulb-outline', label: 'Notes' },
    { icon: 'notifications-none', label: 'Reminders' },
    // We'll handle 'Create new label' as a separate item or so
    { icon: 'archive', label: 'Archive' },
    { icon: 'delete-outline', label: 'Deleted' },
    { icon: 'settings', label: 'Settings' },
    { icon: 'help-outline', label: 'Help & feedback' },
  ];

  const handleItemPress = (item) => {
    onClose();
    if (item.label === 'Notes') {
      navigation.navigate('Home');
    } else if (item.label === 'Reminders') {
      navigation.navigate('Reminders');
    } else if (item.label === 'Archive') {
      navigation.navigate('Archived');
    } else if (item.label === 'Deleted') {
      navigation.navigate('Deleted');
    } else if (item.label === 'Settings') {
      navigation.navigate('Settings');
    } else if (item.label === 'Help & feedback') {
      navigation.navigate('HelpFeedback');
    } else {
      console.log('Clicked:', item.label);
    }
  };

  const handleCreateNewLabel = () => {
    onClose();
    navigation.navigate('EditLabels'); // We'll define a route named 'EditLabels'
  };

  return (
    <>
      {visible && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderText}>Fundoo Notes</Text>
        </View>

        {/* Drawer Main Items */}
        {drawerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.drawerItem}
            onPress={() => handleItemPress(item)}
          >
            <Icon name={item.icon} size={24} color="#000000" style={styles.drawerItemIcon} />
            <Text style={styles.drawerItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Section: Labels heading */}
        <View style={styles.labelsHeader}>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Labels</Text>
          {/* 'Edit' button -> goes to EditLabelsScreen */}
          <TouchableOpacity
            onPress={() => {
              onClose();
              navigation.navigate('EditLabels');
            }}
          >
            <Text style={{ color: '#000', fontSize: 14, marginLeft: 10 }}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Display all labels from Firestore */}
        {labels.map((lbl) => (
          <View key={lbl.id} style={styles.drawerItem}>
            <Icon name="label-outline" size={24} color="#000000" style={styles.drawerItemIcon} />
            <Text style={styles.drawerItemText}>{lbl.name}</Text>
          </View>
        ))}

        {/* 'Create new label' item */}
        <TouchableOpacity style={styles.drawerItem} onPress={handleCreateNewLabel}>
          <Icon name="add" size={24} color="#000000" style={styles.drawerItemIcon} />
          <Text style={styles.drawerItemText}>Create new label</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgb(2, 3, 3)',
  },
  drawerContainer: {
    position: 'absolute',
    top: 0, bottom: 0,
    width: 280,
    backgroundColor: 'rgba(242, 241, 241, 0.9)',
    paddingTop: 40,
    zIndex: 1,
  },
  drawerHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  drawerHeaderText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  drawerItemIcon: {
    marginRight: 20,
  },
  drawerItemText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  labelsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    justifyContent: 'space-between',
  },
});
