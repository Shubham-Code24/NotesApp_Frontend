










// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC7rSHZSCJPiIWWQUXi5EL6kJIVG7xUk8M",
  authDomain: "rnfirebaselearn.firebaseapp.com",
  projectId: "rnfirebaselearn",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };