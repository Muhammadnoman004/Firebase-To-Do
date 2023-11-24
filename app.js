import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
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
let getclearbtn = document.querySelector("#clear");

function getTodos() {
  onSnapshot(collection(db, "ToDos"), (data) => {
    data.docChanges().forEach((todo) => {
      if (todo.type == "removed") {
        let delLi = document.getElementById(todo.doc.id);
        if (delLi) {
          delLi.remove();
        }
      } else {
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
        editIcon.setAttribute("onclick", "editTodo(this)");
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

getaddbtn.addEventListener("click", async () => {
  try {
    const docRef = await addDoc(collection(db, "ToDos"), {
      Text: getinp.value,
      Time: new Date().toLocaleString(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

async function delTodo(id) {
  await deleteDoc(doc(db, "ToDos", id));
}

function editTodo(e) {
  let editToDo = prompt(
    "Edit your ToDo",
    e.parentNode.parentNode.firstChild.textContent
  );
  e.parentNode.parentNode.firstChild.textContent = editToDo;
}

getclearbtn.addEventListener("click", () => {
  getul.innerHTML = "";
});

window.delTodo = delTodo;
window.editTodo = editTodo;
