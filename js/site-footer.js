const footer = document.createElement("footer");
const isAdmin = window.location.pathname.includes("/html/admin/");
footer.className = isAdmin ? "site-footer admin-footer" : "site-footer";
footer.innerHTML = isAdmin
  ? `<div class="footer-inner"><div><a class="brand" href="/html/admin/admin-dashboard.html">Morrow<span>.</span> Admin</a><p>Operations control center for your commerce workspace.</p></div><div class="footer-links"><div><b>Manage</b><a href="/html/admin/admin-dashboard.html">Dashboard</a><a href="/html/admin/admin-users.html">Users</a><a href="/html/admin/admin-products.html">Products</a><a href="/html/admin/admin-orders.html">Orders</a></div><div><b>Support</b><a href="/html/public/contact.html">Contact support</a><a href="/html/public/home.html">View storefront</a></div></div></div><div class="footer-bottom"><span>© 2026 Morrow Commerce</span><span>Admin operations / secure workspace</span></div>`
  : `<div class="footer-inner"><div><a class="brand" href="/html/public/home.html">Morrow<span>.</span></a><p>Thoughtful supply for teams that move with purpose.</p></div><div class="footer-links"><div><b>Explore</b><a href="/html/public/shop.html">Shop</a><a href="/html/public/about.html">About</a><a href="/html/public/contact.html">Contact</a></div><div><b>Workspace</b><a href="/html/user/user-profile.html">Profile</a><a href="/html/user/user-orders.html">Orders</a><a href="/html/user/cart.html">Bag</a></div></div></div><div class="footer-bottom"><span>© 2026 Morrow Commerce</span><span>Built for better buying.</span></div>`;
document.body.appendChild(footer);

function loadScript(source) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = source;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

Promise.resolve()
  .then(() =>
    loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"),
  )
  .then(() =>
    loadScript(
      "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js",
    ),
  )
  .then(() => import("./motion.js"))
  .then(({ initMotion }) => initMotion())
  .catch(() => {});
