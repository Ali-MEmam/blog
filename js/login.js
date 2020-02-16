/* -------------------------------------------------------------------------- */
/*                      Variables and Regular Expressions                     */
/* -------------------------------------------------------------------------- */
var form = document.getElementById("login");
var email = form.email
var password = form.userpassword
var regEmail = /^[a-z0-9A-Z$#.@-_]+@[a-z0-9A-Z]+\.com$/
var regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])[a-z0-9A-Z.!@#$%^&*]{8,16}$/
/* -------------------------------------------------------------------------- */
/*                     Live Checker The Validate of Email                     */
/* -------------------------------------------------------------------------- */

email.addEventListener("keyup",function(){
if(regEmail.test(this.value) == false && this.value.length !== 0){
    document.getElementById("emailwarning").innerHTML = "example@gmail.com";
    console.log("yo")
    
}else if(regEmail.test(this.value) === true || this.value.length === 0){
    document.getElementById("emailwarning").innerHTML = "";
    console.log("hello")
}
})
/* -------------------------------------------------------------------------- */
/*                    Live Checker The Validate of Password                   */
/* -------------------------------------------------------------------------- */
password.addEventListener("keyup",function(){
    if(regPassword.test(this.value) == false && this.value.length !== 0){
        document.getElementById("passwordwarning").innerHTML = "from 8 to 16 (Speical Charcter and UpperCase and LowerCase and number)"
    }else if(regPassword.test(this.value) == true || this.value.length === 0){
        document.getElementById("passwordwarning").innerHTML = "";
    }
    })
/* -------------------------------------------------------------------------- */
/*                              When user Sumbit                              */
/* -------------------------------------------------------------------------- */
form.addEventListener("submit",function(e){
    if(regPassword.test(password.value) == true && regEmail.test(email.value) == true ){
        form.setAttribute("action","dashboard.html");
        localStorage.setItem("username",email.value)
    }else{
        e.preventDefault()
    }
})