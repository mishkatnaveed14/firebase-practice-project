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
const username = document.getElementById("signup-name");

document.getElementById("signup-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const now = Date.now()
  console.log(now,"===>> now" );
  
  signup(emailSignup.value, passwordSignup.value, username.value);
  console.log(emailSignup.value, passwordSignup.value, username.value);
  
  adduserdetails({
    username: username.value,
    email: emailSignup.value,
    password: passwordSignup.value,
  },now + "");
});

// document.getElementById("signin-btn").addEventListener("click", (e) => {
//   e.preventDefault();
//   alert("Sign In button clicked! and succecfully sign in");
// });
