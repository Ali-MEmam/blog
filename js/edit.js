/* -------------------------------------------------------------------------- */
/*                            Get Textarea From DOM                           */
/* -------------------------------------------------------------------------- */
var title = document.getElementById("title");
var content = document.getElementById("bodyContent");
var form = document.getElementById("editForm");
var sumbit = form.done;
var editingPost = localStorage.getItem("Editing");
var editingPostArr = editingPost.split(",")

/* -------------------------------------------------------------------------- */
/*             Http Request To Get The Editing Post From Database             */
/* -------------------------------------------------------------------------- */
var getTheEditPost = new XMLHttpRequest;
getTheEditPost.open("Get","https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts/"+editingPostArr[0])
getTheEditPost.send()
getTheEditPost.onload= function(){
    /*Im Already Get The Data When User Clicked Edit And I Pushed it into The localStorage beside pushing The id only*/
}
/* -------------------------------------------------------------------------- */
/*                                 Edited Data                                */
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
/*                 Self Invoke Function To load WHen We Begin                 */
/* -------------------------------------------------------------------------- */
(function(){
    title.innerHTML = editingPostArr[1];
    content.innerHTML = editingPostArr[2]
})()
/* -------------------------------------------------------------------------- */
/*                         Handling The Submit Button                         */
/* -------------------------------------------------------------------------- */
sumbit.addEventListener("click",function(e){
    var xhr = new XMLHttpRequest;
    xhr.open("PUT","https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts/"+editingPostArr[0]);
    xhr.send();
    if(title.value.length === 0 || content.value.length === 0){
        document.getElementById("warning").innerHTML = "Sorry You Can't Let The Field Empty";
        e.preventDefault();
        }else{
            e.preventDefault();
            xhr.onload = function(){
                if(this.status == 200){
                    document.getElementById("warning").innerHTML = "Saved"
                    checkingAndFind(editedObject,editingPostArr[0])
                    console.log(editedObject);
                    localStorage.setItem("editedObject",JSON.stringify(editedObject))
                }
            }
    }   
})


/* -------------------------------------------------------------------------- */
/*              Function To Create New Object "Post" After Edited             */
/* -------------------------------------------------------------------------- */
function createEditedObject(iD,Title,Body){
    return{
        id:iD,
        title:Title,
        body:Body
    }
}

/* -------------------------------------------------------------------------- */
/*            Function To check If The Value Already Edited Before            */
/* -------------------------------------------------------------------------- */
var checkForId = function(arr,value){
    return arr.some(function(element){
    return element.id === value
  })}

/* -------------------------------------------------------------------------- */
/*                  function To Find the prev edited element                  */
/* -------------------------------------------------------------------------- */

var checkingAndFind = function(ele,is){
    if(checkForId(ele,is) === true){  
        var found = editedObject.find(function(element){
            return element.id == editingPostArr[0]
        })            
      found.title = title.value;
      found.body = content.value;
    }else if(checkForId(ele,is) === false){
        var Create = createEditedObject(editingPostArr[0],title.value,content.value)
        editedObject.push(Create)
       
    }
}
