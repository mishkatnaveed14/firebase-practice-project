import { signup, login, adduserdetails } from "./firebase.config.js";

// =========================
// SIGN IN
// =========================

const emailSignin = document.getElementById("signin-email");
const passwordSignin = document.getElementById("signin-password");

document.getElementById("signin-btn").addEventListener("click", (e) => {
  e.preventDefault();

  login(emailSignin.value, passwordSignin.value);
});

// =========================
// SIGN UP
// =========================

const emailSignup = document.getElementById("signup-email");
const passwordSignup = document.getElementById("signup-password");

document.getElementById("signup-btn").addEventListener("click", (e) => {
  e.preventDefault();

  signup(emailSignup.value, passwordSignup.value);
  adduserdetails({
    username: username.value,
    email: emailSignup.value,
    password: passwordSignup.value,
  });
});
