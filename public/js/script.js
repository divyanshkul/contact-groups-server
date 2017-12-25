var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  try{	  
  firebase.initializeApp(config);
  } catch(error){
	  document.getElementById("mainDiv").style.display = "none";
  }
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    var user = firebase.auth().currentUser;
    if(user != null){
      var email_id = user.email;
      var name = user.displayName;
      document.getElementById("user_para").innerHTML = "Welcome Admin: " + "<br/>" + "Your Name: " + name + "<br/>" + "Your Email: " + email_id;
    }
  } else {  // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);  
  });

}
function signInWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var name = user.displayName;
      alert("Welcome! Sign In Successful");      
  }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      alert(errorMessage);
    });

}

function signInWithGoogleRedirect(){
  var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        var token = result.credential.accessToken;    
      }  
      var user = result.user;
      var name = user.displayName;
      alert("Welcome! Sign In Successful");
    }).catch(function(error) {      
      var errorCode = error.code;
      var errorMessage = error.message;  
      var email = error.email; 
      var credential = error.credential;
      console.log(errorMessage)
});
}

function logout(){
  firebase.auth().signOut();
  document.getElementById("email_field").value = "";
  document.getElementById("password_field").value = ""; 
}
