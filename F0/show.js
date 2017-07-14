function signinShow(){
  document.getElementById('signin').style.display='block';
  document.getElementById('signup').style.display='none';
}
function signupShow(){
  document.getElementById('signin').style.display='none';
  document.getElementById('signup').style.display='block';
}
function passwordShow(){
  var temp = document.getElementById('pws');
  if(temp.type == "password"){
    temp.type = "text";
  }
  else {
    temp.type = "password";
  }
}
