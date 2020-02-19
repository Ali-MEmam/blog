/* -------------------------------------------------------------------------- */
/*                                  variable                                  */
/* -------------------------------------------------------------------------- */
edit = document.getElementById("edit");
deleteBtn = document.getElementById("delete");
table =document.getElementById("table");
/* -------------------------------------------------------------------------- */
/*                    Set The Connection With Server Data                   */
/* -------------------------------------------------------------------------- */
if (localStorage.getItem("editedObject") === null){
    localStorage.setItem("editedObject",JSON.stringify([]));
    var getEditedObject = localStorage.getItem("editedObject")
    var editedObject = JSON.parse(getEditedObject);
}else{
    var getEditedObject = localStorage.getItem("editedObject")
    var editedObject = JSON.parse(getEditedObject);
    if(editedObject[0] === ""){
        editedObject.shift()
    }
}
/* -------------------------------------------------------------------------- */
/*                                   testing                                  */
/* -------------------------------------------------------------------------- */
var xhr = new XMLHttpRequest;
    xhr.open("GET","https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts")
    xhr.send()
    xhr.onload = function(){
    if(this.status == 200){
        data = JSON.parse(xhr.response)
        for(var i =0 ; i < data.length; i++){
            for(var j = 0 ; j <editedObject.length; j++){
              if(data[i].id == editedObject[j].id){
                data[i].title = editedObject[j].title;
                data[i].body = editedObject[j].body
              }else{
              continue;
          }
          }
          }
        for(var i = 0; i < data.length ; i++){
            setBlogs(data[i])
            AddEventToEdit(i)
        }
    }
    allOldPosts()
}
/* -------------------------------------------------------------------------- */
/*                     Function To Get the Content By Edit                    */
/* -------------------------------------------------------------------------- */
function getContent(){
    var content = this.parentNode.parentNode.children[1].innerHTML;
    var title = this.parentNode.parentNode.children[0].innerHTML
    var id = this.parentNode.parentNode.getAttribute("id")
    localStorage.setItem("Editing",[id,title,content]);
    location.href = 'edit.html'
}
/* -------------------------------------------------------------------------- */
/*                     Add The EventLisner To edit button                     */
/* -------------------------------------------------------------------------- */
function AddEventToEdit(i){
    document.getElementsByClassName("edit")[i].addEventListener("click",getContent)
    document.getElementsByClassName("delete")[i].addEventListener("click",deleteContent)
}

/* -------------------------------------------------------------------------- */
/*                          Delete The Rome From Blog                         */
/* -------------------------------------------------------------------------- */
if (localStorage.getItem("deleted") === null){
    localStorage.setItem("deleted",JSON.stringify([]))
    var deletedposts = localStorage.getItem("deleted")
    var allDeletedPosts = JSON.parse(deletedposts);
}else{
    var deletedposts = localStorage.getItem("deleted")
    var allDeletedPosts = JSON.parse(deletedposts);
}

/* -------------------------------------------------------------------------- */
/*                       Delete All Old allDeletedPosts                       */
/* -------------------------------------------------------------------------- */
function allOldPosts(){
    for(var i = 0 ; i < allDeletedPosts.length ; i++){
            document.getElementById(allDeletedPosts[i]).style.display = "none"}
}
function deleteContent(){
    var parent = this.parentNode.parentNode;
    var parentid = parent.getAttribute("id");
    var askBeforeDelete = confirm("Are You Sure want To Delete This Post");
    if(askBeforeDelete === true){
        allDeletedPosts.push(parentid)
        localStorage.setItem("deleted",JSON.stringify(allDeletedPosts))
        parent.style.display ="none";
    }
   
}
/* -------------------------------------------------------------------------- */
/*                          Creating My Dom Function                          */
/* -------------------------------------------------------------------------- */
function setBlogs(obj){
    var createRow = document.createElement("tr");
    createRow.classList.add("row");
    createRow.setAttribute("id",obj.id);
    table.appendChild(createRow);
    var createTdTitle = document.createElement("td");
    createTdTitle.innerHTML = obj.title;
    createRow.appendChild(createTdTitle);
    var createTdContent = document.createElement("td");
    createTdContent.innerHTML = obj.body;
    createRow.appendChild(createTdContent);
    var createTdEditBtn = document.createElement("td");
    createRow.appendChild(createTdEditBtn);
    var createBtnEdit = document.createElement("button")
    createBtnEdit.innerHTML ="Edit"
    createBtnEdit.setAttribute("href","edit.html")
    createBtnEdit.setAttribute("id","edit");
    createBtnEdit.setAttribute("class","edit");
    createTdEditBtn.appendChild(createBtnEdit);
    // var createAnchor = document.createElement("a");
    // createAnchor.innerHTML ="Edit";
    // createAnchor.setAttribute("window.location.href","./edit.html");
    // createBtnEdit.appendChild(createAnchor)
    var createTdDelBtn = document.createElement("td");
    createRow.appendChild(createTdDelBtn);
    var createBtnDel = document.createElement("button");
    createBtnDel.innerHTML = "Delete"
    createBtnDel.setAttribute("id","delete")
    createBtnDel.setAttribute("class","delete")
    createTdDelBtn.appendChild(createBtnDel)
}
