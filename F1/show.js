function passwordShow() {
  var temp = document.getElementById('pws');
  if (temp.type == "password") {
    temp.type = "text";
  } else {
    temp.type = "password";
  }
}
