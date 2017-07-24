var data = new Array();
var storage = window.localStorage;

function  student(name, sex, id, grade, subject) {       
  this.name  = name ? name : null;
  this.sex =  sex ? sex : null;
  this.id = id ? id : null;
  this.grade =  grade ? grade  :  null;
  this.subject =  subject ? subject  :  null;
}

function addHandler() {
  var stu = new student();
  stu.name = $("#aName").val().trim();
  stu.sex =  $("#aSex").val().trim();
  stu.id = $("#aId").val().trim();
  stu.grade =  $("#aGrade").val().trim();
  stu.subject =  $("#aSubject").val().trim();
  if (valid(stu)) {
    data.push(stu); 
    alert("提交成功");
  }
}

function valid(student) {
  if (student.name == "") {
    alert("姓名不能为空");
    return false;
  } else if (student.id == "") {
    alert("学号不能为空");
    return false;
  } else {
    return true;
  }
}

function search() {
  if (data.length == 0) {
    alert("查无此人");
    $("#searchOutput").html("");
  } else {
    var id = $("#sId").val().trim();
    for (var i = 0; i < data.length; i++) {
      if (id == data[i].id) {
        $("#searchOutput").html("<tr><td>" + data[i].name + "</td><td>" + data[i].sex + "</td><td>" + data[i].id + "</td><td>" + data[i].grade + "</td><td>" + data[i].subject + "</td></tr>");
      } else {
        alert("查无此人");
        $("#searchOutput").html("");
      }
    }
  }
}

function getStudentById(id) {
  for (var i = 0; i < data.length; i++) {
    if (id == data[i].id) {
      return data[i];
    }
  }
  return null;
}

function delHandler() {
  var id = $("#dId").val().trim();
  var stu = getStudentById(id);
  if (stu == null) {
    alert("查无此人")
  } else {
    data.splice(data.indexOf(stu), 1);
    alert("删除成功");
  }
}

function eShow() {
  var id = $("#eId").val().trim();
  var stu = getStudentById(id);
  if (stu == null) {
    alert("查无此人");
    $(".editForm").hide();
  } else {
    $(".editForm").fadeIn("slow");
  }
}

function editHandler() {
  var id = $("#eId").val().trim();
  var stu = getStudentById(id);
  if ($("#eName").val().trim() != "") {
    stu.name = $("#eName").val().trim();
    stu.sex =  $("#eSex").val().trim();
    stu.grade =  $("#eGrade").val().trim();
    stu.subject =  $("#eSubject").val().trim();
    alert("修改成功");
  } else {
    alert("姓名不能为空");
  }
}

function localSave() {
  $("#saveOutput").empty();
  for (var i = 0; i < data.length; i++) {
    $("#saveOutput").append("<tr><td>" + data[i].name + "</td><td>" + data[i].sex + "</td><td>" + data[i].id + "</td><td>" + data[i].grade + "</td><td>" + data[i].subject + "</td></tr>");
  }
  storage.clear();
  for (var i = 0; i < data.length; i++) {
    storage[data[i].id] = JSON.stringify(data[i]);
  }
}

function addShow() {
  $(".add").fadeIn("slow");
  $(".del").hide();
  $(".search").hide();
  $(".edit").hide();
  $(".save").hide();
}

function delShow() {
  $(".add").hide();
  $(".del").fadeIn("slow");
  $(".search").hide();
  $(".edit").hide();
  $(".save").hide();
}

function searchShow() {
  $(".add").hide();
  $(".del").hide();
  $(".search").fadeIn("slow");
  $(".edit").hide();
  $(".save").hide();
}

function editShow() {
  $(".add").hide();
  $(".del").hide();
  $(".search").hide();
  $(".edit").fadeIn("slow");
  $(".save").hide();
}

function saveShow() {
  $(".add").hide();
  $(".del").hide();
  $(".search").hide();
  $(".edit").hide();
  $(".save").fadeIn("slow");
}
