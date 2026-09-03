const form = document.getElementById("contact-form");
const message = document.getElementById("contact-message");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "Thanks. Your message is in our queue and a specialist will reply shortly.";
  form.reset();
});
