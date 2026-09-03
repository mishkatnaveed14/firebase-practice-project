import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
// database
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
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
        role: "user",
        status: "Active",
      })
        .then(() => {
          console.log("data store in data base");
          window.location.href = "/html/public/home.html";
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
      window.location.href = "/html/public/home.html";
    })

    .catch((error) => {
      console.log(error.code, error.message, "===> error while logging in");
    });
}

async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

// role base page routing
function togetloggedinuser() {
  onAuthStateChanged(auth, async (user) => {
    console.log(user, "user kya user mila");
    const currentpath = window.location.pathname;
    console.log(currentpath);
    if (user) {
      const user_data = await getsingleuserdata(user.uid);
      if (!user_data) {
        console.log("user is not avaiable!!");
        return;
      }
      const role = user_data.role;
      const status = user_data.status;
      if (status == "Blocked") {
        alert("Aapka account block kr dia gya ha");
        await signOut(auth);
        window.location.pathname = "/html/public/login.html";
        return;
      }
      if (role !== "admin" && currentpath.includes("/html/admin/")) {
        alert("Acess denied on admin page");
        window.location.pathname = "/html/public/home.html";
        return;
      }
      if (
        currentpath === "/html/public/signup.html" ||
        currentpath === "/html/public/login.html" ||
        currentpath === "/" ||
        currentpath === "/index.html"
      ) {
        if (role === "admin") {
          window.location.pathname = "/html/admin/admin-dashboard.html";
        } else {
          window.location.pathname = "/html/public/home.html";
        }
      }
    } else {
      const isProtected =
        currentpath.includes("/admin/") || currentpath.includes("/user/");
      if (isProtected) {
        window.location.pathname = "/html/public/login.html";
      }
    }
  });
}

function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.assign("/html/public/login.html");
    })
    .catch((error) => {
      console.log(error.code, error.message, "===> error while logging out");
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
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
// crud ka read data matlab multiple data
async function getalldata() {
  try {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return users;
  } catch (error) {
    console.log(error.code, error.message, "error while getting all users");
  }
}

async function deleteUser(uniqueid) {
  await deleteDoc(doc(db, "users", uniqueid));
}

async function blockUser(uniqueid) {
  await updateDoc(doc(db, "users", uniqueid), { status: "Blocked" });
  alert("User has been blocked successfully.");
}

async function unblockUser(uniqueid) {
  await updateDoc(doc(db, "users", uniqueid), { status: "Active" });
  alert("User has been unblocked successfully.");
}
//

export {
  signup,
  login,
  resetPassword,
  getsingleuserdata,
  getalldata,
  togetloggedinuser,
  logout,
  deleteUser,
  blockUser,
  unblockUser,
};
