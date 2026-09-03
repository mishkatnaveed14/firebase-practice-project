import { signup, togetloggedinuser } from "../firebase.config.js";
togetloggedinuser();

const emailSignup = document.getElementById("signup-email");
const passwordSignup = document.getElementById("signup-password");
const username = document.getElementById("signup-name");
const signupForm = document.getElementById("formSignup");

if (signupForm) {
  document
    .querySelector(".toggle-password")
    ?.addEventListener("click", (event) => {
      const button = event.currentTarget;
      const isPassword = passwordSignup.type === "password";
      passwordSignup.type = isPassword ? "text" : "password";
      button.textContent = isPassword ? "🙈" : "👁️";
      button.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password",
      );
    });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signup(emailSignup.value, passwordSignup.value, username.value);
  });
}
