export function initMotion() {
  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  gsap.from(".site-nav, .landing-nav", { opacity: 0, y: -18, duration: 0.7, ease: "power2.out" });
  gsap.from(".hero-copy, .page-intro, .auth-side", { opacity: 0, y: 22, duration: 0.75, delay: 0.12, ease: "power2.out" });
  gsap.from(".product-card, .stat-card, .workspace-preview, .summary, .profile-panel", { opacity: 0, y: 18, duration: 0.55, stagger: 0.07, delay: 0.2, ease: "power2.out" });
  gsap.utils.toArray(".section-block, .table-section, .checkout-layout, .cart-layout").forEach((section) => {
    if (!window.ScrollTrigger) return;
    gsap.from(section, { scrollTrigger: { trigger: section, start: "top 88%" }, opacity: 0, y: 24, duration: 0.65, ease: "power2.out" });
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initMotion, { once: true });
else initMotion();
