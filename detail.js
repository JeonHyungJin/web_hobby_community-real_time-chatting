
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
console.log(data[1]);
