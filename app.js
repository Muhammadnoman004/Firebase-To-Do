let getinp = document.querySelector("#inp");
let getaddbtn = document.querySelector("#add") 
let getul = document.querySelector("#ul");
let getclearbtn = document.querySelector("#clear");

getaddbtn.addEventListener("click" , ()=>{

    let getli = document.createElement("li");
    getli.className = "list"
    let liTextDiv = document.createElement("div");
    liTextDiv.setAttribute("class", "liTextDiv")
    let liTextPara = document.createElement("p");
    let litext = document.createTextNode(getinp.value);

    liTextPara.appendChild(litext);
    liTextDiv.appendChild(liTextPara);
    getli.appendChild(liTextDiv)
    getul.appendChild(getli);
    getinp.value = ""

    let div = document.createElement("div");
    div.classList.add("divClass");
    
    let editIcon = document.createElement("i");
    editIcon.className = 'edit'
    editIcon.classList.add("fa");   
    editIcon.classList.add("fa-pencil-square");

    
    let delIcon = document.createElement("i");
    delIcon.className = "deleted"
    delIcon.classList.add("fa");
    delIcon.classList.add("fa-trash");
    div.appendChild(editIcon)
    div.appendChild(delIcon)
    getli.appendChild(div);


})




getclearbtn.addEventListener("click" , ()=>{
    getul.innerHTML = ""
})
