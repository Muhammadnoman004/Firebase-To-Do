import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDzP2FAx12icdz9EnYVPLndzXgwGfUa9LE",
  authDomain: "to-do-app-bde54.firebaseapp.com",
  projectId: "to-do-app-bde54",
  storageBucket: "to-do-app-bde54.appspot.com",
  messagingSenderId: "528524097499",
  appId: "1:528524097499:web:5c288325a2b752a88999fe",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let getinp = document.querySelector("#inp");
let getaddbtn = document.querySelector("#add");
let getul = document.querySelector("#ul");
let getclearbtn = document.querySelector(".clear");
let getLogOutbtn = document.querySelector("#logOut");

let UserId = localStorage.getItem("UserId")
let TodoIds = [];

//  Read ToDo from firebase //

function getTodos() {
  onSnapshot(collection(db, UserId), (data) => {
    data.docChanges().forEach((todo) => {
      TodoIds .push(todo.doc.id)
      if (todo.type == "removed") {
        let delLi = document.getElementById(todo.doc.id);
        if(delLi){

          delLi.remove();
        }
      
      }
       else if (todo.type == "added") {
        let getli = document.createElement("li");
        getli.className = "list";
        getli.setAttribute("id", todo.doc.id);
        let liTextDiv = document.createElement("div");
        liTextDiv.setAttribute("class", "liTextDiv");
        let liTextPara = document.createElement("p");
        let litext = document.createTextNode(todo.doc.data().Text);

        liTextPara.appendChild(litext);
        liTextDiv.appendChild(liTextPara);
        getli.appendChild(liTextDiv);
        getul.appendChild(getli);
        getinp.value = "";

        let div = document.createElement("div");
        div.classList.add("divClass");

        let editIcon = document.createElement("i");
        editIcon.setAttribute("onclick", `editTodo(this , '${todo.doc.id}')`);
        editIcon.className = "edit";
        editIcon.classList.add("fa");
        editIcon.classList.add("fa-pencil-square");

        let delIcon = document.createElement("i");
        delIcon.setAttribute("onclick", `delTodo('${todo.doc.id}')`);
        delIcon.className = "deleted";
        delIcon.classList.add("fa");
        delIcon.classList.add("fa-trash");
        div.appendChild(editIcon);
        div.appendChild(delIcon);
        getli.appendChild(div);
      }
      });
  });
}

getTodos();

//  Add ToDo in firebase  //

getaddbtn.addEventListener("click", async () => {

  if(getinp.value == ""){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Enter a Value",
    });
  }
  else{
    try {
      const docRef = await addDoc(collection(db, UserId), {
        Text: getinp.value,
        Time: new Date().toLocaleString(),
      });
    } 
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }
});

//  Delete ToDo from firebase  //

async function delTodo(id) {
  await deleteDoc(doc(db, UserId , id));
}

//  Edit ToDo from firebase   //

async function editTodo(e , id) {
  
  let editToDo = prompt("Enter Edit ToDo",e.parentNode.parentNode.firstChild.textContent);
  e.parentNode.parentNode.firstChild.textContent = editToDo
  if(editToDo){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your ToDo has been updated",
      showConfirmButton: false,
      timer: 2000
    });
  }
  await updateDoc(doc(db , UserId , id) , {
    Text: editToDo,
    Time: new Date().toLocaleString()
  });
}

//  Clear all ToDos from firebase   // 

getclearbtn.addEventListener("click", async () => {
  
  getul.innerHTML = "";
  Swal.fire({
    title: "Deleted!",
    text: "Your ToDos has been deleted!",
    icon: "success"
  });
  const arr = [];
  for(let i = 0; i < TodoIds.length; i++){
    arr.push(await deleteDoc(doc(db, UserId, TodoIds[i])));
    
  }
  Promise.all(arr)
  .then((res) => {
    console.log('All ToDos has been deleted');
  })
  .catch((err) => {
    console.log('error-->' , err);
  })
});

window.delTodo = delTodo;
window.editTodo = editTodo;