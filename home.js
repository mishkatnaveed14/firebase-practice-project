import { togetloggedinuser } from "./firebase.config.js";
togetloggedinuser()

const button = document.getElementById("logout")
button.addEventListener("click",()=>{
    console.log("logout hua");
    
})