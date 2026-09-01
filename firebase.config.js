import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
// database
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
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

      setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        password: password,
      })
        .then(() => {
          console.log("data store in data base");
        })

        .catch((error) => {
          console.log(
            error.code,
            error.message,
            "error to store data in data base",
          );
        });
    })

    .catch((error) => {
      console.log(error.code, error.message, "===> error while signing up");
    });
}

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

// role base page routing
function togetloggedinuser() {
  onAuthStateChanged(auth, (user) => {
    console.log(user, "user kya user mila");
    let e;
    if (user) {
      const uid = user.uid;
      // e.preventDefault();
      //  window.location = "./home.html"
      console.log(window.location, "===>> window currnt location");
      if (!window.location.pathname == "/home.html") {
        window.location.pathname == "/home.html";
      }

      console.log("jo user login ha uski user id ye ha", uid);

      // ...
    } else {
      console.log("user login nhn ha ");

     if(window.location.pathname == "./index.html"|| window.location.pathname == "./login.html"){
console.log("I am already in login or signup page ");

     }else{
      window.location.pathname = "./login.html"
     }
    }
  });
}

function logout (){
signOut(auth).then(() => {
  // Sign-out successful.
  window.location = "./login.html"
}).catch((error) => {
  // An error happened.
});
}
// ===========>>>>>>>>>> firestore database <<<<<<<<<<<<====================
// crud ka creste user details
// crud ka get data matlab read data of single user
async function getsingleuserdata(uniqueid) {
  const docRef = doc(db, "users", uniqueid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
// crud ka read data matlab multiple data
async function getalldata() {
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

//

export { signup, login, getsingleuserdata, getalldata, togetloggedinuser ,logout};
