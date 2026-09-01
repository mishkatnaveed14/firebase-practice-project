
import { login, togetloggedinuser } from "../firebase.config.js";
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