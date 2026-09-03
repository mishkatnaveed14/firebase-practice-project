import {
  signup,
  togetloggedinuser,
} from "../firebase.config.js";
togetloggedinuser();

const emailSignup = document.getElementById("signup-email");
const passwordSignup = document.getElementById("signup-password");
const username = document.getElementById("signup-name");

document.getElementById("formSignup").addEventListener("submit", (e) => {
  e.preventDefault();
  signup(emailSignup.value, passwordSignup.value, username.value);
});
