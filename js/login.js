import { login, togetloggedinuser } from "../firebase.config.js";
togetloggedinuser();
// SIGN IN
const emailSignin = document.getElementById("signin-email");
const passwordSignin = document.getElementById("signin-password");

document
  .querySelector(".toggle-password")
  .addEventListener("click", (event) => {
    const button = event.currentTarget;
    const isPassword = passwordSignin.type === "password";
    passwordSignin.type = isPassword ? "text" : "password";
    button.textContent = isPassword ? "🙈" : "👁️";
    button.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );
  });

document.getElementById("formSignin").addEventListener("submit", (e) => {
  e.preventDefault();

  login(emailSignin.value, passwordSignin.value);
});
