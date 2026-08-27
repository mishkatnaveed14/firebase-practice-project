import { auth, db, onAuthStateChanged, signOut, doc, getDoc } from './firebase-config.js';

const currentPage = window.location.pathname.split("/").pop() || "index.html";

onAuthStateChanged(auth, async (user) => {
  const navLinks = document.getElementById("navLinks");

  if (user) {
    const userSnap = await getDoc(doc(db, "users", user.uid));
    const userData = userSnap.exists() ? userSnap.data() : { role: "user", name: user.email };

    if (currentPage === "login.html") {
      window.location.href = userData.role === "admin" ? "admin.html" : "dashboard.html";
      return;
    }

    if (currentPage === "admin.html" && userData.role !== "admin") {
      alert("Access Denied: Admin Rights Required!");
      window.location.href = "dashboard.html";
      return;
    }

    if (navLinks) {
      navLinks.innerHTML = `
        <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Store</a>
        <a href="dashboard.html" class="${currentPage === 'dashboard.html' ? 'active' : ''}">Dashboard</a>
        ${userData.role === 'admin' ? `<a href="admin.html" class="${currentPage === 'admin.html' ? 'active' : ''}" style="color:var(--accent-red); font-weight:bold;">Admin Panel</a>` : ''}
        <button id="logoutBtn" class="btn btn-outline" style="padding:0.4rem 0.8rem;">Logout (${userData.name || 'User'})</button>
        <button onclick="toggleCart()" class="btn">Cart (<span id="cartCount">0</span>)</button>
      `;
      document.getElementById("logoutBtn")?.addEventListener("click", () => signOut(auth));
    }
  } else {
    const protectedPages = ["dashboard.html", "admin.html"];
    if (protectedPages.includes(currentPage)) {
      window.location.href = "login.html";
      return;
    }

    if (navLinks) {
      navLinks.innerHTML = `
        <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Store</a>
        <a href="login.html" class="btn">Login / Register</a>
        <button onclick="toggleCart()" class="btn btn-outline">Cart (<span id="cartCount">0</span>)</button>
      `;
    }
  }
});