import { logout, togetloggedinuser } from "./firebase.config.js";
togetloggedinuser()

const button = document.getElementById("logout")
button.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log("logout hua");
    logout()
    
})