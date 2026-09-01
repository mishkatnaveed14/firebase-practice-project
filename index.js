import {
  signup,
  login,
  getsingleuserdata,
  getalldata,
  togetloggedinuser,
} from "./firebase.config.js";
togetloggedinuser()
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
  signup(emailSignup.value, passwordSignup.value, username.value);
});

// get data (read data crud )
const btn = document.getElementById("getsingledata");
btn.addEventListener("click", () => {
  getsingleuserdata("zmAyhs3pPeXYxvyfqsAYC8kC2Dw2");
});
// get all data (read data crud)
const btn2 = document.getElementById("getalldata");
btn2.addEventListener("click", () => {
  getalldata();
});
//
// document.getElementById("signin-btn").addEventListener("click", (e) => {
//   e.preventDefault();
//   alert("Sign In button clicked! and succecfully sign in");
// });
