
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

var temp = location.href.split("?");
data = temp[1].split("=");
var selected_category_page = data[1];
var user_email;
var content_content;

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      console.log(user.email);
      user_email=user.email;
      $("#category_selected").html(selected_category_page+" 게시판");
    }
    else{
         console.log("로그인이 필요합니다.");
    }
  });

function register_content(){
  var result = Math.floor(Math.random() * 1000000000000000) + 1;
  var ct_ref = database.ref(selected_category_page+'/'+result);

  content_content = document.getElementById("input_text").value;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  today = yyyy+'-'+mm+'-'+dd;

  var data={
    name : user_email,
    content : content_content,
    date : today
  }

  ct_ref.set(data);

  alert("게시글 등록 완료!");
  window.location.reload();
}

function read_commentes(){
  var read_db_ref = database.ref().child(selected_category_page);
  read_db_ref.on('value', function(snapshot) {
    console.log(snapshot.val());
  });
}
