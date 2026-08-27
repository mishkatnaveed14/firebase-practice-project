import { auth, db, onAuthStateChanged, signOut, doc, getDoc } from './firebase-config.js';

// Get Current Page Name
const currentPage = window.location.pathname.split("/").pop() || "index.html";

// Dynamic Navigation & Route Protection
onAuthStateChanged(auth, async (user) => {
  const navContainer = document.getElementById("nav-links");

  if (user) {
    // User is Logged In -> Fetch User Data & Role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : { role: "user" };

    // Redirect away from Login page if already logged in
    if (currentPage === "login.html") {
      window.location.href = userData.role === "admin" ? "admin.html" : "dashboard.html";
      return;
    }

    // Access Control for Admin Page
    if (currentPage === "admin.html" && userData.role !== "admin") {
      alert("Access Denied: Admins Only!");
      window.location.href = "dashboard.html";
      return;
    }

    // Render Navbar for Logged In User
    if (navContainer) {
      navContainer.innerHTML = `
        <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a>
        <a href="dashboard.html" class="${currentPage === 'dashboard.html' ? 'active' : ''}">Dashboard</a>
        <a href="profile.html" class="${currentPage === 'profile.html' ? 'active' : ''}">Profile</a>
        ${userData.role === 'admin' ? `<a href="admin.html" class="${currentPage === 'admin.html' ? 'active' : ''} admin-link">Admin Panel</a>` : ''}
        <button id="logoutBtn" class="nav-btn">Logout</button>
      `;
      document.getElementById("logoutBtn").addEventListener("click", () => signOut(auth));
    }

  } else {
    // User is Logged Out -> Protect Restricted Pages
    const protectedPages = ["dashboard.html", "profile.html", "admin.html"];
    if (protectedPages.includes(currentPage)) {
      window.location.href = "login.html";
      return;
    }

    // Render Navbar for Guest User
    if (navContainer) {
      navContainer.innerHTML = `
        <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a>
        <a href="login.html" class="nav-btn">Login / Signup</a>
      `;
    }
  }
});