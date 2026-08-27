// ================================
// AUTH HELPER FUNCTIONS
// ================================

// Save user to Firestore (default role = "user")
function saveUserToDB(user) {
  const userRef = db.collection("users").doc(user.uid);
  return userRef.get().then((doc) => {
    if (!doc.exists) {
      return userRef.set({
        name: user.displayName || "No Name",
        email: user.email,
        role: "user",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  });
}

// Redirect User by Role
function redirectByRole(uid) {
  db.collection("users").doc(uid).get().then((doc) => {
    if (doc.exists) {
      const role = doc.data().role;
      if (role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "user.html";
      }
    } else {
      window.location.href = "user.html";
    }
  }).catch((err) => {
    alert("Error: " + err.message);
  });
}

// ---------- SIGNUP HANDLER ----------
function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("errorMsg");

  auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      return result.user.updateProfile({ displayName: name }).then(() => {
        return saveUserToDB(result.user);
      }).then(() => {
        redirectByRole(result.user.uid);
      });
    })
    .catch((err) => {
      errorBox.innerText = err.message;
    });
}

// ---------- LOGIN HANDLER ----------
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("errorMsg");

  auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      redirectByRole(result.user.uid);
    })
    .catch((err) => {
      errorBox.innerText = err.message;
    });
}

// ---------- GOOGLE SIGN IN ----------
function handleGoogleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      return saveUserToDB(result.user).then(() => {
        redirectByRole(result.user.uid);
      });
    })
    .catch((err) => {
      alert(err.message);
    });
}

// ---------- LOGOUT ----------
function handleLogout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

// Attach Event Listeners on DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});