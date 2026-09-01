import { logout, togetloggedinuser } from "../firebase.config.js";
togetloggedinuser()

const button = document.getElementById("logout")
button.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log("logout hua");
    logout()
    
})
let btb3 = document.getElementById("btnc").addEventListener("click",(e)=>{
    e.preventDefault()
      window.location.pathname = "../html/admin.html"
})
  
  