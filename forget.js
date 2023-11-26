import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail ,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyDzP2FAx12icdz9EnYVPLndzXgwGfUa9LE",
  authDomain: "to-do-app-bde54.firebaseapp.com",
  projectId: "to-do-app-bde54",
  storageBucket: "to-do-app-bde54.appspot.com",
  messagingSenderId: "528524097499",
  appId: "1:528524097499:web:5c288325a2b752a88999fe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

let Btn2 = document.querySelector("#send_btn");

Btn2.addEventListener("click" , ()=>{
    let getEmail = document.querySelector("#inp");

    sendPasswordResetEmail(auth, getEmail.value)
      .then(() => {
        console.log("Email Send");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log("error =>" , errorMessage);
      });
})

