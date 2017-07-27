var storage = window.localStorage;
var vAdd = $(".add");
var vDel = $(".del");
var vSearch = $(".search");
var vEdit = $(".edit");
var vSave = $(".save");

function  student(name, sex, id, grade, subject) {       
  this.name = name || null;
  this.sex =  sex || null;
  this.id = id || null;
  this.grade =  grade ||  null;
  this.subject =  subject || null;
}

function addHandler() {
  var data = JSON.parse(storage.getItem("stuSys"));
  if (data == null) {
    data = new Array();
  }
  var stu = new student();
  stu.name = $("#aName").val().trim();
  stu.sex =  $("#aSex").val().trim();
  stu.id = $("#aId").val().trim();
  stu.grade =  $("#aGrade").val().trim();
  stu.subject =  $("#aSubject").val().trim();
  if (valid(stu)) {
    data[stu.id] = stu;
    storage["stuSys"] = JSON.stringify(data);
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
  var id = $("#sId").val().trim();
  var stu = JSON.parse(storage.getItem("stuSys"))[id];
  if (stu == null) {
    alert("查无此人");
    $("#searchOutput").html("");
  } else {
    $("#searchOutput").html("<tr><td>" + stu.name + "</td><td>" + stu.sex + "</td><td>" + stu.id + "</td><td>" + stu.grade + "</td><td>" + stu.subject + "</td></tr>");
  }
}

function delHandler() {
  var id = $("#dId").val().trim()
  var data = JSON.parse(storage.getItem("stuSys"));
  if (data[id] == null) {
    alert("查无此人");
  } else {
    data[id] = null;
    storage["stuSys"] = JSON.stringify(data);
    alert("删除成功");
  }
}

function eShow() {
  var id = $("#eId").val().trim()
  var data = JSON.parse(storage.getItem("stuSys"));
  if (data[id] == null) {
    alert("查无此人");
    $(".editForm").hide();
  } else {
    $(".editForm").fadeIn("slow");
  }
}

function editHandler() {
  var id = $("#eId").val().trim();
  var data = JSON.parse(storage.getItem("stuSys"));
  if ($("#eName").val().trim() != "") {
    data[id].name = $("#eName").val().trim();
    data[id].sex =  $("#eSex").val().trim();
    data[id].grade =  $("#eGrade").val().trim();
    data[id].subject =  $("#eSubject").val().trim();
    storage["stuSys"] = JSON.stringify(data);
    alert("修改成功");
  } else {
    alert("姓名不能为空");
  }
}

function showAll() {
  var data = JSON.parse(storage.getItem("stuSys"));
  var outputer = $("#saveOutput");
  if (data == null) {
    outputer.empty();
  } else {
    outputer.empty();
    for (var i in data) {
      if (data[i] != null) {
        outputer.append("<tr><td>" + data[i].name + "</td><td>" + data[i].sex + "</td><td>" + data[i].id + "</td><td>" + data[i].grade + "</td><td>" + data[i].subject + "</td></tr>");
      }
    }
  }
}

function addShow() {
  vAdd.fadeIn("slow");
  vDel.hide();
  vSearch.hide();
  vEdit.hide();
  vSave.hide();
}

function delShow() {
  vAdd.hide();
  vDel.fadeIn("slow");
  vSearch.hide();
  vEdit.hide();
  vSave.hide();
}

function searchShow() {
  vAdd.hide();
  vDel.hide();
  vSearch.fadeIn("slow");
  vEdit.hide();
  vSave.hide();
}

function editShow() {
  vAdd.hide();
  vDel.hide();
  vSearch.hide();
  vEdit.fadeIn("slow");
  vSave.hide();
}

function saveShow() {
  vAdd.hide();
  vDel.hide();
  vSearch.hide();
  vEdit.hide();
  vSave.fadeIn("slow");
}
