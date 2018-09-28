// Initialize Firebase

var config = {
  apiKey: "AIzaSyDcoGvza-ObsnUqKmJUDQ_NWoBwi7sPRA8",
  authDomain: "cnu-hop.firebaseapp.com",
  databaseURL: "https://cnu-hop.firebaseio.com",
  projectId: "cnu-hop",
  storageBucket: "cnu-hop.appspot.com",
  messagingSenderId: "41991803234"
};
firebase.initializeApp(config);
var database = firebase.database();

function signUp() {
  var id = $("#su_id").val();
  var pw = $("#su_pw").val();
  var cf = $("#su_cf").val();

  if (pw != cf) {
    alert("Password does not match the confirm password.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(id, pw)
    .then(function() {
      alert("회원 가입 완료!");
      location.href = "./main.html";
    })
    .catch(function(e) {
      $("#error #errmsg").html(e.message);
      $("#error").show();
      return;
    });
}

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      $(".logindata").css("display" , "none");
      $("#login").css("display" , "none");
      $("#login_id").html(user.email+"님 환영 합니다.");
      $("#login_id").css("display" , "inline");

    }
    else{
        $("#logout").css("display" , "none");
        $("#login_id").css("display" , "none");

         console.log("로그인이 필요합니다.");
    }
  });

//로그인 (sing in) 하는 함수
function signIn() {
  var id = $("#si_id").val();
  var pw = $("#si_pw").val();
  firebase.auth().signInWithEmailAndPassword(id, pw)
    .then(function() {
      alert("로그인 완료!");
      $("#signIn").hide();
      $("#authorized").show();
      location.href = "./main.html";
    })
    .catch(function(e) {
      alert("로그인 실패!");
      lastWork = "signIn";
      $("#error #errmsg").html(e.message);
      $("#error").show();
      return;
    });
}

function back() {
  $("#" + lastWork).show();
  $("#error").hide();
}

function signOut() {
  if (!confirm("Do you really want to log out?")) {
    return;
  }

  firebase.auth().signOut().then(function() {
    console.log("로그 아웃!");
    location.reload();
  }, function(e) {
    lastWork = "authorized";
    $("#error").show();
  });
}

function Register(){
  $("#addToDoView").show();
}

function CloseAddToDo(){
  $("#addToDoView").css("display" ,"none");
}

function open_exercise(){
  window.open("detail.html?category=excercise", "_self");
}
function open_movie(){
  window.open("detail.html?category=movie", "_self");
}
function open_travel(){
  window.open("detail.html?category=travel", "_self");
}
function open_drama(){
  window.open("detail.html?category=drama", "_self");
}
function open_game(){
  window.open("detail.html?category=game", "_self");
}
function open_music(){
  window.open("detail.html?category=music", "_self");
}
function open_book(){
  window.open("detail.html?category=book", "_self");
}
function open_etc(){
  window.open("detail.html?category=etc", "_self");
}
