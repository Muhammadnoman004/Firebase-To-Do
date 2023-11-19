let getinp = document.querySelector("#inp");
let getaddbtn = document.querySelector("#add") 
let getul = document.querySelector("#ul");
let getclearbtn = document.querySelector("#clear");

getaddbtn.addEventListener("click" , ()=>{

    let getli = document.createElement("li");
    getli.className = "list"
    let litext = document.createTextNode(getinp.value);
    getli.appendChild(litext);
    getul.appendChild(getli);
    getinp.value = ""

    let div = document.createElement("div");
    let span = document.createElement("span");
    div.classList.add("divClass");
    
    let editIcon = document.createElement("i");
    editIcon.className = 'edit'
    editIcon.classList.add("fa");   
    editIcon.classList.add("fa-pencil-square");
    span.appendChild(editIcon);
    div.appendChild(span);

    
    let delIcon = document.createElement("i");
    delIcon.className = "deleted"
    delIcon.classList.add("fa");
    delIcon.classList.add("fa-trash");
    span.appendChild(delIcon);
    div.appendChild(span);
    getli.appendChild(div);


})




getclearbtn.addEventListener("click" , ()=>{
    getul.innerHTML = ""
})
