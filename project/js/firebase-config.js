// ================================
// FIREBASE CONFIG - YAHAN APNI KEYS DALEIN
// Firebase Console > Project Settings > General > Your apps > SDK setup
// ================================
const firebaseConfig = {
  apiKey: "AIzaSyAXaJPxpvRyACZZMj7BeSOioiKPXaBYa3Y",
  authDomain: "auth-af1f7.firebaseapp.com",
  projectId: "auth-af1f7",
  storageBucket: "auth-af1f7.firebasestorage.app",
  messagingSenderId: "113791781042",
  appId: "1:113791781042:web:d9d81deecf98adee08a1ab",
  measurementId: "G-TLWBB28TQ0",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
