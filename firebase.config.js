import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
// database
import { getFirestore,
  doc, 
  setDoc
 } from  "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// change for all different projects
const firebaseConfig = {
  apiKey: "AIzaSyAXaJPxpvRyACZZMj7BeSOioiKPXaBYa3Y",
  authDomain: "auth-af1f7.firebaseapp.com",
  projectId: "auth-af1f7",
  storageBucket: "auth-af1f7.firebasestorage.app",
  messagingSenderId: "113791781042",
  appId: "1:113791781042:web:d9d81deecf98adee08a1ab",
  measurementId: "G-TLWBB28TQ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// SIGN UP
 function signup(email, password) {

  createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

      const user = userCredential.user;

      console.log(
        user.email,
        "===> successfully signed up"
      );

    })

    .catch((error) => {

      console.log(
        error.code,
        error.message,
        "===> error while signing up"
      );

    });
}
// database user CRUD (Create function )
async function adduserdetails (userdetails){
// Add a new document in collection "cities"
try {
  await setDoc(doc(db, "users", "123"), userdetails);
console.log("==>> userdetails stored successfully");
} catch (error) {
  console.log(error, "==>> error while storing userdetails")  ;
  
}

}


// LOGIN
function login(email, password) {

  signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

      const user = userCredential.user;

      console.log(
        user.email,
        "===> login successfully"
      );

    })

    .catch((error) => {

      console.log(
        error.code,
        error.message,
        "===> error while logging in"
      );

    });
}

// // auth state change function
function onAuthstate() {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
    // User is signed out
    // ...
  }
});
}
export { signup, login, onAuthstat,adduserdetails };
