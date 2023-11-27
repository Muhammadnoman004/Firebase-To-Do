import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyDzP2FAx12icdz9EnYVPLndzXgwGfUa9LE",
  authDomain: "to-do-app-bde54.firebaseapp.com",
  projectId: "to-do-app-bde54",
  storageBucket: "to-do-app-bde54.appspot.com",
  messagingSenderId: "528524097499",
  appId: "1:528524097499:web:5c288325a2b752a88999fe",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

if(localStorage.getItem("UserId")) {
  location.href = "./index.html"
}

let log_Btn = document.querySelector("#signIn");

log_Btn.addEventListener("click", () => {
  let log_Email = document.querySelector("#lemail");
  let log_password = document.querySelector("#lpass");
  let message = document.querySelector("#para");

  if (log_Email.value == "" && log_password.value == "") {
    message.innerHTML = "Please Fill The Form.";
  } else if (log_Email.value == "") {
    message.innerHTML = "Please Enter The Email.";
  } else if (log_password.value == "") {
    message.innerHTML = "Please Enter The Password";
  } else {
    signInWithEmailAndPassword(auth, log_Email.value, log_password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user =>", user);
        localStorage.setItem("UserId", user.uid);
        window.location = "./index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error =>", errorMessage);
      });
  }
});

let getBtn1 = document.querySelector("#Sbutton");
getBtn1.addEventListener("click", () => {
  window.location = "./signUp.html";
});
