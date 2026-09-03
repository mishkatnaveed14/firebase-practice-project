export function initMotion() {
  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const animate = (selector, options) => {
    if (document.querySelector(selector)) gsap.from(selector, options);
  };
  animate(".site-nav, .landing-nav", {
    y: -18,
    duration: 0.7,
    ease: "power2.out",
  });
  animate(".hero-copy, .page-intro, .auth-side", {
    y: 22,
    duration: 0.75,
    delay: 0.12,
    ease: "power2.out",
  });
    animate(".product-card, .stat-card, .workspace-preview, .summary, .profile-panel", {
      y: 18,
      duration: 0.55,
      stagger: 0.07,
      delay: 0.2,
      ease: "power2.out",
    });
  gsap.utils
    .toArray(".section-block, .table-section, .checkout-layout, .cart-layout")
    .forEach((section) => {
      if (!window.ScrollTrigger) return;
      if (section) gsap.from(section, {
        scrollTrigger: { trigger: section, start: "top 88%" },
        y: 24,
        duration: 0.65,
        ease: "power2.out",
      });
    });
}
