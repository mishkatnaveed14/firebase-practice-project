// ================================
// PAGE GUARD
// requiredRole ye variable har protected page pe pehle se define hoga
// e.g. user.html me: const requiredRole = "user";
//      admin.html me: const requiredRole = "admin";
// ================================
auth.onAuthStateChanged((user) => {
  if (!user) {
    // login nahi hai -> login page pe bhejo
    window.location.href = "login.html";
    return;
  }

  db.collection("users").doc(user.uid).get().then((doc) => {
    if (!doc.exists) {
      window.location.href = "login.html";
      return;
    }
    const role = doc.data().role;

    // agar user apni role wala page nahi khol raha -> sahi page pe bhejo
    if (role !== requiredRole) {
      if (role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "user.html";
      }
      return;
    }

    // page pe naam/email dikhane k liye
    const nameEl = document.getElementById("welcomeName");
    if (nameEl) nameEl.innerText = doc.data().name || user.email;
  });
});
