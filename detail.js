var config = {
  apiKey: "AIzaSyDcoGvza-ObsnUqKmJUDQ_NWoBwi7sPRA8",
  authDomain: "cnu-hop.firebaseapp.com",
  databaseURL: "https://cnu-hop.firebaseio.com",
  projectId: "cnu-hop",
  storageBucket: "cnu-hop.appspot.com",
  messagingSenderId: "41991803234"
};
firebase.initializeApp(config);

var contentArray = new Array();
var database = firebase.database();
var temp;
var selected_category_page;

window.onload = function() {
  temp = location.href.split("?");
  data = temp[1].split("=");
  selected_category_page = data[1];
  read_commentes();
}


var user_email;
var content_content;

firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    user_email = user.email;
    $("#category_selected").html(selected_category_page + " 게시판");
  } else {
    console.log("로그인이 필요합니다.");
  }
});

function register_content() {
  var result = Math.floor(Math.random() * 1000000000000000) + 1;
  var ct_ref = database.ref(selected_category_page + '/' + result);

  content_content = document.getElementById("input_text").value;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;

  var data = {
    name: user_email,
    content: content_content,
    date: today
  }

  ct_ref.set(data);

  alert("게시글 등록 완료!");
  window.location.reload();
}

function read_commentes() {

  var list_ = document.getElementById('list');



  var read_db_ref = database.ref().child(selected_category_page);
  read_db_ref.on('value', function(snapshot) {


    $("#list").empty();
    var l_Box = document.createElement("tr");
    var l_td1 = document.createElement("td");
    l_td1.innerHTML = "작성자";
    l_td1.setAttribute("id", "write_writer");
    var l_td2 = document.createElement("td");
    l_td2.innerHTML = "내용";
    l_td2.setAttribute("id", "write_content");
    var l_td3 = document.createElement("td");
    l_td3.innerHTML = "작성 시간";
    l_td3.setAttribute("id", "write_time");
    var l_td4 = document.createElement("td");
    l_td4.innerHTML = "수정";
    l_td4.setAttribute("id", "other");

    l_Box.appendChild(l_td1);
    l_Box.appendChild(l_td2);
    l_Box.appendChild(l_td3);
    l_Box.appendChild(l_td4);

    list_.appendChild(l_Box);

    var obj = snapshot.val();
    var obj_length = Object.keys(obj).length;
    console.log(obj_length);

    contentArray = new Array();
    for (var i = 0; i < obj_length; i++) {
      contentArray.push(obj[Object.keys(obj)[i]]);
      console.log(contentArray.length);
    }




    for (var i = 0; i < contentArray.length; i++) {
      var Box = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      var td3 = document.createElement("td");
      var td4 = document.createElement("td");
      var td5 = document.createElement("td");


      if (contentArray[i].name == user_email) {
        var mody_but = document.createElement("button");
        mody_but.setAttribute("type", "button");
        mody_but.setAttribute("value", "수정");
        mody_but.style.height ="15px";
        mody_but.setAttribute("onclick","show_modal(event)");
        td4.appendChild(mody_but);
      }
      td1.innerHTML = contentArray[i].name;
      td2.innerHTML = contentArray[i].content;
      td3.innerHTML = contentArray[i].date;
      td5.innerHTML = Object.keys(obj)[i];
      td5.style.display = "none";
      Box.appendChild(td1);
      Box.appendChild(td2);
      Box.appendChild(td3);
      Box.appendChild(td4);
      Box.appendChild(td5);

      list_.appendChild(Box);
    }

  });
}

function show_modal(event){
  $("#addToDoView").show();
  var temp = event.target.parentNode.nextSibling.innerHTML;
  $("#my_number").html(temp);
  $("#my_writer").html(event.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
  $("#my_date").html(event.target.parentNode.previousSibling.innerHTML);
  var temp_conent = event.target.parentNode.previousSibling.previousSibling.innerHTML;
  $("#revise_content").val(temp_conent);
}
function CloseAddToDo(){
  $("#addToDoView").css("display" ,"none");
}

function modify_coment(){
  var modified_content = $("#revise_content").val();
  var temp_numnum = $("#my_number").html();

  var ct_ref = database.ref(selected_category_page + '/' + temp_numnum);

  var modify_user_email = $("#my_writer").html();
  var modify_content_content = $("#revise_content").val();
  var modify_today = $("#my_date").html();

  var data = {
    name: modify_user_email,
    content: modify_content_content,
    date: modify_today
  }
  ct_ref.set(data);
  alert("게시글 수정완료!");

  window.location.reload();

}

function del_coment(){
  var temp_numnum = $("#my_number").html();
  var ct_ref = database.ref(selected_category_page + '/' + temp_numnum);

  ct_ref.remove();
  alert("게시글 삭제!");

  window.location.reload();

}
