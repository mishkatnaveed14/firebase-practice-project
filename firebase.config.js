import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
// database
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

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
 async function signup(email, password, username) {

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log(user.email, "===> successfully signed up");
    })

    .catch((error) => {
      console.log(error.code, error.message, "===> error while signing up");
    });
}


// async function signup(email, password, username) {

//   try {

//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     const user = userCredential.user;

//     console.log(
//       user.email,
//       "===> successfully signed up"
//     );

//     return user;

//   } catch (error) {

//     console.log(
//       error.code,
//       error.message,
//       "===> error while signing up"
//     );

//     throw error;
//   }
// }

// LOGIN
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log(user.email, "===> login successfully");
    })

    .catch((error) => {
      console.log(error.code, error.message, "===> error while logging in");
    });
}

// ===========>>>>>>>>>> firestore database <<<<<<<<<<<<====================
// crud ka creste user details
async function adduserdetails(userdetail,uniqueid) {
  try {
    await setDoc(doc(db, "users", uniqueid), { userdetail });
    console.log(uniqueid,"=====>> user set up and data stored succcessfully ");
  } catch (error) {
    console.log(error.code, "error in signup database");
    console.log(error.message, "error insignup database");
  }
  // ye setdoc function ha jo apnay andar aik parameter le rha ha doc ka or doc apnay andar 2 prameters le rha ha  or 1t parameter apnay 3 parameters lr rha ha aik db--> database ka or 2nd: collection name or 3rd: id mangta ha or 2nd paramerter ha doc ka object ya tu object bana do ya tu object pass kr do
}

export { signup, login, adduserdetails};
