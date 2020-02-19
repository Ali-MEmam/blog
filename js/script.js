/* -------------------------------------------------------------------------- */
/*                     Set The Configuration With The Data                    */
/* -------------------------------------------------------------------------- */
var xhr = new XMLHttpRequest;
var mainContainer = document.getElementById("main")
var allBlogs = []
xhr.open('GET','https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts');
xhr.send();

/* -------------------------------------------------------------------------- */
/*                     Check if There is any edited Posts                     */
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
/*                      Handling The Button In Home Page                      */
/* -------------------------------------------------------------------------- */

if(localStorage.getItem("username") === null){
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("logout").style.display ="none";
    document.getElementById("login").style.display ="block"
}else{
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("logout").style.display ="block";
    document.getElementById("login").style.display ="none"
}
document.getElementById("logout").addEventListener("click",function(){
    localStorage.removeItem("username");
    window.location.reload()
})

/* -------------------------------------------------------------------------- */
/*                         Handdling the Deleted Posts                        */
/* -------------------------------------------------------------------------- */
var deletedposts = localStorage.getItem("deleted")
var allDeletedPosts = JSON.parse(deletedposts);
xhr.onload = function(){
    for(var i =0; i < JSON.parse(xhr.response).length; i++){
        allBlogs.push(JSON.parse(xhr.response)[i])
    }
/* ----------------- Replace The Edited Posts in Main Array ----------------- */
    for(var i =0 ; i < allBlogs.length; i++){
        for(var j = 0 ; j <editedObject.length; j++){
          if(allBlogs[i].id == editedObject[j].id){
            allBlogs[i].title = editedObject[j].title;
            allBlogs[i].body = editedObject[j].body
          }else{
          continue;
      }
      }
      }
    for(var i = 0; i< allBlogs.length ;i++){
        postCreator(allBlogs[i])
    }

/* ---------------------- Fire The Delete post function --------------------- */
    deleteallOldPosts()
}
/* -------------------------------------------------------------------------- */
/*                          Function To Delete Posts                          */
/* -------------------------------------------------------------------------- */
function deleteallOldPosts(){
    for(var i = 0 ; i < allDeletedPosts.length ; i++){
            document.getElementById(allDeletedPosts[i]).style.display = "none"}
}

/* --------------- Get The Old Deleted Posts From LocalStorage -------------- */
if (localStorage.getItem("deleted") === null){
    localStorage.setItem("deleted",JSON.stringify([]))
    var deletedposts = localStorage.getItem("deleted")
    var allDeletedPosts = JSON.parse(deletedposts);
}else{
    var deletedposts = localStorage.getItem("deleted")
    var allDeletedPosts = JSON.parse(deletedposts);
}
/* -------------------------------------------------------------------------- */
/*                           Function To Create Post                          */
/* -------------------------------------------------------------------------- */
function postCreator(obj){
    var sectionCreator = document.createElement("section");
    sectionCreator.classList.add("main-post");
    sectionCreator.setAttribute("id",obj.id)
    mainContainer.appendChild(sectionCreator);
    var headerCreator = document.createElement("h2");
    headerCreator.innerHTML = obj.title;
    headerCreator.classList.add("main-post__header");
    sectionCreator.appendChild(headerCreator);
    var bodyCreator = document.createElement("p")
    bodyCreator.innerHTML = obj.body;
    bodyCreator.classList.add("main-post__body");
    sectionCreator.appendChild(bodyCreator);
    var dateCreator = document.createElement("h4");
    dateCreator.innerHTML = "Day " + obj.id;
    dateCreator.classList.add("main-post__date");
    sectionCreator.appendChild(dateCreator)

}
