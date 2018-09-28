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

  function signUp() {
  		    var id = $("#su_id").val();
  		    var pw = $("#su_pw").val();
  		    var cf = $("#su_cf").val();

  		    if(pw != cf) {
  		        alert("Password does not match the confirm password.");
  		        return;
  		    }

  		    firebase.auth().createUserWithEmailAndPassword(id, pw)
  		            .then(function() {
  		                alert("Signed Up!");
  		                //location.href="./TP_2.html"; <- 회원가입 후 이동할 페이지
  		            })
  		            .catch(function(e) {
  		                $("#error #errmsg").html(e.message);
  		                $("#error").show();
  		                return;
  		            });
}

  	//로그인 (sing in) 하는 함수
  	  function signIn() {
  	      var id = $("#si_id").val();
  	      var pw = $("#si_pw").val();
  	      firebase.auth().signInWithEmailAndPassword(id, pw)
  	              .then(function() {
  	                  $("#signIn").hide();
  	                  $("#authorized").show();
  	                  //location.href="./TP_2.html"; <-이동할 페이지
  	              })
  	              .catch(function(e) {
  	                  lastWork = "signIn";
  	                  $("#error #errmsg").html(e.message);
  	                  $("#error").show();
  	                  $("#signIn").hide();
  	                  return;
  	              });
  	 }

     function back() {
     	      $("#" + lastWork).show();
     	      $("#error").hide();
     	  }
